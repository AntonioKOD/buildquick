/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextResponse } from "next/server";
import crypto from "crypto";

// Type definitions for our API responses
type AvailabilityResponse = {
  collection: AvailabilityTime[];
  pagination: {
    count: number;
    next_page: string | null;
  };
};

type AvailabilityTime = {
  status: string;
  start_time: string;
  end_time: string;
  invitees_remaining: number;
};

type EventType = {
  uri: string;
  name: string;
  description: string | null;
  duration: number;
  slug: string;
};

type EventTypesResponse = {
  collection: EventType[];
  pagination: {
    count: number;
    next_page: string | null;
  };
};

type TokenResponse = {
  access_token: string;
  token_type: string;
  expires_in: number;
  refresh_token: string;
  scope: string;
  created_at: number;
  organization: string;
  owner: string;
};

type BookingRequest = {
  event_type_uri: string;
  start_time: string;
  name: string;
  email: string;
  message?: string;
  calendly_username?: string;
};

// Helper function to verify webhook signatures.
// It computes an HMAC digest and compares the given signature and computed digest as hex-encoded buffers.
function verifyWebhookSignature(
  payload: string,
  signature: string,
  timestamp: string,
  secret: string,
): boolean {
  const hmac = crypto.createHmac("sha256", secret);
  const data = `${timestamp}.${payload}`;
  hmac.update(data);
  const computedSignature = hmac.digest("hex");
  const signatureBuffer = Buffer.from(signature, "hex");
  const computedSignatureBuffer = Buffer.from(computedSignature, "hex");
  return crypto.timingSafeEqual(signatureBuffer, computedSignatureBuffer);
}

// Helper function to get an access token using client credentials.
async function getAccessToken(): Promise<string> {
  const clientId = process.env.CALENDLY_CLIENT_ID;
  const clientSecret = process.env.CALENDLY_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    throw new Error("Calendly OAuth credentials not configured");
  }

  const response = await fetch("https://auth.calendly.com/oauth/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "client_credentials",
      client_id: clientId,
      client_secret: clientSecret,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(
      `Failed to get access token: ${response.status} ${response.statusText} - ${errorText}`,
    );
  }

  const data: TokenResponse = await response.json();
  return data.access_token;
}

// --- Mock Data Methods (for development) ---
function getMockEventTypes() {
  return {
    collection: [
      {
        uri: "https://api.calendly.com/event_types/8ee91e22-36dc-4c32-95fc-7df483909640",
        name: "15 Minute Meeting",
        description: "A quick 15-minute introduction call",
        duration: 15,
        slug: "15min",
      },
      {
        uri: "https://api.calendly.com/event_types/8ee91e22-36dc-4c32-95fc-7df483909640",
        name: "30 Minute Meeting",
        description: "A standard 30-minute meeting",
        duration: 30,
        slug: "30min",
      },
      {
        uri: "https://api.calendly.com/event_types/8ee91e22-36dc-4c32-95fc-7df483909640",
        name: "60 Minute Meeting",
        description: "An in-depth 60-minute consultation",
        duration: 60,
        slug: "60min",
      },
    ],
    pagination: {
      count: 3,
      next_page: null,
    },
  };
}

function getMockAvailability(startTime: string, endTime: string) {
  const startDate = new Date(startTime);
  const mockSlots = [];

  // Create slots from 9 AM to 5 PM with 30-minute intervals
  for (let hour = 9; hour < 17; hour++) {
    for (const minute of [0, 30]) {
      const slotDate = new Date(startDate);
      slotDate.setHours(hour, minute, 0, 0);

      // Only include slots that are after the current time
      if (slotDate > new Date()) {
        const endSlotDate = new Date(slotDate);
        endSlotDate.setMinutes(slotDate.getMinutes() + 30);
        mockSlots.push({
          status: "available",
          start_time: slotDate.toISOString(),
          end_time: endSlotDate.toISOString(),
          invitees_remaining: 1,
        });
      }
    }
  }

  return {
    collection: mockSlots,
    pagination: {
      count: mockSlots.length,
      next_page: null,
    },
  };
}

function createMockBooking(bookingData: BookingRequest) {
  const startTime = new Date(bookingData.start_time);
  const endTime = new Date(startTime);
  endTime.setMinutes(startTime.getMinutes() + 30); // Assuming 30-minute meetings

  return {
    uri: "https://api.calendly.com/scheduled_events/8ee91e22-36dc-4c32-95fc-7df483909640",
    name: "Scheduled Meeting",
    status: "active",
    start_time: startTime.toISOString(),
    end_time: endTime.toISOString(),
    location: {
      type: "zoom",
      join_url: "https://zoom.us/j/123456789",
    },
    cancellation_policy: "24_hours_before",
    invitees_counter: 1,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };
}

// --- API Handlers ---
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const action = searchParams.get("action");

  // Use mock data only when not in production.
  const useMockData = process.env.NODE_ENV !== "production";

  try {
    // OAuth callback
    if (action === "oauth-callback") {
      const code = searchParams.get("code");
      if (!code) {
        return NextResponse.json({ error: "Authorization code missing" }, { status: 400 });
      }

      const clientId = process.env.CALENDLY_CLIENT_ID;
      const clientSecret = process.env.CALENDLY_CLIENT_SECRET;
      const redirectUri = process.env.CALENDLY_REDIRECT_URI;

      if (!clientId || !clientSecret || !redirectUri) {
        return NextResponse.json({ error: "OAuth credentials not configured" }, { status: 500 });
      }

      // In non-production, return a mock success
      if (useMockData) {
        return NextResponse.json({ success: true, message: "Authentication successful (mock)" });
      }

      const response = await fetch("https://auth.calendly.com/oauth/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          grant_type: "authorization_code",
          client_id: clientId,
          client_secret: clientSecret,
          code,
          redirect_uri: redirectUri,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to exchange code for token: ${response.status} ${response.statusText} - ${errorText}`);
      }

      const data: TokenResponse = await response.json();
      // In a real application, securely store the token
      return NextResponse.json({ success: true, message: "Authentication successful" });
    }

    // Get event types (meeting types)
    if (action === "eventTypes") {
      const username = searchParams.get("username") || "antonio-36xn";

      // Return mock data in development
      if (useMockData) {
        console.log("Using mock data for event types");
        return NextResponse.json(getMockEventTypes());
      }

      const apiKey = process.env.CALENDLY_API_KEY;
      const accessToken = process.env.NEXT_PUBLIC_ACCESS_TOKEN || apiKey;
      if (!accessToken) {
        return NextResponse.json({ error: "No Calendly API key or access token provided" }, { status: 500 });
      }
      const headers: HeadersInit = {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      };

      try {
        // Fetch user data to get the correct URI.
        const userResponse = await fetch(`https://api.calendly.com/users/${username}`, {
          headers,
          cache: "no-store",
        });
        if (!userResponse.ok) {
          throw new Error(`Failed to fetch user: ${userResponse.status}`);
        }
        const userData = await userResponse.json();
        const userUri = userData.resource.uri;

        // Now fetch event types for the user.
        const response = await fetch(`https://api.calendly.com/event_types?user=${userUri}`, {
          headers,
          cache: "no-store",
        });
        if (!response.ok) {
          throw new Error(`Failed to fetch event types: ${response.status}`);
        }
        const data = await response.json();
        return NextResponse.json(data);
      } catch (error) {
        console.error("Error fetching event types:", error);
        // As a fallback, return mock data.
        return NextResponse.json(getMockEventTypes());
      }
    }

    // Get availability for a specific event type
    else if (action === "availability") {
      const eventTypeUri = searchParams.get("eventTypeUri");
      const startTime = searchParams.get("startTime"); // ISO date string
      const endTime = searchParams.get("endTime"); // ISO date string

      if (!eventTypeUri || !startTime || !endTime) {
        return NextResponse.json({ error: "Missing required parameters" }, { status: 400 });
      }

      // Use mock data in development.
      if (useMockData) {
        console.log("Using mock data for availability");
        return NextResponse.json(getMockAvailability(startTime, endTime));
      }

      const apiKey = process.env.CALENDLY_API_KEY;
      const accessToken = process.env.NEXT_PUBLIC_ACCESS_TOKEN || apiKey;
      if (!accessToken) {
        return NextResponse.json({ error: "No Calendly API key or access token provided" }, { status: 500 });
      }
      const headers: HeadersInit = {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      };

      try {
        const response = await fetch(
          `https://api.calendly.com/event_type_available_times?event_type=${eventTypeUri}&start_time=${startTime}&end_time=${endTime}`,
          {
            headers,
            cache: "no-store",
          },
        );

        if (!response.ok) {
          const errorText = await response.text();
          console.error(`Calendly API error: ${response.status} ${response.statusText}`);
          console.error(`Response body: ${errorText}`);

          // Fallback to mock data if authentication fails.
          if (response.status === 401) {
            console.log("Authentication failed, using mock data instead");
            return NextResponse.json(getMockAvailability(startTime, endTime));
          }

          throw new Error(`Failed to fetch availability: ${response.status} ${response.statusText}`);
        }

        const data: AvailabilityResponse = await response.json();
        return NextResponse.json(data);
      } catch (error) {
        console.error("Error fetching availability:", error);
        console.log("Error occurred, using mock data instead");
        return NextResponse.json(getMockAvailability(startTime, endTime));
      }
    }

    return NextResponse.json({ error: "Invalid action specified" }, { status: 400 });
  } catch (error) {
    console.error("Calendly API error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  const { searchParams } = new URL(request.url);
  const action = searchParams.get("action");

  // Use mock data only when not in production.
  const useMockData = process.env.NODE_ENV !== "production";

  try {
    // Create a booking
    if (action === "create-booking") {
      const bookingData: BookingRequest = await request.json();
      const { event_type_uri, start_time, name, email, message, calendly_username } = bookingData;

      // Validate required fields.
      if (!event_type_uri || !start_time || !name || !email) {
        return NextResponse.json({ error: "Missing required booking information" }, { status: 400 });
      }

      // Simulate booking in development.
      if (useMockData) {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        const mockBooking = createMockBooking(bookingData);
        return NextResponse.json({
          success: true,
          message: "Booking created successfully",
          ...mockBooking,
        });
      }

      // Production: Use the real Calendly Scheduling API.
      try {
        const apiKey = process.env.CALENDLY_API_KEY;
        const accessToken = process.env.NEXT_PUBLIC_ACCESS_TOKEN || apiKey;
        if (!accessToken) {
          return NextResponse.json({ error: "No Calendly API key or access token provided" }, { status: 500 });
        }

        // Fetch event type details.
        const eventTypeResponse = await fetch(event_type_uri, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        });
        if (!eventTypeResponse.ok) {
          throw new Error(`Failed to fetch event type: ${eventTypeResponse.status}`);
        }
        const eventTypeData = await eventTypeResponse.json();
        const schedulingUrl = eventTypeData.resource.scheduling_url;

        // Calendly requires a redirect to their scheduling page.
        return NextResponse.json({
          success: true,
          redirect: true,
          scheduling_url: `${schedulingUrl}?name=${encodeURIComponent(
            name,
          )}&email=${encodeURIComponent(email)}&date=${encodeURIComponent(
            new Date(start_time).toISOString().split("T")[0]
          )}&a1=${encodeURIComponent(message || "")}`,
          start_time,
          event_name: eventTypeData.resource.name,
          event_duration: eventTypeData.resource.duration,
        });
      } catch (error) {
        console.error("Error creating booking:", error);
        return NextResponse.json(
          {
            error: error instanceof Error ? error.message : "Unknown error",
            fallback: true,
            scheduling_url: `https://calendly.com/${calendly_username}?name=${encodeURIComponent(
              name,
            )}&email=${encodeURIComponent(email)}`,
          },
          { status: 200 },
        );
      }
    }

    // Handle webhook events
    else if (action === "webhook") {
      // In development, simulate webhook processing.
      if (useMockData) {
        return NextResponse.json({ success: true, message: "Webhook processed (mock)" });
      }

      const webhookSecret = process.env.CALENDLY_WEBHOOK_SIGNING_SECRET;
      if (!webhookSecret) {
        return NextResponse.json({ error: "Webhook signing secret not configured" }, { status: 500 });
      }

      const signature = request.headers.get("Calendly-Webhook-Signature");
      const timestamp = request.headers.get("Calendly-Webhook-Timestamp");
      if (!signature || !timestamp) {
        return NextResponse.json({ error: "Missing webhook signature headers" }, { status: 400 });
      }

      const rawBody = await request.text();
      const isValid = verifyWebhookSignature(rawBody, signature, timestamp, webhookSecret);
      if (!isValid) {
        return NextResponse.json({ error: "Invalid webhook signature" }, { status: 401 });
      }

      const webhookEvent = JSON.parse(rawBody);
      switch (webhookEvent.event) {
        case "invitee.created":
          console.log("New booking created:", webhookEvent.payload.invitee.uri);
          break;
        case "invitee.canceled":
          console.log("Booking canceled:", webhookEvent.payload.invitee.uri);
          break;
        // Additional webhook events can be handled here.
      }
      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ error: "Invalid action specified" }, { status: 400 });
  } catch (error) {
    console.error("Calendly API error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 },
    );
  }
}