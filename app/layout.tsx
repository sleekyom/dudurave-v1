import "./globals.css";
import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import Script from 'next/script';

export const metadata: Metadata = {
  title: "DuduRave",
  description: "Experience the best African cultural events and celebrations",
  icons: { icon: "/favicon.ico" }
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Google Tag Manager - Script Component handles client/server rendering properly */}
        <Script
          id="gtm-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-N4RWTG7J');
            `
          }}
        />
        {/* End Google Tag Manager */}
      </head>
      <body className="font-body">
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-N4RWTG7J"
            height="0"
            width="0"
            style={{display: 'none', visibility: 'hidden'}}
          ></iframe>
        </noscript>
        {/* End Google Tag Manager (noscript) */}
        {children}
        <Footer />
      </body>
    </html>
  );
}
