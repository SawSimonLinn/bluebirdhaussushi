import Link from "next/link";
import { Facebook, Instagram, Twitter, UtensilsCrossed } from "lucide-react";
import { FaYelp } from "react-icons/fa";
import Image from "next/image";

export function Footer() {
  return (
    <footer className="bg-secondary/70">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          <div>
            <Link href="/" className="mb-4 inline-flex items-center space-x-2">
              <Image
                src="/logo.png"
                alt="Blue Bird Haus Logo"
                width={45}
                height={45}
                className="h-8 w-8 rounded-full"
              />
              <span className="font-bold text-lg font-headline">
                Blue Bird Haus
              </span>
            </Link>
            <p className="text-muted-foreground text-sm">
              The finest sushi experience, blending tradition with modern
              elegance.
            </p>
          </div>
          <div>
            <h3 className="font-headline font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/menu"
                  className="text-sm text-muted-foreground hover:text-primary"
                >
                  Menu
                </Link>
              </li>
              <li>
                <Link
                  href="/reservations"
                  className="text-sm text-muted-foreground hover:text-primary"
                >
                  Reservations
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-sm text-muted-foreground hover:text-primary"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-sm text-muted-foreground hover:text-primary"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-headline font-semibold mb-4">Follow Us</h3>
            <div className="flex justify-center md:justify-start space-x-4">
              <a
                href="https://www.facebook.com/profile.php?id=100083751994296"
                target="_blank"
                className="text-muted-foreground hover:text-primary"
              >
                <Facebook />
              </a>
              <a
                href="https://www.instagram.com/blue.bird.haus/"
                target="_blank"
                className="text-muted-foreground hover:text-primary"
              >
                <Instagram />
              </a>
              <a
                href="https://www.yelp.com/biz/blue-bird-haus-long-beach"
                target="_blank"
                className="text-muted-foreground hover:text-primary"
              >
                <FaYelp className="w-5 h-5" />
              </a>
            </div>
            <p className="text-sm text-muted-foreground mt-4">
              1532 E Broadway Long Beach, CA 90802
            </p>
            <p className="text-sm text-muted-foreground">(562) 533-2460</p>
          </div>
        </div>
        <div className="border-t mt-8 pt-6 text-center text-sm text-muted-foreground">
          <p>
            &copy; {new Date().getFullYear()} Blue Bird Haus. All Rights
            Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
