import { getEvents } from "@/lib/hygraph";
import { EventCard } from "@/components/event-card";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/ui/navbar";
import Link from "next/link";

export default async function Home() {
  const events = await getEvents();
  const featuredEvents = events.slice(0, 3);

  return (
    <>
      <Navbar />
      <main className="flex min-h-screen flex-col">
        {/* Hero Section */}
        <section className="relative h-screen flex items-center justify-center">
          <div 
            className="absolute inset-0 z-0"
            style={{
              backgroundImage: "url('https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="absolute inset-0 bg-black/50" />
          </div>
          <div className="relative z-10 text-center text-white space-y-6 px-4">
            <h1 className="text-5xl md:text-7xl font-bold">DuduRave</h1>
            <p className="text-xl md:text-2xl max-w-2xl mx-auto">
              Experience the best African cultural events and celebrations
            </p>
            <Link href="/events">
              <Button size="lg" className="mt-8">
                Explore Events
              </Button>
            </Link>
          </div>
        </section>

        {/* Featured Events Section */}
        <section className="py-20 px-4 container">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Featured Events</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Discover our handpicked selection of upcoming events that celebrate African culture and community
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

        {/* Newsletter Section */}
        <section className="bg-primary py-20">
          <div className="container px-4 text-center">
            <h2 className="text-3xl font-bold text-primary-foreground mb-4">
              Stay Updated
            </h2>
            <p className="text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
              Subscribe to our newsletter and never miss an event
            </p>
            <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 rounded-md"
              />
              <Button variant="secondary">Subscribe</Button>
            </form>
          </div>
        </section>
      </main>
    </>
  );
}