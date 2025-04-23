"use client";
import { Button } from "@/components/ui/button";

export function NewsletterSection() {
  return (
    <section className="bg-primary py-20">
      <div className="container px-4 text-center mx-auto max-w-screen-2xl">
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
  );
}
