import { NewsletterSection } from "@/components/NewsletterSection";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Navbar } from "@/components/ui/navbar";

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="container mx-auto px-4 py-24">
        <Card className="max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle className="text-4xl font-bold">About Us</CardTitle>
            <CardDescription>
              Learn more about our mission and values
            </CardDescription>
          </CardHeader>
          <CardContent className="prose prose-slate dark:prose-invert">
            <p className="text-lg leading-relaxed mb-6">
              We are dedicated to creating meaningful experiences and fostering
              connections within our community. Our platform brings people
              together through carefully curated events and engaging content.
            </p>
            <h2 className="text-2xl font-semibold mt-8 mb-4">Our Mission</h2>
            <p className="text-lg leading-relaxed mb-6">
              To provide a seamless and engaging platform that connects people
              through shared interests and memorable experiences. We believe in
              the power of community and the impact of bringing people together.
            </p>
            <h2 className="text-2xl font-semibold mt-8 mb-4">Our Values</h2>
            <ul className="list-disc pl-6 space-y-3">
              <li>
                Community First: We prioritize building meaningful connections
              </li>
              <li>
                Quality Experience: Every detail matters in creating memorable
                moments
              </li>
              <li>
                Inclusivity: Everyone is welcome and valued in our community
              </li>
              <li>Innovation: Constantly improving to serve you better</li>
            </ul>
          </CardContent>
        </Card>
      </main>
      <NewsletterSection />
    </>
  );
}
