import { TikTokIcon } from "./icons/TikTokIcon";
import { YouTubeIcon } from "./icons/YouTubeIcon";
import { InstagramIcon } from "./icons/InstagramIcon";
import { FacebookIcon } from "./icons/FacebookIcon";

export const SocialMediaSection = () => {
  return (
    <section className="py-12 md:py-16 bg-black text-white">
      <div className="container mx-auto px-4">
        <div className="flex justify-center items-center space-x-6 md:space-x-8">
          <a
            href="https://www.tiktok.com/@dudurave.vip?_t=ZN-8wefbSsMKec&_r=1"
            aria-label="TikTok"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/70 hover:text-white transition-colors"
          >
            <TikTokIcon className="hover:text-pink-500 transition-colors" />
          </a>
          <a
            href="#" // Replace with your YouTube URL
            aria-label="YouTube"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/70 hover:text-white transition-colors"
          >
            <YouTubeIcon className="hover:text-red-600 transition-colors" />
          </a>
          <a
            href="https://www.instagram.com/dudurave.vip?igsh=dDczYTZiZTM1Z3ow"
            aria-label="Instagram"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/70 hover:text-white transition-colors"
          >
            <InstagramIcon className="hover:text-pink-400 transition-colors" />
          </a>
          <a
            href="#" // Replace with your Facebook URL
            aria-label="Facebook"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/70 hover:text-white transition-colors"
          >
            <FacebookIcon className="hover:text-blue-600 transition-colors" />
          </a>
        </div>
      </div>
    </section>
  );
};
