"use client";

import React from 'react';
import { NewsletterSection } from './NewsletterSection';
import { SocialMediaSection } from './SocialMediaSection';

export const Footer = () => {
  return (
    <footer className="bg-black text-white">
      <NewsletterSection />
      <SocialMediaSection />
    </footer>
  );
};
