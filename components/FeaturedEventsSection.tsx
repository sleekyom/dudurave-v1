"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { EventCard } from "@/components/event-card";
import { DuduraveEvent } from "@/lib/types";

interface FeaturedEventsSectionProps {
  events: DuduraveEvent[];
}

export function FeaturedEventsSection({ events }: FeaturedEventsSectionProps) {
  const featuredEvents = events.slice(0, 3);

  return (
    <section className="py-20 px-4 container mx-auto max-w-screen-2xl">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold mb-4">Featured Events</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Discover our handpicked selection of upcoming events that
          celebrate African culture and community
        </p>
      </div>
      
      {featuredEvents.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
          <div className="text-center mt-12">
            <Link href="/events">
              <Button variant="outline" size="lg">
                View All Events
              </Button>
            </Link>
          </div>
        </>
      ) : (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="w-20 h-20 mb-6 rounded-full bg-muted flex items-center justify-center">
            <svg
              className="w-10 h-10 text-muted-foreground"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
              />
            </svg>
          </div>
          <h3 className="text-xl font-semibold mb-2">No Featured Events Yet</h3>
          <p className="text-muted-foreground mb-6 max-w-md">
            We&apos;re curating amazing African cultural events for you. Stay tuned for exciting updates!
          </p>
          <Link href="/events">
            <Button variant="outline">
              Browse All Events
            </Button>
          </Link>
        </div>
      )}
    </section>
  );
}
