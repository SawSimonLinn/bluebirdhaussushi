"use client";
import { useEffect, useRef } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import Link from "next/link";
import { Utensils, Fish, GlassWater } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

// const heroImages = [
//   {
//     src: "/images/hero1.jpg",
//     alt: "Hero background image of a modern sushi restaurant interior",
//     data_ai_hint: "restaurant interior",
//   },
//   {
//     src: "/images/hero2.jpg",
//     alt: "A close-up of a beautifully presented sushi platter",
//     data_ai_hint: "sushi platter",
//   },
//   {
//     src: "/images/hero3.jpg",
//     alt: "Guests dining in a sophisticated and ambient restaurant",
//     data_ai_hint: "fine dining",
//   },
//   {
//     src: "/images/hero4.jpg",
//     alt: "A chef carefully preparing a sushi roll",
//     data_ai_hint: "sushi chef",
//   },
// ];

const heroImages = [
  {
    src: "/images/hero1.jpg",
    alt: "Modern sushi restaurant interior",
  },
  {
    src: "/images/hero2.jpg",
    alt: "Beautiful sushi platter",
  },
  {
    src: "/images/hero3.jpg",
    alt: "Guests dining",
  },
  {
    src: "/images/hero4.jpg",
    alt: "Chef preparing sushi",
  },
];

export default function Home() {
  const autoplay = useRef(Autoplay({ delay: 5000, stopOnInteraction: false }));
  const [emblaRef] = useEmblaCarousel({ loop: true }, [autoplay.current]);

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <section className="relative h-[60vh] md:h-[80vh] flex items-center justify-center text-center text-white">
          {/* <Carousel
            className="absolute inset-0 w-full h-full"
            plugins={[
              Autoplay({
                delay: 5000,
                stopOnInteraction: false,
                stopOnMouseEnter: true,
              }),
            ]}
            opts={{ loop: true }}
          >
            <CarouselContent className="w-full h-full">
              {heroImages.map((image, index) => (
                <CarouselItem key={index} className="relative w-full h-full">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    style={{ objectFit: "cover" }}
                    className="z-0"
                    data-ai-hint={image.data_ai_hint}
                    priority={index === 0}
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel> */}

          <div className="absolute inset-0 bg-black/50 z-10" />
          <div className="embla absolute inset-0 z-0" ref={emblaRef}>
            <div className="embla__container flex h-full">
              {heroImages.map((image, index) => (
                <div
                  key={index}
                  className="embla__slide relative min-w-full h-full aspect-square"
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    priority={index === 0}
                    style={{ objectFit: "cover" }}
                    sizes="100vw"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="absolute inset-0 bg-black/50 z-10" />
          <div className="z-20 relative px-4">
            <h1 className="font-headline text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight">
              Blue Bird Haus
            </h1>
            <p className="mt-4 text-lg md:text-xl max-w-2xl mx-auto font-body">
              Experience the art of sushi in a setting of serene sophistication.
            </p>
            <div className="mt-8 flex justify-center gap-4">
              <Button asChild size="lg" className="font-body">
                <Link href="/menu">View Menu</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="secondary"
                className="font-body"
              >
                <Link href="/reservations">Book a Table</Link>
              </Button>
            </div>
          </div>
        </section>

        <section id="specialties" className="py-16 md:py-24 bg-background">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-headline text-center mb-12">
              Our Specialties
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="text-center hover:shadow-xl transition-shadow duration-300">
                <CardHeader>
                  <div className="mx-auto bg-primary text-primary-foreground rounded-full p-4 w-fit">
                    <Fish className="w-8 h-8" />
                  </div>
                  <CardTitle className="font-headline mt-4">
                    Signature Rolls
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p>
                    Creative and classic rolls made with the freshest,
                    sustainably-sourced fish.
                  </p>
                </CardContent>
              </Card>
              <Card className="text-center hover:shadow-xl transition-shadow duration-300">
                <CardHeader>
                  <div className="mx-auto bg-primary text-primary-foreground rounded-full p-4 w-fit">
                    <GlassWater className="w-8 h-8" />
                  </div>
                  <CardTitle className="font-headline mt-4">
                    Craft Cocktails
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p>
                    A curated selection of cocktails and sake designed to
                    perfectly complement your meal.
                  </p>
                </CardContent>
              </Card>
              <Card className="text-center hover:shadow-xl transition-shadow duration-300">
                <CardHeader>
                  <div className="mx-auto bg-primary text-primary-foreground rounded-full p-4 w-fit">
                    <Utensils className="w-8 h-8" />
                  </div>
                  <CardTitle className="font-headline mt-4">
                    Elegant Ambiance
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p>
                    Dine in a tranquil and modern space, perfect for any
                    occasion.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <Separator />

        <section className="py-16 md:py-24 bg-secondary/50">
          <div className="container mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-headline mb-4">
                Our Story
              </h2>
              <p className="mb-4 text-muted-foreground">
                Founded on the principles of quality, creativity, and harmony,
                Blue Bird Haus offers a contemporary take on traditional sushi.
                Our name is inspired by the simple beauty and elegance of
                nature, a philosophy that we bring to every dish we create.
              </p>
              <p className="mb-6 text-muted-foreground">
                Our chefs are dedicated to the craft of sushi making, sourcing
                only the finest ingredients to create a dining experience that
                delights the senses.
              </p>
              <Button asChild variant="link" className="p-0 h-auto">
                <Link href="/about">Learn More &rarr;</Link>
              </Button>
            </div>
            <div className="relative h-80 md:h-96 rounded-lg bg-white overflow-hidden shadow-lg flex items-center justify-center">
              <Image
                src="/logo.png"
                alt="Chefs preparing sushi"
                width={300}
                height={300}
                className="rounded-lg object-cover"
                data-ai-hint="sushi chef"
              />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
