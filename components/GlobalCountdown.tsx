"use client";

import { useState, useEffect } from "react";
import { getEvents } from "@/lib/hygraph";
import { DuduraveEvent } from "@/lib/types";
import { CountdownTimer } from "@/components/CountdownTimer";

export function GlobalCountdown() {
  const [nextEvent, setNextEvent] = useState<DuduraveEvent | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUpcomingEvents = async () => {
      try {
        const eventsData = await getEvents();
        if (eventsData && eventsData.length > 0) {
          // Find the next upcoming event
          const now = new Date();
          const upcomingEvents = eventsData.filter(event => {
            const eventDate = new Date(event.date);
            return eventDate > now;
          });
          
          // Sort by date (closest first)
          upcomingEvents.sort((a, b) => {
            return new Date(a.date).getTime() - new Date(b.date).getTime();
          });
          
          // Set the next upcoming event if we found one
          if (upcomingEvents.length > 0) {
            setNextEvent(upcomingEvents[0]);
          }
        }
      } catch (error) {
        console.error('Error fetching events for countdown:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUpcomingEvents();
  }, []);

  // Only render countdown if we have an upcoming event to countdown to
  if (!nextEvent || isLoading) {
    return null; // Don't show anything if no upcoming events or while loading
  }

  return <CountdownTimer event={nextEvent} />;

}
