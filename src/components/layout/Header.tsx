"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, UtensilsCrossed } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/menu", label: "Menu" },
  { href: "/gallery", label: "Gallery" },
  { href: "/about", label: "About Us" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <Link href="/" className="m-6 flex items-center space-x-2">
          <Image
            src="/logo.png"
            alt="Blue Bird Haus Logo"
            width={45}
            height={45}
            className="h-8 w-8 rounded-full"
          />
          <span className="font-bold font-headline">Blue Bird Haus</span>
        </Link>

        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "transition-colors hover:text-primary",
                pathname === link.href
                  ? "text-primary"
                  : "text-muted-foreground"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex flex-1 items-center justify-end space-x-4">
          <Button asChild className="hidden md:inline-flex">
            <Link href="/reservations">Book a Table</Link>
          </Button>

          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                {isMobileMenuOpen ? <X /> : <Menu />}
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <SheetHeader className="sr-only">
                <SheetTitle>Mobile Menu</SheetTitle>
                <SheetDescription>
                  Navigation links for Blue Bird Haus
                </SheetDescription>
              </SheetHeader>
              <div className="flex flex-col h-full">
                <div className="border-b pb-4">
                  <Link href="/" className="flex items-center space-x-2">
                    <UtensilsCrossed className="h-6 w-6 text-primary" />
                    <span className="font-bold font-headline">
                      Blue Bird Haus
                    </span>
                  </Link>
                </div>
                <nav className="flex flex-col space-y-4 mt-6">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={cn(
                        "text-lg font-medium transition-colors hover:text-primary",
                        pathname === link.href
                          ? "text-primary"
                          : "text-foreground"
                      )}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {link.label}
                    </Link>
                  ))}
                </nav>
                <div className="mt-auto pt-6">
                  <Button asChild className="w-full">
                    <Link
                      href="/reservations"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Book a Table
                    </Link>
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
