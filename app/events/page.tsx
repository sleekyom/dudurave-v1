"use client";

import React, { useState, useEffect } from "react";
import { EventCard } from "@/components/event-card";
import { Navbar } from "@/components/ui/navbar";
import { DuduraveEvent } from "@/lib/types";
import { NewsletterSection } from "@/components/NewsletterSection";

export default function EventsPage() {
  const [events, setEvents] = useState<DuduraveEvent[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        // Dynamic import to avoid including server-only code in client bundle
        const { getEvents } = await import("@/lib/hygraph");
        const eventsData = await getEvents();
        setEvents(eventsData);
      } catch (error) {
        console.error("Failed to fetch events:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchEvents();
  }, []);

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-24 pb-16 px-4 container mx-auto max-w-screen-2xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">All Events</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Browse through our collection of upcoming African cultural events
          </p>
        </div>
        
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-pulse text-lg">Loading events...</div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {events?.map((event: DuduraveEvent) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        )}
      </main>
      <NewsletterSection />
    </>
  );
}
