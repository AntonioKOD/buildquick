// This file uses the server-side proxy to avoid exposing API keys
import type { CalendlyAvailableTime, CalendlyEventType, CalendlySchedulingResponse } from "./types"

// Replace with your actual Calendly user URI
const CALENDLY_USER = process.env.NEXT_PUBLIC_CALENDLY_USER || ""

/**
 * Fetch available event types from Calendly
 */
export async function fetchEventTypes(): Promise<CalendlyEventType[]> {
  try {
    const response = await fetch(`/api/calendly?endpoint=event_types?user=${CALENDLY_USER}`)

    if (!response.ok) {
      throw new Error(`Failed to fetch event types: ${response.status}`)
    }

    const data = await response.json()
    return data.collection
  } catch (error) {
    console.error("Error fetching event types:", error)
    throw error
  }
}

/**
 * Fetch available time slots for a specific event type and date
 */
export async function fetchAvailableTimes(eventTypeUri: string, date: Date): Promise<CalendlyAvailableTime[]> {
  try {
    // Format date as ISO string and get just the date part (YYYY-MM-DD)
    const formattedDate = date.toISOString().split("T")[0]

    const response = await fetch(
      `/api/calendly?endpoint=availability_schedules/${eventTypeUri}/calendar/day?date=${formattedDate}`,
    )

    if (!response.ok) {
      throw new Error(`Failed to fetch available times: ${response.status}`)
    }

    const data = await response.json()
    return data.available_times
  } catch (error) {
    console.error("Error fetching available times:", error)
    throw error
  }
}

/**
 * Schedule an appointment
 */
export async function scheduleAppointment(
  eventTypeUri: string,
  startTime: string,
  name: string,
  email: string,
  notes = "",
): Promise<CalendlySchedulingResponse> {
  try {
    const response = await fetch(`/api/calendly?endpoint=scheduling_links`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        max_booking_time: 1,
        event_type: eventTypeUri,
        start_time: startTime,
        invitee: {
          name,
          email,
          notes,
        },
      }),
    })

    if (!response.ok) {
      throw new Error(`Failed to schedule appointment: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error("Error scheduling appointment:", error)
    throw error
  }
}
