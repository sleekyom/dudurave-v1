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
    </section>
  );
}
