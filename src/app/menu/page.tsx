"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Utensils,
  IceCream,
  Soup,
  Leaf,
  CookingPot,
  Salad,
  Fish,
} from "lucide-react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { menu, MenuItemType } from "@/data/menu";

function MenuItem({
  name,
  description,
  price,
  src,
  data_ai_hint,
  note,
  isVegan,
  isCooked,
}: MenuItemType) {
  return (
    <Card className="hover:shadow-md transition-shadow overflow-hidden flex flex-col justify-between">
      {src && (
        <div className="relative aspect-square">
          <Image
            src={src}
            alt={name}
            layout="fill"
            objectFit="cover"
            data-ai-hint={data_ai_hint}
          />
        </div>
      )}
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="font-headline text-xl">{name}</CardTitle>
            <CardDescription className="pt-2">{description}</CardDescription>
          </div>
          <div className="text-lg font-semibold text-primary pl-4">
            ${price}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2">
          {note && (
            <Badge
              variant={note.includes("Recommended") ? "default" : "secondary"}
            >
              {note}
            </Badge>
          )}
          {isVegan ? (
            <Badge variant="outline">Vegan</Badge>
          ) : (
            isCooked !== undefined && (
              <Badge variant={isCooked ? "secondary" : "destructive"}>
                {isCooked ? "Cooked" : "Raw"}
              </Badge>
            )
          )}
        </div>
      </CardContent>
    </Card>
  );
}

export default function MenuPage() {
  const [showVeganOnly, setShowVeganOnly] = useState(false);
  const [dietaryFilter, setDietaryFilter] = useState("all"); // 'all', 'cooked', 'raw'

  const filteredMenu = (items: MenuItemType[]) => {
    return items.filter((item) => {
      const veganMatch = !showVeganOnly || item.isVegan;
      const dietaryMatch =
        dietaryFilter === "all" ||
        (dietaryFilter === "cooked" && item.isCooked) ||
        (dietaryFilter === "raw" && !item.isCooked);
      return veganMatch && dietaryMatch;
    });
  };

  return (
    <div className="container mx-auto px-4 py-12 md:py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-headline font-bold">
          Our Menu
        </h1>
        <p className="text-lg text-muted-foreground mt-2">
          A symphony of flavors, crafted with passion and all vegan friendly.
        </p>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-center gap-8 mb-12">
        <div className="flex items-center space-x-2">
          <Switch
            id="vegan-toggle"
            checked={showVeganOnly}
            onCheckedChange={setShowVeganOnly}
          />
          <Label htmlFor="vegan-toggle" className="text-base">
            Show Vegan Only
          </Label>
        </div>
        <RadioGroup
          defaultValue="all"
          onValueChange={setDietaryFilter}
          className="flex items-center space-x-4"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="all" id="r-all" />
            <Label htmlFor="r-all">All</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="cooked" id="r-cooked" />
            <Label htmlFor="r-cooked">Cooked</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="raw" id="r-raw" />
            <Label htmlFor="r-raw">Raw</Label>
          </div>
        </RadioGroup>
      </div>

      <Tabs defaultValue="delightfulRolls" className="w-full">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 h-auto">
          <TabsTrigger value="appetizers" className="py-2.5">
            <Leaf className="w-4 h-4 mr-2" />
            Appetizers
          </TabsTrigger>
          <TabsTrigger value="salads" className="py-2.5">
            <Salad className="w-4 h-4 mr-2" />
            Salads
          </TabsTrigger>
          <TabsTrigger value="traditionalRolls" className="py-2.5">
            <Utensils className="w-4 h-4 mr-2" />
            Traditional Rolls
          </TabsTrigger>
          <TabsTrigger value="delightfulRolls" className="py-2.5">
            <IceCream className="w-4 h-4 mr-2" />
            Delightful Rolls
          </TabsTrigger>
          <TabsTrigger value="nigiri" className="py-2.5">
            <Fish className="w-4 h-4 mr-2" />
            Nigiri (2 Pcs)
          </TabsTrigger>
          <TabsTrigger value="ramen" className="py-2.5">
            <Soup className="w-4 h-4 mr-2" />
            Ramen
          </TabsTrigger>
          <TabsTrigger value="sushiRiceBowl" className="py-2.5">
            <CookingPot className="w-4 h-4 mr-2" />
            Sushi Rice Bowl
          </TabsTrigger>
        </TabsList>

        <TabsContent value="appetizers" className="mt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredMenu(menu.appetizers).map((item) => (
              <MenuItem key={item.name} {...item} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="salads" className="mt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredMenu(menu.salads).map((item) => (
              <MenuItem key={item.name} {...item} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="traditionalRolls" className="mt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredMenu(menu.traditionalRolls).map((item) => (
              <MenuItem key={item.name} {...item} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="delightfulRolls" className="mt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredMenu(menu.delightfulRolls).map((item) => (
              <MenuItem key={item.name} {...item} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="nigiri" className="mt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredMenu(menu.nigiri).map((item) => (
              <MenuItem key={item.name} {...item} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="ramen" className="mt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredMenu(menu.ramen).map((item) => (
              <MenuItem key={item.name} {...item} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="sushiRiceBowl" className="mt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredMenu(menu.sushiRiceBowl).map((item) => (
              <MenuItem key={item.name} {...item} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
