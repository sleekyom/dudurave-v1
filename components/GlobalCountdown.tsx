"use client";

import { useState, useEffect } from "react";
import { getEvents } from "@/lib/hygraph";
import { DuduraveEvent } from "@/lib/types";
import { CountdownTimer } from "@/components/CountdownTimer";

export function GlobalCountdown() {
  const [event, setEvent] = useState<DuduraveEvent | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchFeaturedEvent = async () => {
      try {
        const eventsData = await getEvents();
        if (eventsData && eventsData.length > 0) {
          // Get the first event (assumed to be the featured one)
          setEvent(eventsData[0]);
        }
      } catch (error) {
        console.error('Error fetching event for countdown:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFeaturedEvent();
  }, []);

  // Only render countdown if we have an event to countdown to
  if (!event || isLoading) {
    return null; // Don't show anything while loading or if no events
  }

  return <CountdownTimer event={event} />;
}
