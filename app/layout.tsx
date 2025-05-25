import "./globals.css";
import type { Metadata } from "next";
import { Footer } from "@/components/Footer";

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
      <body className="font-body">
        {children}
        <Footer />
      </body>
    </html>
  );
}
