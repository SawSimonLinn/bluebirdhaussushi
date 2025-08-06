import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import { Phone, Mail, Clock, MapPin } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-12 md:py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-headline font-bold">
          Contact Us
        </h1>
        <p className="text-lg text-muted-foreground mt-2">
          We'd love to hear from you. Reach out or visit us.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 mb-12">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline flex items-center">
              <MapPin className="mr-3 h-6 w-6 text-primary" />
              Our Location
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">1532 E Broadway</p>
            <p className="text-muted-foreground">Long Beach, CA 90802</p>
            <div className="mt-4">
              <a
                href="https://maps.app.goo.gl/kNJ2vvCE64a4JVw1A"
                className="text-sm font-semibold text-primary hover:underline"
              >
                Get Directions
              </a>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="font-headline flex items-center">
              <Clock className="mr-3 h-6 w-6 text-primary" />
              Business Hours
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="text-muted-foreground space-y-1">
              <li>
                <strong>Monday - Thursday:</strong> 12:00 PM - 9:00 PM
              </li>
              <li>
                <strong>Friday - Saturday:</strong> 5:00 PM - 10:00 PM
              </li>
              <li>
                <strong>Sunday:</strong> 12:00 PM - 9:00 PM
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="font-headline flex items-center">
              <Phone className="mr-3 h-6 w-6 text-primary" />
              Get In Touch
            </CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold">
                Reservations & General Inquiries
              </h3>
              <a
                href="tel:562-533-2460"
                className="text-primary hover:underline"
              >
                (562) 533-2460
              </a>
            </div>
            <div>
              <h3 className="font-semibold">Private Events & Catering</h3>
              <a
                href="mailto:events@bluebirdhaus.com"
                className="text-primary hover:underline"
              >
                events@bluebirdhaus.com
              </a>
            </div>
          </CardContent>
        </Card>
      </div>

      <Separator />

      <div className="mt-12">
        <h2 className="text-3xl font-headline text-center mb-6">Find Us</h2>
        <div className="relative w-full h-96 rounded-lg overflow-hidden border">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d829.1798953597859!2d-118.17222387665176!3d33.76791147979578!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80dd31107463790b%3A0x9c1c49e6617cef2c!2sBlue%20Bird%20Haus!5e0!3m2!1sen!2sus!4v1754451468107!5m2!1sen!2sus"
            width="1502"
            height="450"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </div>
  );
}
