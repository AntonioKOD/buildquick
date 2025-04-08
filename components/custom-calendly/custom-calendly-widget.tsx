/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { format, parseISO, isSameDay } from "date-fns"
import { ChevronLeft, ChevronRight, Calendar, Clock, Check, AlertCircle, CheckCircle } from "lucide-react"

type AvailabilityTime = {
  status: string
  start_time: string
  end_time: string
  invitees_remaining: number
}

export default function CustomCalendlyWidget() {
  // We'll fetch the actual event type from your Calendly account
  const [meetingType, setMeetingType] = useState({
    uri: "",
    name: "30 Minute Meeting",
    description: "A standard 30-minute meeting",
    duration: 30,
    slug: "30min",
  })

  const [availableTimes, setAvailableTimes] = useState<AvailabilityTime[]>([])
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())
  const [selectedTime, setSelectedTime] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [bookingStep, setBookingStep] = useState<"calendar" | "confirmation" | "success">("calendar")
  const [error, setError] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date())
  const [bookingDetails, setBookingDetails] = useState<any>(null)

  // Initialize with a weekday if current day is weekend
  useEffect(() => {
    const today = new Date()
    const dayOfWeek = today.getDay()

    // If today is Saturday (6) or Sunday (0), set selected date to next Monday
    if (dayOfWeek === 0 || dayOfWeek === 6) {
      const nextMonday = new Date(today)
      nextMonday.setDate(today.getDate() + (dayOfWeek === 0 ? 1 : 2))
      setSelectedDate(nextMonday)
    }
  }, [])

  // Get available times for the selected date
  useEffect(() => {
    async function fetchAvailableTimes() {
      try {
        setIsLoading(true)
        setError(null)

        // If no event type URI is available yet, skip fetching
        if (!meetingType.uri) {
          setIsLoading(false)
          return
        }

        const startTime = new Date(selectedDate)
        startTime.setHours(0, 0, 0, 0)

        const endTime = new Date(selectedDate)
        endTime.setHours(23, 59, 59, 999)

        console.log("Fetching availability for:", meetingType.uri, startTime.toISOString(), endTime.toISOString())

        const response = await fetch(
          `/api/calendly?action=availability&eventTypeUri=${encodeURIComponent(
            meetingType.uri,
          )}&startTime=${startTime.toISOString()}&endTime=${endTime.toISOString()}`,
        )

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({ error: "Failed to parse error response" }))
          throw new Error(errorData.error || `Failed to fetch availability: ${response.status} ${response.statusText}`)
        }

        const data = await response.json()
        console.log("Availability fetched:", data)

        if (!data.collection || !Array.isArray(data.collection)) {
          throw new Error("Invalid response format from Calendly API")
        }

        setAvailableTimes(data.collection)
      } catch (error) {
        console.error("Error fetching available times:", error)
        setError(error instanceof Error ? error.message : "Failed to load available times. Please try again later.")
      } finally {
        setIsLoading(false)
      }
    }

    fetchAvailableTimes()
  }, [selectedDate, meetingType.uri])

  // This will fetch your actual event types from Calendly
  useEffect(() => {
    async function fetchEventTypes() {
      try {
        setIsLoading(true)
        const response = await fetch(`/api/calendly?action=eventTypes`)

        if (!response.ok) {
          throw new Error(`Failed to fetch event types: ${response.status}`)
        }

        const data = await response.json()
        console.log("Event types fetched:", data)

        if (data.collection && data.collection.length > 0) {
          // Find a 30-minute meeting type, or use the first one
          const thirtyMinMeeting = data.collection.find((type: any) => type.duration === 30) || data.collection[0]

          setMeetingType({
            uri: thirtyMinMeeting.uri,
            name: thirtyMinMeeting.name,
            description: thirtyMinMeeting.description || "Schedule a meeting",
            duration: thirtyMinMeeting.duration,
            slug: thirtyMinMeeting.slug,
          })
        }
      } catch (error) {
        console.error("Error fetching event types:", error)
        setError("Failed to load meeting types. Please try again later.")
      } finally {
        setIsLoading(false)
      }
    }

    fetchEventTypes()
  }, [])

  // Handle time slot selection
  const handleSelectTime = (time: string) => {
    setSelectedTime(time)
    setBookingStep("confirmation")
  }

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  // Handle booking confirmation
  const handleConfirmBooking = async () => {
    if (!selectedTime) return

    try {
      setIsLoading(true)
      setError(null)

      const bookingData = {
        event_type_uri: meetingType.uri,
        start_time: selectedTime,
        name: formData.name,
        email: formData.email,
        message: formData.message || "",
      }

      console.log("Creating booking:", bookingData)

      // Send the booking data to our API
      const response = await fetch("/api/calendly?action=create-booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookingData),
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: "Failed to parse error response" }))
        throw new Error(errorData.error || `Failed to create booking: ${response.status} ${response.statusText}`)
      }

      const data = await response.json()
      console.log("Booking created:", data)

      // Store booking details for the success screen
      setBookingDetails({
        ...data,
        event_name: meetingType.name,
        event_duration: meetingType.duration,
      })

      // Move to success step
      setBookingStep("success")
    } catch (error) {
      console.error("Error creating booking:", error)
      setError(error instanceof Error ? error.message : "Failed to create booking. Please try again later.")
    } finally {
      setIsLoading(false)
    }
  }

  // Check if a date is a weekend (Saturday or Sunday)
  const isWeekend = (date: Date) => {
    const day = date.getDay()
    return day === 0 || day === 6 // 0 is Sunday, 6 is Saturday
  }

  // Generate calendar days for the current month view
  const generateCalendarDays = () => {
    const firstDayOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1)
    const lastDayOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0)

    // Get the day of the week for the first day (0 = Sunday, 6 = Saturday)
    const firstDayOfWeek = firstDayOfMonth.getDay()

    // Calculate days from previous month to show
    const daysFromPrevMonth = firstDayOfWeek

    // Calculate total days to show (previous month days + current month days)
    const totalDays = daysFromPrevMonth + lastDayOfMonth.getDate()

    // Calculate rows needed (7 days per row)
    const rows = Math.ceil(totalDays / 7)

    // Generate calendar days
    const days = []
    let dayCounter = 1 - daysFromPrevMonth

    for (let i = 0; i < rows * 7; i++) {
      const currentDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), dayCounter)
      const isCurrentMonth = currentDate.getMonth() === currentMonth.getMonth()
      const isToday = isSameDay(currentDate, new Date())
      const isPast = currentDate < new Date() && !isToday
      const isWeekendDay = isWeekend(currentDate)

      days.push({
        date: currentDate,
        isCurrentMonth,
        isToday,
        isPast,
        isWeekendDay,
      })

      dayCounter++
    }

    return days
  }

  // Navigate to previous month
  const goToPreviousMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1))
  }

  // Navigate to next month
  const goToNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1))
  }

  // Reset the booking process
  const handleStartOver = () => {
    setSelectedTime(null)
    setBookingStep("calendar")
    setFormData({ name: "", email: "", message: "" })
    setBookingDetails(null)
  }

  // Calendar days
  const calendarDays = generateCalendarDays()

  return (
    <div className="relative rounded-xl border-2 border-[#1B1F3B] bg-white p-6 shadow-[6px_6px_0px_0px_rgba(27,31,59,1)]">
      {/* Retro-styled decorative elements */}
      <div className="absolute -left-3 -top-3 h-6 w-6 rounded-full bg-accent"></div>
      <div className="absolute -right-3 -bottom-3 h-6 w-6 rounded-full bg-primary"></div>
      <div className="absolute inset-0 opacity-5 bg-[linear-gradient(45deg,#1B1F3B_25%,transparent_25%,transparent_50%,#1B1F3B_50%,#1B1F3B_75%,transparent_75%,transparent)] bg-[length:10px_10px]"></div>

      <div className="relative z-10">
        {error && (
          <div className="mb-4 rounded-lg border-2 border-destructive bg-destructive/10 p-4 text-destructive">
            <div className="flex items-start">
              <AlertCircle className="mr-2 h-5 w-5 shrink-0" />
              <div>
                <p className="font-medium">Error</p>
                <p className="text-sm">{error}</p>
              </div>
            </div>
          </div>
        )}

        {isLoading && bookingStep === "calendar" ? (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
            <p className="mt-4 text-foreground font-medium">Loading calendar...</p>
          </div>
        ) : (
          <>
            {bookingStep === "calendar" && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-[#1B1F3B]">{meetingType.name}</h2>
                  <p className="text-[#444444]">{meetingType.description}</p>
                  <p className="mt-2 text-sm text-[#444444] italic">Weekdays only (Monday-Friday)</p>
                </div>

                {/* Calendar View */}
                <div className="rounded-lg border-2 border-[#1B1F3B] bg-white p-4">
                  {/* Month navigation */}
                  <div className="mb-4 flex items-center justify-between">
                    <button
                      onClick={goToPreviousMonth}
                      className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-[#1B1F3B] hover:bg-muted"
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </button>
                    <h3 className="text-lg font-bold">{format(currentMonth, "MMMM yyyy")}</h3>
                    <button
                      onClick={goToNextMonth}
                      className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-[#1B1F3B] hover:bg-muted"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>

                  {/* Day headers */}
                  <div className="mb-2 grid grid-cols-7 gap-1 text-center">
                    {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day, index) => (
                      <div
                        key={day}
                        className={`text-xs font-medium ${index === 0 || index === 6 ? "text-red-400" : "text-[#1B1F3B]"}`}
                      >
                        {day}
                      </div>
                    ))}
                  </div>

                  {/* Calendar grid */}
                  <div className="grid grid-cols-7 gap-1">
                    {calendarDays.map((day, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          if (!day.isPast && day.isCurrentMonth && !day.isWeekendDay) {
                            setSelectedDate(day.date)
                          }
                        }}
                        disabled={day.isPast || day.isWeekendDay}
                        className={`
                          h-10 w-full rounded-md p-1 text-center text-sm
                          ${!day.isCurrentMonth ? "text-gray-300" : ""}
                          ${day.isPast || day.isWeekendDay ? "cursor-not-allowed opacity-50" : ""}
                          ${day.isWeekendDay && day.isCurrentMonth ? "bg-gray-100 text-red-400" : ""}
                          ${isSameDay(day.date, selectedDate) ? "bg-primary text-white" : ""}
                          ${day.isToday && !isSameDay(day.date, selectedDate) ? "border-2 border-primary" : ""}
                          ${!day.isPast && day.isCurrentMonth && !day.isWeekendDay && !isSameDay(day.date, selectedDate) ? "hover:bg-muted" : ""}
                        `}
                      >
                        {format(day.date, "d")}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Selected date and time slots */}
                <div>
                  <h3 className="mb-3 text-lg font-bold text-[#1B1F3B]">
                    Available times on {format(selectedDate, "EEEE, MMMM d")}
                  </h3>

                  {isLoading ? (
                    <div className="flex justify-center py-4">
                      <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
                      {availableTimes.length > 0 ? (
                        availableTimes.map((slot) => (
                          <button
                            key={slot.start_time}
                            onClick={() => handleSelectTime(slot.start_time)}
                            className="flex items-center justify-center rounded-md border-2 border-[#1B1F3B] bg-white py-2 hover:bg-[#F4C542]/10"
                          >
                            <Clock className="mr-2 h-4 w-4 text-[#F4C542]" />
                            <span>{format(parseISO(slot.start_time), "h:mm a")}</span>
                          </button>
                        ))
                      ) : (
                        <div className="col-span-full py-4 text-center text-[#444444]">
                          No available times on this date. Please select another date.
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            )}

            {bookingStep === "confirmation" && selectedTime && (
              <div className="space-y-6">
                <div>
                  <button
                    onClick={() => setBookingStep("calendar")}
                    className="mb-2 flex items-center text-sm font-medium text-[#1B1F3B] hover:underline"
                  >
                    <ChevronLeft className="mr-1 h-4 w-4" />
                    Back to calendar
                  </button>
                  <h2 className="text-2xl font-bold text-[#1B1F3B]">Confirm Your Booking</h2>
                  <p className="text-[#444444]">Please provide your information to complete the booking</p>
                </div>

                <div className="rounded-lg border-2 border-[#1B1F3B] bg-white p-4">
                  <div className="flex flex-col space-y-3">
                    <div className="flex items-start">
                      <Calendar className="mr-2 h-5 w-5 text-primary" />
                      <div>
                        <p className="font-medium text-[#1B1F3B]">{meetingType.name}</p>
                        <p className="text-sm text-[#444444]">{meetingType.duration} minutes</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <Clock className="mr-2 h-5 w-5 text-primary" />
                      <div>
                        <p className="font-medium text-[#1B1F3B]">
                          {format(parseISO(selectedTime), "EEEE, MMMM d, yyyy")}
                        </p>
                        <p className="text-sm text-[#444444]">{format(parseISO(selectedTime), "h:mm a")}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <form className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-[#1B1F3B]">
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="mt-1 block w-full rounded-md border-2 border-[#1B1F3B] p-2 shadow-sm focus:border-primary focus:ring-primary"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-[#1B1F3B]">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="mt-1 block w-full rounded-md border-2 border-[#1B1F3B] p-2 shadow-sm focus:border-primary focus:ring-primary"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-[#1B1F3B]">
                      Additional Information (Optional)
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={3}
                      value={formData.message}
                      onChange={handleInputChange}
                      className="mt-1 block w-full rounded-md border-2 border-[#1B1F3B] p-2 shadow-sm focus:border-primary focus:ring-primary"
                    />
                  </div>

                  <Button
                    onClick={handleConfirmBooking}
                    disabled={!formData.name || !formData.email || isLoading}
                    className="h-12 w-full rounded-md border-2 border-[#1B1F3B] bg-primary px-8 text-sm font-bold text-white shadow-[4px_4px_0px_0px_rgba(27,31,59,1)] transition-all hover:-translate-y-0.5 hover:translate-x-0.5 hover:shadow-[5px_5px_0px_0px_rgba(27,31,59,1)]"
                  >
                    {isLoading ? (
                      <>
                        <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                        Processing...
                      </>
                    ) : (
                      <>
                        <Check className="mr-2 h-4 w-4" />
                        Confirm Booking
                      </>
                    )}
                  </Button>
                </form>
              </div>
            )}

            {bookingStep === "success" && bookingDetails && (
              <div className="space-y-6">
                <div className="flex flex-col items-center justify-center text-center">
                  <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                    <CheckCircle className="h-8 w-8 text-green-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-[#1B1F3B]">Booking Confirmed!</h2>
                  <p className="text-[#444444]">Your meeting has been scheduled successfully.</p>
                </div>

                <div className="rounded-lg border-2 border-[#1B1F3B] bg-white p-4">
                  <div className="flex flex-col space-y-4">
                    <div className="flex items-start">
                      <Calendar className="mr-2 h-5 w-5 text-primary" />
                      <div>
                        <p className="font-medium text-[#1B1F3B]">{bookingDetails.event_name}</p>
                        <p className="text-sm text-[#444444]">{bookingDetails.event_duration} minutes</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <Clock className="mr-2 h-5 w-5 text-primary" />
                      <div>
                        <p className="font-medium text-[#1B1F3B]">
                          {format(parseISO(bookingDetails.start_time), "EEEE, MMMM d, yyyy")}
                        </p>
                        <p className="text-sm text-[#444444]">
                          {format(parseISO(bookingDetails.start_time), "h:mm a")}
                        </p>
                      </div>
                    </div>
                    <div className="border-t border-gray-200 pt-4">
                      <p className="text-sm text-[#444444]">
                        A confirmation email has been sent to <span className="font-medium">{formData.email}</span>
                      </p>
                      <p className="mt-2 text-sm text-[#444444]">
                        You&apos;ll receive a calendar invitation and a reminder before the meeting.
                      </p>
                    </div>
                  </div>
                </div>

                <Button
                  onClick={handleStartOver}
                  className="h-12 w-full rounded-md border-2 border-[#1B1F3B] bg-background px-8 text-sm font-bold text-[#1B1F3B] shadow-[4px_4px_0px_0px_rgba(27,31,59,1)] transition-all hover:-translate-y-0.5 hover:translate-x-0.5 hover:shadow-[5px_5px_0px_0px_rgba(27,31,59,1)]"
                  variant="outline"
                >
                  Book Another Meeting
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
