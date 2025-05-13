"use client"; // Add this to mark as a Client Component

import Link from "next/link";
import Image from "next/image";
import styles from "./styles.module.css";

// Text-based logo with breathing animation effect
const InlineLogo = () => (
  <div
    className={`relative flex flex-col items-center justify-center w-full h-full ${styles.breathingAnimation}`}
  >
    <div className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight">
      <span className="bg-gradient-to-r from-amber-500 via-orange-500 to-amber-500 bg-clip-text text-transparent relative">
        Dudu
      </span>
    </div>
    <div className="relative mt-2 flex items-center">
      <span className="w-10 h-[3px] bg-gradient-to-r from-transparent to-amber-500 rounded-full mx-3 hidden sm:block"></span>
      <span className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight bg-gradient-to-r from-amber-500 via-orange-500 to-amber-500 bg-clip-text text-transparent">
        Rave
      </span>
      <span className="w-10 h-[3px] bg-gradient-to-r from-amber-500 to-transparent rounded-full mx-3 hidden sm:block"></span>
    </div>
  </div>
);

export default function ComingSoon() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-black to-gray-900 text-white p-4 sm:p-8">
      <div className="text-center space-y-8 max-w-4xl mx-auto w-full px-4">
        <div className="mb-12 flex justify-center">
          <div className="relative w-[280px] h-[280px] sm:w-[400px] sm:h-[400px] flex items-center justify-center">
            {/* Text logo with breathing effect */}
            <div
              className={`flex items-center justify-center w-full h-full ${styles.animateFadeIn}`}
            >
              <InlineLogo />
              {/* <Image
                src="/herowhite.png"
                alt="DuduRave Logo"
                width={300}
                height={300}
                className="mt-2"
              /> */}
            </div>

            {/* Add subtle glow effect behind the logo */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full -z-10 blur-3xl opacity-20 bg-gradient-to-r from-amber-500 via-orange-600 to-amber-500 rounded-full"></div>
          </div>
        </div>

        <h1
          className={`text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-amber-500 to-orange-600 ${styles.animateFadeIn}`}
        >
          Coming Soon
        </h1>

        <p
          className={`text-lg sm:text-xl md:text-2xl text-gray-300 max-w-xl mx-auto my-6 sm:my-8 ${styles.animateSlideUp}`}
        >
          We're crafting something amazing for you. Our new experience will be
          available soon.
        </p>

        <div
          className={`relative mt-6 sm:mt-8 ${styles.animateFadeIn} ${styles.delay300}`}
        >
          <div className="h-1 w-[200px] sm:w-64 md:w-96 mx-auto bg-gradient-to-r from-amber-500 to-orange-600 rounded-full overflow-hidden">
            <div
              className={`h-full w-1/2 bg-white/30 ${styles.animateLoadingBar}`}
            ></div>
          </div>
        </div>
      </div>
    </main>
  );
}
