"use client";

import Link from "next/link";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

export function Navbar() {
  return (
    <header className="fixed top-0 w-full z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-2xl font-bold">DuduRave</span>
        </Link>
        
        <div className="hidden md:flex items-center space-x-8">
          <Link href="/" className="text-foreground/60 hover:text-foreground">
            Home
          </Link>
          <Link href="/events" className="text-foreground/60 hover:text-foreground">
            Events
          </Link>
          <Link href="/about" className="text-foreground/60 hover:text-foreground">
            About
          </Link>
          <Link href="/contact" className="text-foreground/60 hover:text-foreground">
            Contact
          </Link>
        </div>

        <Sheet>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right">
            <nav className="flex flex-col space-y-4">
              <Link href="/" className="text-foreground/60 hover:text-foreground">
                Home
              </Link>
              <Link href="/events" className="text-foreground/60 hover:text-foreground">
                Events
              </Link>
              <Link href="/about" className="text-foreground/60 hover:text-foreground">
                About
              </Link>
              <Link href="/contact" className="text-foreground/60 hover:text-foreground">
                Contact
              </Link>
            </nav>
          </SheetContent>
        </Sheet>
      </nav>
    </header>
  );
}