import { getEvents } from "@/lib/hygraph";
import { EventCard } from "@/components/event-card";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/ui/navbar";
import Link from "next/link";
import Image from "next/image";
import { NewsletterSection } from "@/components/NewsletterSection";
import { FeaturedEventsSection } from "@/components/FeaturedEventsSection";
import PollSection from '@/components/PollSection';

export default async function Home() {
  const events = await getEvents();

  return (
    <>
      <Navbar />
      <main className="flex min-h-screen flex-col">
        {/* Hero Section */}
        <section className="relative h-screen flex items-center justify-center">
          <div
            className="absolute inset-0 z-0"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')",
              backgroundSize: "cover",
              backgroundPosition: "center"
            }}
          >
            <div className="absolute inset-0 bg-black/50" />
          </div>
          <div className="relative z-10 text-center text-white space-y-6 px-4 items-center justify-center">
            {/* <h1 className="text-5xl md:text-7xl font-bold">DuduRave</h1> */}
            <Image
              src="/herowhite.png"
              alt="DuduRave Logo"
              width={600}
              height={600}
              className="mt-2"
            />
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
        <FeaturedEventsSection events={events} />

        {/* Poll Section */}
        <PollSection />

        {/* Newsletter Section */}
        <NewsletterSection />
      </main>
    </>
  );
}
