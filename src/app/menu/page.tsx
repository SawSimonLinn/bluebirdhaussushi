"use client";

import { useEffect, useState, useMemo } from "react";
import Image from "next/image";
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
  Fish,
  // If you really have Salad in your lucide version, keep it.
  // If not, swap for another icon (e.g., "Sprout") and update imports.
  Salad,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import { Client, Databases, Query } from "appwrite";

// ---------- Appwrite client (read-only) ----------
const client = new Client()
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!);

const db = new Databases(client);
const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!;
const MENU_COLLECTION_ID = process.env.NEXT_PUBLIC_MENU_COLLECTION_ID!;

// ---------- Types ----------
type MenuDoc = {
  $id: string;
  name: string;
  description?: string;
  price: number | string;
  category: string;
  src?: string;
  imageId?: string;
  note?: string | string[];
  isVegan?: boolean;
  isCooked?: boolean;
  order?: number;
};

// Fetch one category
async function getMenuByCategory(category: string) {
  const res = await db.listDocuments(DATABASE_ID, MENU_COLLECTION_ID, [
    Query.equal("category", category),
    Query.orderAsc("order"),
    Query.orderAsc("name"),
  ]);
  return res.documents as MenuDoc[];
}

// Tabs/categories (must match your DB `category` values)
const CATEGORIES = [
  { slug: "appetizers", label: "Appetizers", icon: Leaf },
  { slug: "salads", label: "Salads", icon: Salad }, // swap icon if Salad isn't available
  { slug: "traditionalRolls", label: "Traditional Rolls", icon: Utensils },
  { slug: "delightfulRolls", label: "Delightful Rolls", icon: IceCream },
  { slug: "sashimi", label: "Sashimi (8 Pcs)", icon: IceCream },
  { slug: "nigiri", label: "Nigiri (2 Pcs)", icon: Fish },
  { slug: "ramen", label: "Ramen", icon: Soup },
  { slug: "sushiRiceBowl", label: "Sushi Rice Bowl", icon: CookingPot },
];

function MenuItemCard(item: MenuDoc) {
  const noteText = Array.isArray(item.note)
    ? item.note.join("")
    : item.note ?? "";

  return (
    <Card className="hover:shadow-md transition-shadow overflow-hidden flex flex-col justify-between">
      {item.src && (
        <div className="relative aspect-square">
          <Image
            src={item.src}
            alt={item.name}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            style={{ objectFit: "cover" }}
            unoptimized
          />
        </div>
      )}

      <CardHeader>
        <div className="flex justify-between items-start gap-4">
          <div>
            <CardTitle className="font-headline text-xl">{item.name}</CardTitle>
            {item.description ? (
              <CardDescription className="pt-2">
                {item.description}
              </CardDescription>
            ) : null}
          </div>
          <div className="text-lg font-semibold text-primary shrink-0">
            $
            {typeof item.price === "number"
              ? item.price.toFixed(2)
              : item.price}
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <div className="flex flex-wrap gap-2">
          {noteText && (
            <Badge
              variant={
                noteText.toLowerCase().includes("recommend")
                  ? "default"
                  : "secondary"
              }
            >
              {noteText}
            </Badge>
          )}
          {item.isVegan ? (
            <Badge variant="outline" className="bg-green-600 text-white">
              Vegan
            </Badge>
          ) : item.isCooked !== undefined ? (
            <Badge variant={item.isCooked ? "secondary" : "destructive"}>
              {item.isCooked ? "Cooked" : "Raw"}
            </Badge>
          ) : null}
        </div>
      </CardContent>
    </Card>
  );
}

export default function MenuPage() {
  const [menuData, setMenuData] = useState<Record<string, MenuDoc[]>>({});
  const [loading, setLoading] = useState(true);
  const [showVeganOnly, setShowVeganOnly] = useState(false);
  const [dietaryFilter, setDietaryFilter] = useState<"all" | "cooked" | "raw">(
    "all"
  );
  const [activeTab, setActiveTab] = useState("delightfulRolls");

  useEffect(() => {
    (async function fetchMenus() {
      setLoading(true);
      const data: Record<string, MenuDoc[]> = {};
      await Promise.all(
        CATEGORIES.map(async (c) => {
          data[c.slug] = await getMenuByCategory(c.slug);
        })
      );
      setMenuData(data);
      setLoading(false);
    })();
  }, []);

  const filtered = useMemo(() => {
    const out: Record<string, MenuDoc[]> = {};
    for (const c of CATEGORIES) {
      const items = menuData[c.slug] ?? [];
      out[c.slug] = items.filter((item) => {
        const veganMatch = !showVeganOnly || item.isVegan === true;

        let dietaryMatch = true;
        if (dietaryFilter !== "all") {
          dietaryMatch =
            dietaryFilter === "cooked"
              ? item.isCooked === true
              : item.isCooked === false;
        }

        return veganMatch && dietaryMatch;
      });
    }
    return out;
  }, [menuData, showVeganOnly, dietaryFilter]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16">
        <p className="text-center text-muted-foreground">Loading menu…</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 md:py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-headline font-bold">
          Our Menu
        </h1>
        <p className="text-lg text-muted-foreground mt-2">
          A symphony of flavors, crafted with passion (with vegan options).
        </p>
      </div>

      {/* Filters */}
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
          value={dietaryFilter}
          onValueChange={(v) => setDietaryFilter(v as "all" | "cooked" | "raw")}
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

      {/* Tabs (controlled; remove defaultValue) */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 lg:grid-cols-8 h-auto">
          {CATEGORIES.map(({ slug, label, icon: Icon }) => (
            <TabsTrigger key={slug} value={slug} className="py-2.5">
              <Icon className="w-4 h-4 mr-2" />
              {label}
            </TabsTrigger>
          ))}
        </TabsList>

        {CATEGORIES.map(({ slug }) => (
          <TabsContent key={slug} value={slug} className="mt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {(filtered[slug] ?? []).map((item) => (
                <MenuItemCard key={item.$id} {...item} />
              ))}

              {filtered[slug] && filtered[slug].length === 0 && (
                <p className="text-sm text-muted-foreground col-span-full">
                  No items match this filter.
                </p>
              )}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
