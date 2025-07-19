"use client";

import { useState, useEffect } from "react";
import { DuduraveEvent } from "@/lib/types";

interface CountdownTimerProps {
  event: DuduraveEvent;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export function CountdownTimer({ event }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  const [isEventPassed, setIsEventPassed] = useState(false);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const eventDate = new Date(event.date);
      const now = new Date();
      const difference = eventDate.getTime() - now.getTime();

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((difference / 1000 / 60) % 60);
        const seconds = Math.floor((difference / 1000) % 60);

        setTimeLeft({ days, hours, minutes, seconds });
        setIsEventPassed(false);
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        setIsEventPassed(true);
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [event.date]);

  // If event has passed, don't show anything
  if (isEventPassed) {
    return null;
  }

  return (
    <section className="py-1 px-2 bg-black relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-3 left-3 w-10 h-10 bg-gray-700/20 rounded-full animate-bounce"></div>
        <div className="absolute top-12 right-8 w-8 h-8 bg-gray-600/20 rounded-full animate-pulse"></div>
        <div className="absolute bottom-6 left-1/4 w-6 h-6 bg-gray-500/20 rounded-full animate-ping"></div>
        <div className="absolute bottom-10 right-1/3 w-5 h-5 bg-gray-700/20 rounded-full animate-bounce"></div>
      </div>

      <div className="container mx-auto max-w-6xl text-center relative z-10">
        <div className="bg-gray-900/50 backdrop-blur-sm rounded-3xl p-2 md:p-3 border border-gray-700 shadow-lg max-w-4xl mx-auto">
          <h2 className="text-[10px] md:text-xs uppercase tracking-wide text-gray-300 mb-0">
            NEXT EVENT DROPPING SOON
          </h2>
          <h1 className="text-sm md:text-base font-bold text-white mb-0">
            {event.title}
          </h1>
          <div className="text-[10px] text-gray-400 mb-0.5">
            📍 {event.location}
          </div>

          <div className="grid grid-cols-4 gap-1 max-w-xl mx-auto mb-1">
            <div className="bg-gray-900 px-1 py-1.5 md:px-2 md:py-2 rounded-lg border border-gray-700">
              <div className="text-base md:text-xl font-bold text-white animate-pulse-slow">
                {String(timeLeft.days).padStart(2, "0")}
              </div>
              <div className="text-[10px] uppercase text-gray-400 tracking-wide">
                Days
              </div>
            </div>

            <div className="bg-gray-900 px-1 py-1.5 md:px-2 md:py-2 rounded-lg border border-gray-700">
              <div className="text-base md:text-xl font-bold text-white">
                {String(timeLeft.hours).padStart(2, "0")}
              </div>
              <div className="text-[10px] uppercase text-gray-400 tracking-wide">
                Hours
              </div>
            </div>

            <div className="bg-gray-900 px-1 py-1.5 md:px-2 md:py-2 rounded-lg border border-gray-700">
              <div className="text-base md:text-xl font-bold text-white">
                {String(timeLeft.minutes).padStart(2, "0")}
              </div>
              <div className="text-[10px] uppercase text-gray-400 tracking-wide">
                Minutes
              </div>
            </div>

            <div className="bg-gray-900 px-1 py-1.5 md:px-2 md:py-2 rounded-lg border border-gray-700 relative overflow-hidden">
              <div className="relative z-10">
                <div className="text-base md:text-xl font-bold text-white">
                  {String(timeLeft.seconds).padStart(2, "0")}
                </div>
                <div className="text-[10px] uppercase text-gray-400 tracking-wide">
                  Seconds
                </div>
              </div>
              <div className="absolute inset-0 bg-gray-800 opacity-50 animate-pulse-slow"></div>
            </div>
          </div>

          <div className="flex flex-col gap-1 justify-center items-center mt-2">
            {event.ticketLink && (
              <a
                href={event.ticketLink}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-700 hover:bg-gray-800 text-white font-bold py-0.5 px-4 rounded-full text-xs md:text-sm transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                🎫 GET TICKETS NOW 🎫
              </a>
            )}
            <div className="flex items-center space-x-1 text-gray-400 text-[10px] mt-1">
              <span className="animate-bounce">🎵</span>
              <span>Get ready to vibe!</span>
              <span className="animate-bounce">🎵</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
