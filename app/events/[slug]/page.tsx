import { getEventBySlug, getAllEvents } from "@/lib/hygraph";
import { Navbar } from "@/components/ui/navbar";
import { Button } from "@/components/ui/button";
import { CalendarDays, MapPin } from "lucide-react";
import { format } from "date-fns";

export async function generateStaticParams() {
  const events = await getAllEvents();
  return events?.map((event: { slug: string }) => ({
    slug: event.slug,
  }));
}

export default async function EventPage({
  params,
}: {
  params: { slug: string };
}) {
  const event = await getEventBySlug(params.slug);

  if (!event) {
    return <div>Event not found</div>;
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-24 pb-16">
        <div className="container px-4">
          <div className="max-w-4xl mx-auto">
            <div className="aspect-[16/9] relative mb-8">
              <img
                src={event.image.url}
                alt={event.title}
                className="rounded-lg object-cover w-full h-full"
              />
            </div>
            <h1 className="text-4xl font-bold mb-6">{event.title}</h1>
            <div className="flex flex-wrap gap-6 mb-8">
              <div className="flex items-center space-x-2">
                <CalendarDays className="h-5 w-5 text-muted-foreground" />
                <span>{format(new Date(event.date), "MMMM dd, yyyy")}</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-5 w-5 text-muted-foreground" />
                <span>{event.location}</span>
              </div>
              <div className="text-lg font-bold">
                ${event.price}
              </div>
            </div>
            <div className="prose max-w-none">
              {event.description}
            </div>
            <Button size="lg" className="mt-8">
              Get Tickets
            </Button>
          </div>
        </div>
      </main>
    </>
  );
}