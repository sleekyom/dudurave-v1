"use client";

import React from "react";
import Link from "next/link";
import { NewsletterSection } from "./NewsletterSection";
import { SocialMediaSection } from "./SocialMediaSection";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black text-white">
      <NewsletterSection />
      <SocialMediaSection />

      {/* Copyright and Legal Links */}
      <div className="border-t border-gray-800 mt-2">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row justify-center gap-2 underline items-center text-sm text-gray-400">
            <div>&copy; {currentYear} DuduRave. All rights reserved.</div>
            <div className="mt-2 md:mt-0 space-x-4">
              <Link
                href="/privacy-policy"
                className="hover:text-white transition-colors"
              >
                Privacy Policy
              </Link>
              {/* Add more legal links as needed */}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
