import Link from "next/link";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CalendarDays, MapPin } from "lucide-react";
import { format } from "date-fns";
import { DuduraveEvent } from "@/lib/types";

export function EventCard({ event }: { event: DuduraveEvent }) {
  return (
    <Card className="overflow-hidden">
      <div className="aspect-[16/9] relative bg-gray-100 flex items-center justify-center">
        <img
          src={event.image.url}
          alt={event.title}
          className="object-cover w-full h-full rounded-t-lg"
        />
      </div>
      <CardHeader>
        <h3 className="text-2xl font-bold">{event.title}</h3>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <CalendarDays className="h-4 w-4" />
            <span>{format(new Date(event.date), "MMMM dd, yyyy")}</span>
          </div>
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4" />
            <span>{event.location}</span>
          </div>
          <p className="line-clamp-2 text-sm text-muted-foreground mt-2">
            {event.description}
          </p>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between items-center">
        {/* <span className="text-lg font-bold">${event.price}</span> */}
        <Link href={`/events/${event.slug}`}>
          <Button>View Details</Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
