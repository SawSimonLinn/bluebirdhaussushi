import Image from "next/image";
import { Separator } from "@/components/ui/separator";

export default function AboutPage() {
  return (
    <div className="bg-background">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-headline font-bold">
            About Blue Bird Haus
          </h1>
          <p className="text-lg text-muted-foreground mt-2">
            Crafting moments of culinary delight.
          </p>
        </div>

        <div className="grid md:grid-cols-5 md:gap-12 items-center">
          <div className="md:col-span-3">
            <h2 className="text-3xl font-headline mb-4">Our Philosophy</h2>
            <p className="text-muted-foreground mb-4">
              Founded on the principles of quality, creativity, and harmony,
              Blue Bird Haus offers a contemporary take on traditional sushi.
              Our name is inspired by the simple beauty and elegance of nature,
              a philosophy that we bring to every dish we create. We believe
              that dining is not just about food, but about the experience — a
              symphony of flavors, aesthetics, and atmosphere.
            </p>
            <p className="text-muted-foreground">
              Our mission is to transport our guests to a state of bliss through
              meticulous craftsmanship and a serene dining environment. We are
              committed to sustainability and responsible sourcing, ensuring
              that our ingredients are as fresh as they are ethical.
            </p>
          </div>
          <div className="md:col-span-2 mt-8 md:mt-0">
            <div className="relative h-96 rounded-lg overflow-hidden shadow-xl">
              <Image
                src="https://s3-media0.fl.yelpcdn.com/bphoto/VHUxIcz6NDxt4mzzdhXhgg/o.jpg"
                alt="A serene corner of the Blue Bird Haus restaurant"
                layout="fill"
                objectFit="cover"
                data-ai-hint="serene restaurant"
              />
            </div>
          </div>
        </div>

        <Separator className="my-12 md:my-16" />

        <div className="grid md:grid-cols-5 md:gap-12 items-center">
          <div className="md:col-span-2 order-2 md:order-1 mt-8 md:mt-0">
            <div className="relative h-96 rounded-lg overflow-hidden shadow-xl">
              <Image
                src="https://s3-media0.fl.yelpcdn.com/bphoto/Cvfk_ZQrYCc6L7C8iqWYlg/o.jpg"
                alt="Our head chef meticulously preparing a sushi roll"
                layout="fill"
                objectFit="cover"
                data-ai-hint="chef preparing"
              />
            </div>
          </div>
          <div className="md:col-span-3 order-1 md:order-2">
            <h2 className="text-3xl font-headline mb-4">The Art of Sushi</h2>
            <p className="text-muted-foreground mb-4">
              At the heart of Blue Bird Haus is our team of dedicated chefs.
              With years of experience and a deep respect for tradition, they
              skillfully transform the finest ingredients into edible art. Each
              roll, each slice of sashimi, and each garnish is placed with
              intention and precision.
            </p>
            <p className="text-muted-foreground">
              We invite you to watch our chefs at work at our open sushi bar, a
              testament to our transparency and passion for the craft. Join us
              for a meal and become part of our story.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
