"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { EventCard } from "@/components/event-card";
import { Navbar } from "@/components/ui/navbar";
import { Button } from "@/components/ui/button";
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
        ) : events && events.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.map((event: DuduraveEvent) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-24 h-24 mb-6 rounded-full bg-muted flex items-center justify-center">
              <svg
                className="w-12 h-12 text-muted-foreground"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
            <h3 className="text-2xl font-semibold mb-2">No Events Available</h3>
            <p className="text-muted-foreground mb-6 max-w-md">
              There are currently no events scheduled. Check back soon for exciting upcoming African cultural events!
            </p>
            <div className="flex gap-4">
              <Link href="/">
                <Button variant="outline">Back to Home</Button>
              </Link>
              <Button 
                onClick={() => window.location.reload()} 
                variant="default"
              >
                Refresh Page
              </Button>
            </div>
          </div>
        )}
      </main>
      <NewsletterSection />
    </>
  );
}
