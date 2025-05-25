"use client";

import { useState, useEffect } from "react";
import { getEvents } from "@/lib/hygraph";
import { Navbar } from "@/components/ui/navbar";
import Link from "next/link";
import Image from "next/image";
import { NewsletterSection } from "@/components/NewsletterSection";
import { SocialMediaSection } from "@/components/SocialMediaSection";
// import { FeaturedEventsSection } from "@/components/FeaturedEventsSection";
import PollSection from "@/components/PollSection";
import { PlaylistSection } from "@/components/PlaylistSection";
import { Button } from "@/components/ui/button";

const heroImages = [
  "/duduraveheroone.png",
  "/duduraveherotwo.png",
  "/duduraveherothree.png"
];

export default function Home() {
  // const events = await getEvents();

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(timer); // Cleanup on component unmount
  }, []);

  return (
    <>
      <Navbar />
      <main className="flex min-h-screen flex-col">
        {/* Hero Section */}
        <section className="relative h-screen flex items-center justify-center">
          <div
            className="absolute inset-0 z-0 transition-all duration-1000 ease-in-out"
            style={{
              backgroundImage: `url(${heroImages[currentImageIndex]})`,
              backgroundSize: "cover",
              backgroundPosition: "center"
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70" />
          </div>
          <div className="relative z-10 text-center text-white space-y-8 px-4 items-center justify-center">
            {/* <Image
              src="/herowhite.png"
              alt="DuduRave Logo"
              width={600}
              height={600}
              className="mt-2 animate-fade-in-down"
            /> */}
            <div className="space-y-6">
              <h2 className="text-2xl md:text-4xl font-semibold tracking-tight">
                Where the Pulse of Afrobeats Ignites a Movement.
              </h2>
              <p className="text-lg md:text-xl max-w-2xl mx-auto text-gray-200 leading-relaxed">
                This is the heartbeat of innovation, rhythm, and cultural
                connection.
              </p>
            </div>
            {/* <div className="mt-8">
              <Link href="/events">
                <Button
                  size="lg"
                  className="min-w-[200px] bg-white text-black hover:bg-gray-100"
                >
                  Discover Events
                </Button>
              </Link>
            </div> */}
          </div>
        </section>

        {/* Featured Events Section */}
        {/* <FeaturedEventsSection events={events} /> */}

        {/* Poll Section */}
        {/* <PollSection /> */}

        {/* DUDURAVE Playlist Section */}
        <PlaylistSection />

        {/* Newsletter Section */}
        <NewsletterSection />

        {/* Social Media Section */}
        <SocialMediaSection />
      </main>
    </>
  );
}
