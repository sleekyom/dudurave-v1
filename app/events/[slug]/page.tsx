import { getEventBySlug } from "@/lib/hygraph";
import { EventDetail } from "@/components/EventDetail";

// This is a server component that fetches data and passes it to the client component
export default async function EventPage({
  params
}: {
  params: { slug: string };
}) {
  // Server-side data fetching
  const event = await getEventBySlug(params.slug);

  if (!event) {
    return <div>Event not found</div>;
  }

  // Pass the pre-fetched data to the client component
  return <EventDetail event={event} />;
}
