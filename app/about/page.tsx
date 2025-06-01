"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Navbar } from "@/components/ui/navbar";
import { getAboutPageContent } from "@/lib/hygraph";
import { AboutPageContent } from "@/lib/types";

export default function AboutPage() {
  const [aboutData, setAboutData] = useState<AboutPageContent | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAboutData = async () => {
      try {
        setIsLoading(true);
        const data = await getAboutPageContent();
        setAboutData(data);
        setIsLoading(false);
      } catch (err) {
        console.error("Failed to fetch about page data:", err);
        setError("Failed to load about page content. Please try again later.");
        setIsLoading(false);
      }
    };

    fetchAboutData();
  }, []);

  return (
    <>
      <Navbar />
      <main className="container mx-auto px-4 py-24 min-h-[calc(100vh-200px)]">
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : error ? (
          <div className="text-center text-red-500 py-8">
            <p>{error}</p>
            {/* Fallback content */}
            <Card className="max-w-4xl mx-auto mt-8">
              <CardHeader>
                <CardTitle className="text-4xl font-bold">About Us</CardTitle>
                <CardDescription>
                  Learn more about our mission and values
                </CardDescription>
              </CardHeader>
              <CardContent className="prose prose-slate dark:prose-invert">
                <p className="text-lg leading-relaxed mb-6">
                  We are dedicated to creating meaningful experiences and
                  fostering connections within our community. Our platform
                  brings people together through carefully curated events and
                  engaging content.
                </p>
              </CardContent>
            </Card>
          </div>
        ) : (
          <Card className="max-w-4xl mx-auto">
            <CardHeader>
              <CardTitle className="text-4xl font-bold">
                {aboutData?.title}
              </CardTitle>
              <CardDescription>{aboutData?.subtitle}</CardDescription>
            </CardHeader>
            <CardContent className="prose prose-slate dark:prose-invert">
              <p className="text-lg leading-relaxed mb-6">
                {aboutData?.introText}
              </p>

              <h2 className="text-2xl font-semibold mt-8 mb-4">
                {aboutData?.missionTitle}
              </h2>
              <p className="text-lg leading-relaxed mb-6">
                {aboutData?.missionText}
              </p>

              <h2 className="text-2xl font-semibold mt-8 mb-4">
                {aboutData?.valuesTitle}
              </h2>

              <ul className="list-disc pl-6 space-y-3">
                {aboutData?.valuesList?.map((value) => (
                  <li key={value.id}>
                    <strong>{value.title}:</strong> {value.description}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        )}
      </main>
    </>
  );
}
