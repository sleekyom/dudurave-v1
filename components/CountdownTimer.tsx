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

  if (isEventPassed) {
    return (
      <section className="py-5 px-4 bg-black">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="rounded-3xl bg-gray-900/50 p-3 md:p-4 border border-gray-700 relative overflow-hidden">
            <h2 className="text-xl md:text-2xl font-bold text-white mb-1">
              🎉 Event Has Started! 🎉
            </h2>
            <p className="text-base text-gray-300 mb-2">
              {event.title} is happening now!
            </p>
            <div className="animate-pulse text-4xl">🎵</div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-5 px-4 bg-black relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-5 left-5 w-16 h-16 bg-gray-700/20 rounded-full animate-bounce"></div>
        <div className="absolute top-20 right-10 w-12 h-12 bg-gray-600/20 rounded-full animate-pulse"></div>
        <div className="absolute bottom-10 left-1/4 w-10 h-10 bg-gray-500/20 rounded-full animate-ping"></div>
        <div className="absolute bottom-16 right-1/3 w-8 h-8 bg-gray-700/20 rounded-full animate-bounce"></div>
      </div>

      <div className="container mx-auto max-w-6xl text-center relative z-10">
        <div className="bg-gray-900/50 backdrop-blur-sm rounded-3xl p-4 md:p-6 border border-gray-700 shadow-2xl">
          <div className="mb-3">
            <h2 className="text-xl md:text-2xl font-bold text-gray-300 mb-1">
              NEXT EVENT DROPPING SOON
            </h2>
            <h3 className="text-2xl md:text-3xl font-black text-white mb-2">
              {event.title}
            </h3>
            <p className="text-base md:text-lg text-gray-300 mb-3">
              📍 {event.location}
            </p>
          </div>

          <div className="grid grid-cols-4 gap-3 md:gap-4 max-w-2xl mx-auto mb-4">
            <div className="bg-gray-900 rounded-xl p-2 md:p-3 transform hover:scale-105 transition-transform duration-300 shadow-lg border border-gray-700">
              <div className="text-2xl md:text-4xl font-black text-white mb-0">
                {timeLeft.days.toString().padStart(2, "0")}
              </div>
              <div className="text-xs md:text-sm font-semibold text-gray-400 uppercase tracking-wide">
                Days
              </div>
            </div>

            <div className="bg-gray-900 rounded-xl p-2 md:p-3 transform hover:scale-105 transition-transform duration-300 shadow-lg border border-gray-700">
              <div className="text-2xl md:text-4xl font-black text-white mb-0">
                {timeLeft.hours.toString().padStart(2, "0")}
              </div>
              <div className="text-xs md:text-sm font-semibold text-gray-400 uppercase tracking-wide">
                Hours
              </div>
            </div>

            <div className="bg-gray-900 rounded-xl p-2 md:p-3 transform hover:scale-105 transition-transform duration-300 shadow-lg border border-gray-700">
              <div className="text-2xl md:text-4xl font-black text-white mb-0">
                {timeLeft.minutes.toString().padStart(2, "0")}
              </div>
              <div className="text-xs md:text-sm font-semibold text-gray-400 uppercase tracking-wide">
                Minutes
              </div>
            </div>

            <div className="bg-gray-900 rounded-xl p-2 md:p-3 transform hover:scale-105 transition-transform duration-1000 shadow-lg animate-pulse border border-gray-700">
              <div className="text-2xl md:text-4xl font-black text-white mb-0">
                {timeLeft.seconds.toString().padStart(2, "0")}
              </div>
              <div className="text-xs md:text-sm font-semibold text-gray-400 uppercase tracking-wide">
                Seconds
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2 justify-center items-center mt-3">
            {event.ticketLink && (
              <a
                href={event.ticketLink}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-700 hover:bg-gray-800 text-white font-bold py-1 px-5 rounded-full text-sm md:text-base transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                🎫 GET TICKETS NOW 🎫
              </a>
            )}
            <div className="flex items-center space-x-1 text-gray-400 text-xs">
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
