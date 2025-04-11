import { getEvents } from "@/lib/hygraph";
import { EventCard } from "@/components/event-card";
import { Navbar } from "@/components/ui/navbar";
import { type Event } from "@/lib/hygraph";

export default async function EventsPage() {
  const events = await getEvents();

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-24 pb-16 px-4 container">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">All Events</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Browse through our collection of upcoming African cultural events
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events?.map((event: Event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </main>
    </>
  );
}