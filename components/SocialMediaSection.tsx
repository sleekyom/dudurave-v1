"use client";

import { TikTokIcon } from "./icons/TikTokIcon";
import { YouTubeIcon } from "./icons/YouTubeIcon";
import { InstagramIcon } from "./icons/InstagramIcon";
import { FacebookIcon } from "./icons/FacebookIcon";

// Augment the Window interface to include dataLayer
declare global {
  interface Window {
    dataLayer?: Record<string, any>[];
  }
}

export const SocialMediaSection = () => {
  // Use a React callback to ensure this doesn't cause issues during server rendering
  const handleSocialLinkClick = (platformName: string, url: string) => {
    try {
      // Double-check we're on the client side
      if (typeof window !== 'undefined') {
        // Initialize dataLayer if it doesn't exist yet
        window.dataLayer = window.dataLayer || [];
        
        window.dataLayer.push({
          event: 'social_link_click', // Custom event name for GTM
          social_platform: platformName,
          social_url: url,
        });
      }
    } catch (err) {
      // Silently handle any errors to prevent breaking the UI
      console.error('GTM error:', err);
    }
    // Navigation will proceed via the href attribute of the <a> tag
  };

  const socialLinks = [
    {
      name: "TikTok",
      href: "https://www.tiktok.com/@dudurave.vip?_t=ZN-8wefbSsMKec&_r=1",
      icon: TikTokIcon,
      hoverClass: "hover:text-pink-500",
    },
    {
      name: "YouTube",
      href: "#", // Replace with your YouTube URL
      icon: YouTubeIcon,
      hoverClass: "hover:text-red-600",
    },
    {
      name: "Instagram",
      href: "https://www.instagram.com/dudurave.vip?igsh=dDczYTZiZTM1Z3ow",
      icon: InstagramIcon,
      hoverClass: "hover:text-pink-400",
    },
    {
      name: "Facebook",
      href: "#", // Replace with your Facebook URL
      icon: FacebookIcon,
      hoverClass: "hover:text-blue-600",
    },
  ];

  return (
    <section className="py-12 md:py-16 bg-black text-white">
      <div className="container mx-auto px-4">
        <div className="flex justify-center items-center space-x-6 md:space-x-8">
          {socialLinks.map((link) => {
            const IconComponent = link.icon;
            return (
              <a
                key={link.name}
                href={link.href}
                aria-label={link.name}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/70 hover:text-white transition-colors"
                onClick={() => handleSocialLinkClick(link.name, link.href)}
              >
                <IconComponent className={`${link.hoverClass} transition-colors`} />
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
};
