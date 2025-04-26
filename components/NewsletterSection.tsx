"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";

const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
};

export function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [touched, setTouched] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email.trim()) {
      setErrorMessage("Email is required");
      setStatus("error");
      return;
    }

    if (!isValidEmail(email)) {
      setErrorMessage("Please enter a valid email address");
      setStatus("error");
      return;
    }

    setStatus("loading");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Subscription failed");
      setStatus("success");
      setEmail("");
    } catch (err: any) {
      setErrorMessage(err.message);
      setStatus("error");
    }
  };

  return (
    <section className="bg-primary py-20">
      <div className="container px-4 text-center mx-auto max-w-screen-2xl">
        <h2 className="text-3xl font-bold text-primary-foreground mb-4">
          Stay Updated
        </h2>
        <p className="text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
          Subscribe to our newsletter and never miss an event
        </p>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto"
        >
          <div className="flex-1">
            <input
              type="email"
              placeholder="Enter your email"
              className={`w-full px-4 py-2 rounded-md ${
                touched && !isValidEmail(email) ? "border-2 border-red-500" : ""
              }`}
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setStatus("idle");
                setErrorMessage("");
              }}
              onBlur={() => setTouched(true)}
              required
            />
            {touched && !isValidEmail(email) && email.trim() !== "" && (
              <p className="text-red-500 text-sm text-left mt-1">
                Please enter a valid email address
              </p>
            )}
          </div>
          <Button variant="secondary" disabled={status === "loading"}>
            {status === "loading" ? "Subscribing..." : "Subscribe"}
          </Button>
        </form>
        {status === "success" && (
          <p className="text-green-500 mt-4">Subscribed successfully! 🎉</p>
        )}
        {status === "error" && (
          <p className="text-red-500 mt-4">{errorMessage}</p>
        )}
      </div>
    </section>
  );
}
