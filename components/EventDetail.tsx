"use client";

import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/ui/navbar";
import { CalendarDays, MapPin } from "lucide-react";
import { format } from "date-fns";
import { DuduraveEvent } from "@/lib/types";

interface EventDetailProps {
  event: DuduraveEvent;
}

export function EventDetail({ event }: EventDetailProps) {
  if (!event) {
    return <div>Event not found</div>;
  }

  return (
    <>
      <Navbar />
      <main className="container mx-auto px-4 py-24">
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            {event.image?.url ? (
              <div className="relative rounded-lg overflow-hidden h-[400px]">
                <img
                  src={event.image.url}
                  alt={event.title}
                  className="object-cover w-full h-full"
                />
              </div>
            ) : (
              <div className="bg-muted h-[400px] rounded-lg flex items-center justify-center">
                <p>No image available</p>
              </div>
            )}
          </div>
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">{event.title}</h1>
            {event.date && (
              <div className="flex items-center text-gray-600 mb-2">
                <CalendarDays className="h-4 w-4 mr-2" />
                <time dateTime={new Date(event.date).toISOString()}>
                  {format(new Date(event.date), "EEEE, MMMM d, yyyy")}
                </time>
              </div>
            )}
            {event.location && (
              <div className="flex items-center text-gray-600 mb-4">
                <MapPin className="h-4 w-4 mr-2" />
                <span>{event.location}</span>
              </div>
            )}
            {event.price !== undefined && (
              <div className="mb-4 text-lg font-medium">
                ${typeof event.price === 'number' ? event.price.toFixed(2) : event.price}
              </div>
            )}
            <div className="prose max-w-none mb-6">
              <p>{event.description}</p>
            </div>
            <Button size="lg" className="w-full md:w-auto">
              <a
                href={`https://ticketing.dudurave.com/events/${event.slug}`} 
                target="_blank"
                rel="noopener noreferrer"
                className="w-full h-full inline-flex items-center justify-center"
              >
                Get Tickets
              </a>
            </Button>
          </div>
        </div>
      </main>
    </>
  );
}
