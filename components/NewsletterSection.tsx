"use client";
import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import ReCAPTCHA from "react-google-recaptcha";

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
  const recaptchaRef = useRef<ReCAPTCHA>(null);

  const validateEmail = (): boolean => {
    setTouched(true);

    if (!email.trim()) {
      setErrorMessage("Email is required");
      setStatus("error");
      return false;
    }

    if (!isValidEmail(email)) {
      setErrorMessage("Please enter a valid email address");
      setStatus("error");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateEmail()) {
      return;
    }

    // Verify reCAPTCHA
    const recaptchaValue = await recaptchaRef.current?.executeAsync();
    if (!recaptchaValue) {
      setErrorMessage("Please verify that you are not a robot");
      setStatus("error");
      return;
    }

    setStatus("loading");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          recaptchaToken: recaptchaValue
        })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Subscription failed");
      setStatus("success");
      setEmail("");

      // Clear success message after 3 seconds
      const timer = setTimeout(() => {
        setStatus("idle");
      }, 3000);

      // Cleanup timer if component unmounts
      return () => clearTimeout(timer);
    } catch (err: any) {
      setErrorMessage(err.message);
      setStatus("error");
    }
  };

  return (
    <section className="bg-primary py-20">
      <div className="container px-4 text-center mx-auto max-w-screen-2xl">
        <h2 className="text-3xl font-bold text-primary-foreground mb-4">
          Join the Dudurave Community
        </h2>
        <p className="text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
          Get the latest rave news and upcoming event details delivered straight
          to your inbox.
        </p>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto"
        >
          <ReCAPTCHA
            ref={recaptchaRef}
            size="invisible"
            sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ""}
          />
          <div className="flex-1">
            <input
              type="text"
              placeholder="Enter your email"
              className={`w-full px-4 py-2 rounded-md ${
                touched && status === "error" ? "border-2 border-red-500" : ""
              }`}
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (touched) {
                  validateEmail();
                } else {
                  setStatus("idle");
                  setErrorMessage("");
                }
              }}
              onBlur={validateEmail}
            />
            {status === "error" && (
              <p className="text-red-500 text-sm text-left mt-1">
                {errorMessage}
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
      </div>
    </section>
  );
}
