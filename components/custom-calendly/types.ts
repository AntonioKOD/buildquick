// Calendly API types
export interface CalendlyEventType {
    uri: string
    name: string
    description: string | null
    duration: number
    slug: string
    color: string
    active: boolean
    scheduling_url: string
  }
  
  export interface CalendlyAvailableTime {
    status: string
    start_time: string
    invitee_start_time: string
  }
  
  export interface CalendlySchedulingResponse {
    resource: {
      uri: string
      status: string
    }
  }
  
  // Component state types
  export interface CalendlyState {
    step: "loading" | "event-types" | "date-selection" | "time-selection" | "user-details" | "confirmation" | "error"
    eventTypes: CalendlyEventType[]
    selectedEventType: CalendlyEventType | null
    selectedDate: Date | null
    availableTimes: CalendlyAvailableTime[]
    selectedTime: CalendlyAvailableTime | null
    userDetails: {
      name: string
      email: string
      notes: string
    }
    error: string | null
  }
  