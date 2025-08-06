"use client";

import { useState } from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const images = [
  {
    src: "/images/001.jpeg",
    alt: "sashimi platter",
    data_ai_hint: "sashimi platter",
  },
  {
    src: "/images/002.jpeg",
    alt: "sushi rolls",
    data_ai_hint: "sushi rolls",
  },
  {
    src: "/images/003.jpeg",
    alt: "sushi chef preparing sushi",
    data_ai_hint: "sushi chef preparing sushi",
  },
  {
    src: "/images/004.jpeg",
    alt: "restaurant interior",
    data_ai_hint: "restaurant interior",
  },
  {
    src: "/images/005.jpeg",
    alt: "craft cocktails",
    data_ai_hint: "craft cocktails",
  },
  {
    src: "/images/006.jpeg",
    alt: "dessert platter",
    data_ai_hint: "dessert platter",
  },
  {
    src: "/images/007.jpeg",
    alt: "sushi platter with drinks",
    data_ai_hint: "sushi platter with drinks",
  },
  {
    src: "/images/008.jpeg",
    alt: "sushi rolls with chopsticks",
    data_ai_hint: "sushi rolls with chopsticks",
  },
  {
    src: "/images/009.jpeg",
    alt: "sushi chef at work",
    data_ai_hint: "sushi chef at work",
  },
  {
    src: "/images/010.jpeg",
    alt: "sushi platter with sake",
    data_ai_hint: "sushi platter with sake",
  },
  {
    src: "/images/011.jpeg",
    alt: "sushi rolls with wasabi and ginger",
    data_ai_hint: "sushi rolls with wasabi and ginger",
  },
  {
    src: "/images/012.jpeg",
    alt: "sushi platter with drinks",
    data_ai_hint: "sushi platter with drinks",
  },
  {
    src: "/images/013.jpeg",
    alt: "sushi rolls with chopsticks",
    data_ai_hint: "sushi rolls with chopsticks",
  },
  {
    src: "/images/014.jpeg",
    alt: "sushi chef at work",
    data_ai_hint: "sushi chef at work",
  },
  {
    src: "/images/015.jpeg",
    alt: "sushi platter with sake",
    data_ai_hint: "sushi platter with sake",
  },
  {
    src: "/images/016.jpeg",
    alt: "sushi rolls with wasabi and ginger",
    data_ai_hint: "sushi rolls with wasabi and ginger",
  },
];

export default function GalleryPage() {
  const [selectedImage, setSelectedImage] = useState<(typeof images)[0] | null>(
    null
  );

  return (
    <div className="container mx-auto px-4 py-12 md:py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-headline font-bold">
          Gallery
        </h1>
        <p className="text-lg text-muted-foreground mt-2">
          A glimpse into the Blue Bird Haus experience.
        </p>
      </div>

      <Dialog>
        <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
          {images.map((image, index) => (
            <div key={index} className="break-inside-avoid">
              <DialogTrigger asChild onClick={() => setSelectedImage(image)}>
                <Card className="overflow-hidden cursor-pointer">
                  <CardContent className="p-0">
                    <Image
                      src={image.src}
                      alt={image.alt}
                      width={600}
                      height={400}
                      className="w-full h-auto object-cover hover:scale-105 transition-transform duration-300"
                      data-ai-hint={image.data_ai_hint}
                    />
                  </CardContent>
                </Card>
              </DialogTrigger>
            </div>
          ))}
        </div>

        {selectedImage && (
          <DialogContent className="max-w-4xl p-2">
            <DialogHeader>
              <DialogTitle className="sr-only">{selectedImage.alt}</DialogTitle>
              <DialogDescription className="sr-only">
                A larger view of the gallery image: {selectedImage.alt}
              </DialogDescription>
            </DialogHeader>
            <Image
              src={selectedImage.src}
              alt={selectedImage.alt}
              width={1200}
              height={800}
              className="w-full h-auto object-contain rounded-lg"
            />
          </DialogContent>
        )}
      </Dialog>
    </div>
  );
}
