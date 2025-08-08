"use client";
import { useEffect, useRef } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import Link from "next/link";
import { Utensils, Fish, ChefHat, Star } from "lucide-react";
import { FaGoogle } from "react-icons/fa";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import Autoplay from "embla-carousel-autoplay";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

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

const reviews = [
  {
    name: "Ferris Behm",
    avatar:
      "https://media2.dev.to/dynamic/image/width=800%2Cheight=%2Cfit=scale-down%2Cgravity=auto%2Cformat=auto/https%3A%2F%2Fwww.gravatar.com%2Favatar%2F2c7d99fe281ecd3bcd65ab915bac6dd5%3Fs%3D250",
    rating: 5,
    review:
      "Highly recommend. I got the Three Kings Roll and the Atlantic Roll and they were AMAZING!!!! The vegetarian/vegan options are amazing as well. The Vegan tenmpura bowl was stacked. Atmosphere was so nice and service was attentive!",
    data_ai_hint: "happy customer",
  },
  {
    name: "Jessica Spencer",
    avatar:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=922&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    rating: 5,
    review:
      "The food and service were amazing! The curry ramen is brilliant! The rolls were very good. Super nice owners. Will definitely be back!",
    data_ai_hint: "pleased diner",
  },
  {
    name: "Andrew Rogers",
    avatar:
      "https://harvardtechnologyreview.com/wp-content/uploads/2023/10/image.jpeg",
    rating: 5,
    review:
      "Excellent spot for sushi in the neighborhood. Loved the monstrosity they called a Baked Salmon Avocado with eel sauce appetizer. It was insanely great (first photo). I got the caterpillar roll and it was really great.",
    data_ai_hint: "person eating",
  },
  {
    name: "Sarah Trettner",
    avatar:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSv_rkox4AOiwfzaLsYaEtftpv4xfl-lSAGxg&s",
    rating: 5,
    review:
      "We always choose restaurants based on Google ratings and this one had a 4.6 according to Google. It was much better!!!!! We would recommend this restaurant 100% because of the very tasty food and the outstanding service!",
    data_ai_hint: "food blogger",
  },
  {
    name: "Neesha Patel",
    avatar:
      "https://www.macfound.org/media/fellows/profile_photos/wilson_2001_profile-240.png",
    rating: 5,
    review:
      "They have a whole vegan menu! They make their vegan fish from different plant sources included roots. Must try! The ambiance is great and the staff is super friendly.",
    data_ai_hint: "happy couple",
  },
];

const faqs = [
  {
    question: "Is parking available?",
    answer:
      "Yes, we understand that parking in Los Angeles can be challenging. We have a dedicated parking lot for our guests, as well as street parking available nearby.",
  },
  {
    question: "Are all your menu items 100% vegan?",
    answer:
      "Yes, absolutely! We are proud to offer a completely plant-based menu. Everything from our sushi to our ramen and desserts is 100% vegan.",
  },

  {
    question: "Do you offer catering for private events?",
    answer:
      "Yes, we offer comprehensive catering services and options for private events. Please visit our 'Events / Catering' section or contact us directly for more details.",
  },
  {
    question: "Do you have options for people with nut allergies?",
    answer:
      "We are very careful about allergens. While some of our dishes contain nuts, we take precautions to prevent cross-contamination. Please speak with your server for recommendations.",
  },
];

export default function Home() {
  const autoplay = useRef(Autoplay({ delay: 5000, stopOnInteraction: false }));
  const [emblaRef] = useEmblaCarousel({ loop: true }, [autoplay.current]);

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <section className="relative h-[60vh] md:h-[80vh] flex items-center justify-center text-center text-white overflow-hidden">
          {/* 🔁 Background Carousel */}
          <div className="embla absolute inset-0 z-0" ref={emblaRef}>
            <div className="embla__container flex h-full">
              {heroImages.map((image, index) => (
                <div
                  key={index}
                  className="embla__slide relative min-w-full h-full"
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

          {/* 🔲 Overlay */}
          <div className="absolute inset-0 bg-black/65 z-10" />

          {/* 💬 Content */}
          <div className="relative z-10 p-4 animate-in fade-in slide-in-from-top-12 duration-1000">
            <h1 className="font-headline text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight">
              Blue Bird Haus
            </h1>
            <p className="mt-4 text-lg md:text-xl max-w-2xl font-body">
              Where culinary artistry meets plant-based innovation. Discover our
              acclaimed vegan sushi and traditional favorites.
            </p>
            <div className="mt-8 flex gap-4 justify-center">
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
            <div className="mt-10 flex items-center justify-center">
              <div className="flex -space-x-2">
                <Avatar className="inline-block h-10 w-10 rounded-full ring-2 ring-background">
                  <AvatarImage
                    src="https://plus.unsplash.com/premium_photo-1667512827876-c410272b202b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="Customer avatar"
                    data-ai-hint="happy customer"
                    className="object-cover"
                  />
                  <AvatarFallback>A</AvatarFallback>
                </Avatar>
                <Avatar className="inline-block h-10 w-10 rounded-full ring-2 ring-background">
                  <AvatarImage
                    src="https://plus.unsplash.com/premium_photo-1664478039038-e0ec48d55ef2?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="Customer avatar"
                    data-ai-hint="pleased diner"
                    className="object-cover"
                  />
                  <AvatarFallback>B</AvatarFallback>
                </Avatar>
                <Avatar className="inline-block h-10 w-10 rounded-full ring-2 ring-background">
                  <AvatarImage
                    src="https://plus.unsplash.com/premium_photo-1670002234824-3f2c43d55547?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="Customer avatar"
                    data-ai-hint="person eating"
                    className="object-cover"
                  />
                  <AvatarFallback>C</AvatarFallback>
                </Avatar>
              </div>
              <div className="ml-4 text-left">
                <p className="font-semibold">Join over 1,000 happy guests</p>
                <p className="text-sm">every month</p>
              </div>
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
                    <ChefHat className="w-8 h-8" />
                  </div>
                  <CardTitle className="font-headline mt-4">
                    Fresh Ingredients
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p>
                    Every dish is prepared with carefully selected ingredients
                    for unmatched flavor and freshness.
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

        <section className="py-16 md:py-24 bg-background">
          <div className="container mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
            <div className="relative h-80 md:h-96 rounded-lg overflow-hidden shadow-lg order-2 md:order-1">
              <Image
                src="https://images.squarespace-cdn.com/content/v1/646aee611bef74384609e65e/01a1c8d7-df9c-49e6-90c2-646207da5a60/IMG_8396.jpg"
                alt="A beautiful catering setup for a private event"
                layout="fill"
                objectFit="cover"
                data-ai-hint="event catering"
              />
            </div>
            <div className="order-1 md:order-2">
              <h2 className="text-3xl md:text-4xl font-headline mb-4">
                Events & Catering
              </h2>
              <p className="mb-4 text-muted-foreground">
                Elevate your special occasions with the exquisite flavors of
                Blue Bird Haus. We offer private dining options and full-service
                catering for events of all sizes. From corporate gatherings to
                intimate celebrations, our team will work with you to create a
                memorable culinary experience.
              </p>
              <p className="mb-6 text-muted-foreground">
                Choose from our curated party trays or customize a menu that
                perfectly suits your event.
              </p>
              <Button asChild>
                <Link href="/contact">Inquire Now</Link>
              </Button>
            </div>
          </div>
        </section>

        <Separator />

        <section className="py-16 md:py-24 bg-secondary/50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-headline">
                What Our Guests Are Saying
              </h2>
              <div className="flex justify-center items-center gap-2 mt-4">
                <FaGoogle className="w-6 h-6 text-blue-500" />
                <Badge variant="outline">Google Reviews</Badge>
              </div>
            </div>

            <Carousel
              opts={{
                align: "start",
                loop: true,
              }}
              className="w-full"
            >
              <CarouselContent className="-ml-4">
                {reviews.map((review, index) => (
                  <CarouselItem
                    key={index}
                    className="pl-4 md:basis-1/2 lg:basis-1/3"
                  >
                    <div className="p-1 h-full">
                      <Card className="flex flex-col h-full">
                        <CardHeader className="flex flex-row items-center gap-4">
                          <Avatar className="h-12 w-12">
                            <AvatarImage
                              src={review.avatar}
                              alt={review.name}
                              data-ai-hint={review.data_ai_hint}
                              className="object-cover"
                            />
                            <AvatarFallback>
                              {review.name.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <CardTitle className="text-lg">
                              {review.name}
                            </CardTitle>
                            <div className="flex text-yellow-500">
                              {[...Array(review.rating)].map((_, i) => (
                                <Star
                                  key={i}
                                  className="w-5 h-5 fill-current"
                                />
                              ))}
                              {[...Array(5 - review.rating)].map((_, i) => (
                                <Star key={i} className="w-5 h-5" />
                              ))}
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent className="flex-grow">
                          <p className="text-muted-foreground">
                            "{review.review}"
                          </p>
                        </CardContent>
                      </Card>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="ml-10" />
              <CarouselNext className="mr-10" />
            </Carousel>
          </div>
        </section>

        <Separator />

        <section className="py-16 md:py-24 bg-background">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-headline text-center mb-12">
              Frequently Asked Questions
            </h2>
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem value={`item-${index}`} key={index}>
                  <AccordionTrigger className="text-lg text-left">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-base text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>
      </main>
    </div>
  );
}
