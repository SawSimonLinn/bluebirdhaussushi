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

const menu = {
  appetizers: [
    {
      name: "Vegan Edamame",
      description: "Steamed edamame pods sprinkled with sea salt.",
      price: "6.50",
      src: "https://media.post.rvohealth.io/wp-content/uploads/2024/05/close-up-edamame-1296x728-header.jpg",
      data_ai_hint: "edamame appetizer",
    },
    {
      name: "(V) Fried Veggie Gyoza",
      description: "Crispy vegetable dumplings served with soy sauce. (6 pcs)",
      price: "8.00",
      src: "https://www.bluebirdhaussushi.com/wp-content/uploads/2023/01/Gyoza.jpg",
      data_ai_hint: "vegetable gyoza",
    },
    {
      name: "(V) Fried Veggie Spring Rolls ",
      description: "Crispy spring rolls filled with mixed vegetables. (5 pcs)",
      price: "8.00",
      src: "https://www.bluebirdhaussushi.com/wp-content/uploads/2023/01/vegetable-egg-rolls-recipe-featured-1165-500x396-1.jpg",
      data_ai_hint: "vegetable spring rolls",
    },
    {
      name: "(V) Vegetable Tempura",
      description: "Crispy battered vegetables served with dipping sauce.",
      price: "10.00",
      src: "https://www.bluebirdhaussushi.com/wp-content/uploads/2023/01/IMG_1845-1920x1440.jpeg",
      data_ai_hint: "vegetable tempura",
    },
    {
      name: "Dragon Ball (2 Pcs)",
      description: "Sushi rice ball with salmon",
      price: "10.00",
      src: "https://www.bluebirdhaussushi.com/wp-content/uploads/2024/01/Dragon-Ball-1920x2560.jpeg",
      data_ai_hint: "dragon ball",
    },
    {
      name: "(V) Drumstick (4 pcs)",
      description: "Crispy vegan drumsticks with a savory glaze.",
      price: "10.00",
      data_ai_hint: "crispy vegan drumsticks",
    },
    {
      name: "Crispy Rice Spicy Tuna",
      description: "Crispy rice topped with spicy tuna and avocado.",
      price: "10.00",
      data_ai_hint: "crispy rice spicy tuna",
    },
    {
      name: "Spicy Garlic Edamame",
      description: "Steamed edamame pods tossed in a spicy garlic sauce.",
      price: "7.00",
      data_ai_hint: "spicy garlic edamame",
    },
    {
      name: "Fried Pork Gyoza",
      description: "Crispy fried dumplings filled with seasoned pork. (6 pcs)",
      price: "8.00",
      data_ai_hint: "fried pork gyoza",
    },
    {
      name: "Fried Tofu (8 pcs)",
      description:
        "Crispy fried tofu served with a sweet and spicy dipping sauce.",
      price: "6.00",
      data_ai_hint: "fried tofu",
    },
    {
      name: "Shrimp Tempura (5 pcs)",
      description: "Crispy battered shrimp served with dipping sauce.",
      price: "10.00",
      data_ai_hint: "shrimp tempura",
    },
    {
      name: "(V) Crispy Rice Mashed Avocado",
      description: "Crispy rice topped with mashed avocado and spicy mayo.",
      price: "10.00",
      data_ai_hint: "crispy rice avocado",
    },
    {
      name: "(V) Dynamite Cauliflower",
      description: "Crispy cauliflower bites tossed in a spicy mayo sauce.",
      price: "10.00",
      data_ai_hint: "dynamite cauliflower",
    },
    {
      name: "Mixed Tempura (Shrimp & Vegetable)",
      description: "An assortment of crispy battered shrimp and vegetables.",
      price: "12.00",
      data_ai_hint: "mixed tempura",
    },
  ],
  salads: [
    {
      name: "(V) Cucumber Salad",
      description: "Refreshing cucumber salad with sesame dressing.",
      src: "https://placehold.co/400x400.png",
      price: "6.00",
      data_ai_hint: "cucumber salad",
    },
    {
      name: "(V) Seaweed Salad",
      description: "Chilled seaweed salad with rice vinegar.",
      price: "6.00",
      src: "https://www.bluebirdhaussushi.com/wp-content/uploads/2022/06/Seaweed-Salad-1.jpg",
      data_ai_hint: "seaweed salad",
    },
    {
      name: "(V) House Salad",
      description: "Chilled house salad with rice vinegar.",
      price: "8.00",
      src: "https://www.bluebirdhaussushi.com/wp-content/uploads/2023/09/House-Salad-1-1920x2560.jpeg",
      data_ai_hint: "house salad",
    },
    {
      name: "BlueBird Poke Salad",
      description:
        "Diced Salmon, Tuna, Yellowtail, Avocado, Cucumber, Seaweed Salad, Spring Mix,Poke Sauce",
      src: "https://placehold.co/400x400.png",
      price: "18.00",

      data_ai_hint: "poke salad",
    },
  ],
  traditionalRolls: [
    {
      name: "Avocado Roll (6 Pcs)",
      description:
        "Outside: Seaweed, Sushi Rice, Sesame Seeds | Inside: Avocado",
      price: "7.00",
      data_ai_hint: "avocado roll",
    },
    {
      name: "Avocado & Cucumber Roll (6 Pcs)",
      description:
        "Outside: Seaweed, Sushi Rice, Sesame Seeds | Inside: Avocado and Cucumber",
      price: "7.00",
      data_ai_hint: "cucumber roll",
    },
    {
      name: "Vegetable Roll (6 Pcs)",
      description:
        "Outside: Seaweed, Sushi Rice, Sesame Seeds | Inside: Avocado, Cucumber, Spring Mix",
      price: "7.00",
      data_ai_hint: "vegetable roll",
    },
    {
      name: "Cucumber Roll",
      description:
        "Outside: Seaweed, Sushi Rice, Sesame Seeds | Inside: Cucumber",
      price: "7.00",
      data_ai_hint: "cucumber roll",
    },
    {
      name: "Fried California Roll (8 pcs)",
      description:
        "Outside: Seaweed, Sushi Rice, Sesame Seeds | Inside: Fried Tofu, Avocado, Cucumber",
      price: "12.00",
      data_ai_hint: "fried california roll",
    },
    {
      name: "Fried Philadelphia Roll (8 pcs)",
      description:
        "Outside: Sushi Rice, Seaweed, Sesame Seeds | Inside: Salmon, Avocado, Cream Cheese",
      price: "13.50",
      data_ai_hint: "fried philadelphia roll",
    },
    {
      name: "Fried Spicy Tuna Roll (8 Pcs)",
      description:
        "Outside: Sushi Rice, Seaweed, Sesame Seeds | Inside: Spicy Tuna, Cucumber, Avocado",
      price: "13.50",
      data_ai_hint: "fried spicy tuna roll",
    },
    {
      name: "Fried Godzilla Roll (6 Pcs)",
      description:
        "Outside: Seaweed, Sushi Rice, Sesame Seeds | Inside: Shrimp Tempura, Krab, Cream Cheese",
      price: "10.00",
      data_ai_hint: "fried godzilla roll",
    },
    {
      name: "Fried Three Kings Roll (6 Pcs)",
      description:
        "Outside: Seaweed, Sushi Rice, Sesame Seeds | Inside: Salmon, Tuna, Yellowtail, Cream Cheese, Avocado",
      src: "https://www.bluebirdhaussushi.com/wp-content/uploads/2024/12/IMG_0050-1920x1440.jpeg",
      price: "14.00",
      data_ai_hint: "fried three kings roll",
    },
  ],
  Nigiri: [
    {
      name: "Salmon Nigiri",
      description: "Fresh salmon on sushi rice.",
      price: "7.00",
      data_ai_hint: "salmon nigiri",
    },
    {
      name: "Salmon-Avocado Nigiri",
      description: "Fresh salmon and avocado on sushi rice.",
      price: "7.50",
      data_ai_hint: "salmon avocado nigiri",
    },
    {
      name: "Tuna Nigiri",
      description: "Fresh tuna on sushi rice.",
      price: "7.00",
      data_ai_hint: "tuna nigiri",
    },

    {
      name: "Tuna-Avocado Nigiri",
      description: "Fresh tuna and avocado on sushi rice.",
      price: "7.50",
      data_ai_hint: "tuna avocado nigiri",
    },
    {
      name: "Seared Salmon Nigiri",
      description: "Fresh seared salmon on sushi rice.",
      src: "https://www.bluebirdhaussushi.com/wp-content/uploads/2022/06/Seard-Salmon-Nigiri-scaled.jpg",
      price: "7.00",
      data_ai_hint: "seared salmon nigiri",
    },
    {
      name: "Salmon Belly Nigiri",
      description: "Fresh salmon belly on sushi rice.",
      src: "https://www.bluebirdhaussushi.com/wp-content/uploads/2023/09/Salmon-Belly-Nigiri-1920x2560.jpg",
      price: "8.00",
      data_ai_hint: "salmon belly nigiri",
    },
    {
      name: "Eel Nigiri",
      description: "Grilled eel on sushi rice with eel sauce.",
      src: "https://placehold.co/400x400.png",
      price: "7.50",
      data_ai_hint: "eel nigiri",
    },
    {
      name: "Eel-Avocado Nigiri",
      description: "Grilled eel and avocado on sushi rice.",
      src: "https://placehold.co/400x400.png",
      price: "7.50",
      data_ai_hint: "eel avocado nigiri",
    },
    {
      name: "Ebi Shrimp Nigiri",
      description: "Fresh shrimp on sushi rice.",
      price: "7.00",
      data_ai_hint: "ebi nigiri",
    },
    {
      name: "Yellowtail Nigiri",
      description: "Fresh yellowtail on sushi rice.",
      price: "7.00",
      data_ai_hint: "yellowtail nigiri",
    },
    {
      name: "Yellowtail Belly Nigiri",
      description: "Fresh yellowtail belly on sushi rice.",
      price: "8.00",
      data_ai_hint: "yellowtail belly nigiri",
    },
  ],
  delightfulRolls: [
    {
      name: "California Roll (8 Pcs)",
      description:
        " Outside: Sushi Rice, Seaweed, Sesame Seeds | Inside: Krab Salad, Cucumber, Avocado  ",
      price: "11.50",
      src: "https://www.bluebirdhaussushi.com/wp-content/uploads/2023/10/California-Roll-1920x1156.jpg",
      data_ai_hint: "california roll",
    },
    {
      name: "Tiger Roll (8 pcs)",
      description:
        "Outside: Sushi Rice, Seaweed | Topped: Ebi shrimp, Spicy Sauce, Eel Sauce  | Inside: Shrimp Tempura, Krab, Avocado ",
      price: "16.00",
      src: "https://www.bluebirdhaussushi.com/wp-content/uploads/2022/06/tiger-roll-1920x2560.jpeg",
      data_ai_hint: "tiger roll",
    },
    {
      name: "Spicy Baked California Roll (8 Pcs)",
      description:
        "Outside: Sushi Rice, Seaweed, Sesame Seeds | Topped: Krab, Spicy Mayo, Spicy Sauce. | Inside: Krab Salad, Cucumber, Avocado   ",
      price: "13.00",
      src: "https://placehold.co/400x400.png",
      data_ai_hint: "vegan tuna",
    },
    {
      name: "O.M.G Roll (8 Pcs)",
      description:
        "Inside: Yellowtail Tempura, Avocado, Jalapeño | Topped: Curry Sauce, Chili Oil, Eel Sauce, Crunchy Flake, Fried Onion, Green Onion, Sesame Seeds",
      price: "17.00  ",
      src: "https://www.bluebirdhaussushi.com/wp-content/uploads/2025/03/IMG_0286.jpeg",
      data_ai_hint: "veggie roll",
    },
    {
      name: "Bluebird Roll (8 Pcs)",
      description:
        "Outside: Sushi Rice, Seaweed, Sesame Seeds  | Inside: Shrimp Tempura, Krab, Avocado, Cucumber | Sauce: Eel Sauce, Spicy Mayo",
      price: "14.00  ",
      data_ai_hint: "veggie roll",
    },
    {
      name: "Popcorn Shrimp (8 pcs)",
      description:
        "Outside: Sushi Rice, Seaweed, Sesame Seeds | Inside: Krab, Cucumber, Avocado | Topped: Chopped Shrimp Tempura, Spicy Mayo, Eel Sauce.",
      price: "16.00  ",
      data_ai_hint: "popcorn shrimp",
    },
    {
      name: "Black Dragon Roll (8 Pcs)",
      description:
        "Outside: Sushi Rice, Seaweed | Topped: Eel, Avocado | Inside: Shrimp tempura, Krab, Cucumber",
      price: "17.00  ",
      data_ai_hint: "black dragon roll",
    },
    {
      name: "Caterpillar Roll (8 Pcs)",
      description:
        "Outside: Sushi Rice, Seaweed topped with avocado, Eel Sauce, Spicy Mayo | Inside: Eel, Cucumber",
      price: "16.00",
      data_ai_hint: "caterpillar roll",
    },
    {
      name: "Crunchy Roll (8 Pcs)",
      description:
        "Inside: Yellowtail Tempura, Avocado, Jalapeño | Topped: Curry Sauce, Chili Oil, Eel Sauce, Crunchy Flake, Fried Onion, Green Onion, Sesame",
      price: "14.00",
      data_ai_hint: "crunchy roll",
    },
  ],
  delightfulRollsRaw: [
    {
      name: "Atlantic Roll (Baked Salmon on California Roll) (8 pcs)",
      description:
        "Outside: Sushi Rice, Seaweed, Sesame Seeds | Topped: Salmon, Spicy Mayo, Eel Sauce | Inside: Krab, Cucumber, Avocado",
      price: "16.00",
      src: "https://www.bluebirdhaussushi.com/wp-content/uploads/2022/06/Seard-salmon-scaled.jpeg",
      data_ai_hint: "spicy tuna roll",
    },
    {
      name: "Tangy Salmon Roll (8 pcs)",
      description:
        "Outside: Sushi Rice, Seaweed, Sesame Seeds | Topped: Salmon, Thinly Sliced Lemon, Wasabi Vinaigrette  | Inside: Krab, Cucumber, Avocado ",
      price: "16.00",
      src: "https://www.bluebirdhaussushi.com/wp-content/uploads/2022/06/tangy-salmon-web-1920x1114-1.jpg",
      data_ai_hint: "tangy salmon roll",
    },

    {
      name: "Red&White Dragon Roll (8 pcs)",
      description:
        "Outside: Sushi Rice, Seaweed, Sesame Seeds | Topped: Tuna, Krab, Poke Sauce  | Inside: Shrimp Tempura, Krab, Avocado",
      price: "17.00",
      src: "https://www.bluebirdhaussushi.com/wp-content/uploads/2023/10/20231021_183621-1920x1440.jpg",
      data_ai_hint: "red and white dragon roll",
    },

    {
      name: "Tuna Lovers Roll (8 pcs)",
      description:
        "Outside: Sushi Rice, Seaweed, Sesame Seeds | Topped: Spicy Tuna, Seared Tuna, Spicy Mayo, Eel Sauce, Jalapeño, Fried Onion  | Inside: Shrimp Tempura, Krab, Avocado",
      price: "17.00",
      src: "https://www.bluebirdhaussushi.com/wp-content/uploads/2022/06/tuna-lovers-web-1920x1249-1.jpg",
      data_ai_hint: "tuna lovers roll",
    },
    {
      name: "Marilyn Monroll Roll (8 Pcs)",
      description:
        "Outside: Sushi Rice, Seaweed, Sesame Seeds | Topped: Tuna, Masago | Inside: Spicy Krab, Avocado",
      price: "17.00",
      src: "https://www.bluebirdhaussushi.com/wp-content/uploads/2024/05/IMG_0029-1920x1440.jpeg",
      data_ai_hint: "marilyn monroll roll",
    },
    {
      name: "Broadway Roll (8 Pcs)",
      description:
        "Outside: Sushi Rice, Seaweed, Sesame Seeds | Topped: Yellowtail, Masago, Fried Onion | Inside: Krab, Spicy Tuna, Asparagus Tempura",
      price: "14.00",
      src: "https://www.bluebirdhaussushi.com/wp-content/uploads/2024/12/IMG_0037-1920x1440.jpeg",
      data_ai_hint: "broadway roll",
    },
    {
      name: "Sumo Roll (8 Pcs)",
      description:
        "Outside: Sushi Rice, Seaweed, Sesame Seeds | Topped: Tuna, Yellowtail, Masago | Inside: Shrimp Tempura, Spicy Tuna, Avocado",
      price: "17.00",
      src: "https://www.bluebirdhaussushi.com/wp-content/uploads/2024/12/IMG_0031-1920x1440.jpeg",
      data_ai_hint: "sumo roll",
    },
    {
      name: "Snow White (8 Pcs)",
      description:
        "Outside: Sushi Rice, Soy Paper, Sesame Seeds | Topped: Seared Yellowtail, Mint Leave, Eel Sauce, Ponzu, Yuzu | Inside: Spicy Krab, Green Bean Tempura",
      price: "17.00",
      src: "https://www.bluebirdhaussushi.com/wp-content/uploads/2024/12/IMG_2226-1920x2560.jpeg",
      data_ai_hint: "snow white roll",
    },
    {
      name: "Rainbow Roll (8 pcs)",
      description:
        "Outside: Sushi Rice, Seaweed, Sesame Seeds Topped: Salmon, Tuna, Ebi, Avocado, |  Inside: Krab, Cucumber, Avocado ",
      price: "14.00",
      data_ai_hint: "rainbow roll",
    },
    {
      name: "Dynamite Roll (8 pcs)",
      description:
        "Outside: Sushi Rice, Seaweed, Sesame Seeds | Topped: Spicy Tuna, Spicy Mayo, Eel Sauce, Fried Onion | Inside: Shrimp Tempura, Krab, Avocado",
      price: "16.00",
      data_ai_hint: "dynamite roll",
    },
    {
      name: "Crunchy Spicy Tuna Roll (8 Pcs)",
      description:
        "Outside: Sushi Rice, Seaweed, Sesame Seeds, Crunchy Flake | Inside: Spicy Tuna, Cucumber",
      price: "15.00",
      data_ai_hint: "crunchy spicy tuna roll",
    },
  ],
  delightfulRollsVegan: [
    {
      name: "Inari V-Avocado (3 pcs)",
      description:
        "Outside: Inari-Soybean Curds | Inside: Sushi Rice and Avocado, Sesame seeds",
      src: "https://www.bluebirdhaussushi.com/wp-content/uploads/2022/06/Irnari-Avo-Web.jpg",
      price: "9.00",
      data_ai_hint: "vegan california roll",
    },
    {
      name: "(V)Caterpillar Roll (8 pcs)",
      description:
        "Outside: Sushi Rice, Seaweed, Sesame Seeds | Topped: Avocado | Inside: Cucumber, Avocado, Carrot",
      src: "https://www.bluebirdhaussushi.com/wp-content/uploads/2023/10/V-Caterpillarv2.jpg",
      price: "15.00",
      data_ai_hint: "vegan caterpillar roll",
    },
    {
      name: "(V)Popcorn Roll (8 pcs)",
      description:
        "Outside: Sushi Rice, Seaweed, Sesame Seeds | Topped: Cauliflower Tempura | Inside: Cucumber, Avocado, Carrot",
      src: "https://www.bluebirdhaussushi.com/wp-content/uploads/2023/10/v-popcorn.jpg",
      price: "15.00",
      data_ai_hint: "vegan popcorn roll",
    },
    {
      name: "(V)Tempura Roll (8 pcs) ",
      description:
        "Outside: Sushi Rice, Seaweed, Sesame Seeds | Topped: Vegetable Tempura | Inside: Vegetable Tempura",
      src: "https://www.bluebirdhaussushi.com/wp-content/uploads/2024/12/IMG_2093-1920x1949.jpeg",
      price: "15.00",
      data_ai_hint: "vegan tempura roll",
    },
    {
      name: "(V)Red Dragon Roll (8 pcs)",
      description:
        "Outside: Sushi Rice, Seaweed, Sesame Seeds | Topped: V-Tuna | Inside: Cucumber, Avocado, Fried-tofu",
      src: "https://www.bluebirdhaussushi.com/wp-content/uploads/2023/10/V-Red-Dragon-Roll-1920x1404.jpg",
      price: "16.00",
      data_ai_hint: "vegan red dragon roll",
    },
    {
      name: "(V)Tofu Crunchy Roll",
      description:
        "Outside: Sushi Rice, Seaweed, Sesame Seeds | Topped: Fried Tofu, Fried Onion | Inside: Cucumber, Avocado, Fried Tofu",
      src: "https://www.bluebirdhaussushi.com/wp-content/uploads/2022/06/Tufo-Crunchy-Web.jpg",
      price: "16.00",
      data_ai_hint: "vegan tofu crunchy roll",
    },
    {
      name: "(V)Tofu Delightful Roll ",
      description:
        "Outside: Sushi Rice, Seaweed, Sesame Seeds | Topped: Seared Tofu | Inside: Cucumber, Avocado, Carrot",
      src: "https://www.bluebirdhaussushi.com/wp-content/uploads/2022/06/Seared-roll-1.jpg",
      price: "15.00",
      data_ai_hint: "vegan tofu delightful roll",
    },
    {
      name: "(V)Alaskan Dragon Roll (8 Pcs)",
      description:
        "Outside: Sushi Rice, Seaweed Sesame Seeds | Topped V-Salmon | Inside: Cucumber, Avocado, Fried Tofu",
      src: "https://www.bluebirdhaussushi.com/wp-content/uploads/2023/10/Alaskan-Dragon-V-web-1920x1516.jpg",
      price: "16.00",
      data_ai_hint: "vegan alaskan dragon roll",
    },
    {
      name: "(V)Emerald Roll (8 Pcs)",
      description:
        "Outside: Sushi Rice, Seaweed, Sesame Seeds | Topped: Cucumber, Chopped Avocado | Inside: Cucumber, Avocado, Carrot",
      src: "https://www.bluebirdhaussushi.com/wp-content/uploads/2024/12/IMG_2088-1-1920x2560.jpeg",
      price: "16.00",
      data_ai_hint: "vegan emerald roll",
    },
    {
      name: "(V)Curry Shrimp Roll",
      description:
        "Inside: Vegetable Tempura, Avocado, Jalapeño | Topped: Curry Sauce, Chili Oil, Eel Sauce, Fried (V)Shrimp, Crunchy Flake, Fried Onion, Green Onion, Sesamee",
      src: "https://www.bluebirdhaussushi.com/wp-content/uploads/2025/03/IMG_2465-1920x2560.jpeg",
      price: "17.00",
      data_ai_hint: "vegan curry shrimp roll",
    },
    {
      name: "Inari V-Seaweed (3 pcs)",
      description:
        "Outside: Inari-Soybean Curds | Inside: Sushi Rice and Seaweed Salad, Sesame seeds",
      price: "9.00",
      data_ai_hint: "vegan seaweed roll",
    },
    {
      name: "Inari Nigiri Special (4 pcs)",
      description:
        "Sushi Rice topped with Inari, Avocado, Seaweed, Fried Onion, Jalapeño",
      price: "10.00",
      data_ai_hint: "vegan inari nigiri roll",
    },
    {
      name: "(V)Spicy Salmon Roll (8 Pcs)",
      description:
        "Outside: Sushi Rice, Seaweed, Sesame Seeds | Inside: Vegan Salmon, Avocado, Cucumber | Sauce: Spicy Mayo",
      price: "13.00",
      data_ai_hint: "vegan spicy salmon roll",
    },
    {
      name: "(V)Spicy Tuna Roll (8 Pcs)",
      description:
        "Outside: Sushi Rice, Seaweed, Sesame Seeds | Inside: Vegan Tuna, Avocado, Cucumber | Sauce: Spicy Mayo",
      price: "13.00",
      data_ai_hint: "vegan spicy tuna roll",
    },
    {
      name: "(V)Salmon or (V)Tuna Avocado Roll (8 Pcs)",
      description:
        "Outside: Sushi Rice, Seaweed, Sesame Seeds | Inside: Vegan Salmon or Tuna, Avocado, Cucumber | Sauce: Spicy Mayo",
      price: "12.00",
      data_ai_hint: "vegan salmon or tuna avocado roll",
    },
  ],
  ramen: [
    {
      name: "(V) So La’ Men Gyoza",
      description:
        "Creamy Yellow Curry Broth, Ramen, Veggie Gyoza (6), Pickled Cabbage, Spinach, Green Onion, Crispy Noodle.",
      price: "18.00",
      src: "https://placehold.co/400x400.png",
      data_ai_hint: "so la men gyoza",
    },
    {
      name: "(V) So La’ Men Tofu",
      description:
        "Creamy Yellow Curry Broth, Ramen, Fried Tofu, Pickled Cabbage, Red Onion, Green Onion, Spinach, Crispy Noodle.",
      price: "17.00",
      src: "https://placehold.co/400x400.png",
      data_ai_hint: "so la men tofu",
    },
    {
      name: "So La’ Men Fried Shrimp",
      description:
        "Creamy Yellow Curry Broth, Ramen, Fried Shrimp (Butterfly with Shell), Pickled Cabbage, Red Onion, Green Onion, Spinach, Crispy Noodle.",
      price: "20.00",
      src: "https://www.bluebirdhaussushi.com/wp-content/uploads/2024/12/IMG_1366-2-1920x2387.jpeg",
      data_ai_hint: "so la men fried shrimp",
    },
  ],
  sushiRiceBowl: [
    {
      name: "Spicy Tuna Rice Bowl",
      description:
        "Sushi Rice, Spicy Tuna, Avocado, Cucumber, Seaweed Salad and Spicy Mayo.",
      price: "16.00",
      data_ai_hint: "spicy tuna rice bowl",
    },
    {
      name: "BlueBird Poke Bowl",
      description:
        "Sushi Rice, Diced Salmon, Tuna, Yellowtail, Avocado, Cucumber, Seaweed Salad, Sesame Seeds, Spicy Poke Sauce",
      price: "18.00",
      data_ai_hint: "bluebird poke bowl",
    },
    {
      name: "Salmon Poke Bowl",
      description:
        "Sushi Rice, Diced Salmon, Cucumber, Avocado,  Seaweed Salad, Sesame seeds,  Poke Sauce",
      price: "18.00",
      data_ai_hint: "salmon poke bowl",
    },
    {
      name: "Tuna Poke Bowl",
      description:
        "Sushi Rice, Diced Tuna, Cucumber, Avocado, Seaweed Salad, Sesame seeds,  Poke Sauce",
      price: "18.00",
      data_ai_hint: "tuna poke bowl",
    },
    {
      name: "BlueBird’s Chirashi Bowl",
      description:
        "Sushi Rice, Salmon, Tuna, Yellowtail, Ebi, Cucumber, Avocado, Seaweed Salad, Sesame seeds",
      price: "16.00",
      src: "https://www.bluebirdhaussushi.com/wp-content/uploads/2024/12/IMG_2050-1920x1440.jpeg",
      data_ai_hint: "bluebird chirashi bowl",
    },
  ],
  sushiRiceBowlVegan: [
    {
      name: "(V) Spicy Tofu Bowl",
      description:
        "Sushi Rice, Spicy Tofu, Avocado, Cucumber, Seaweed Salad, Sesame Seeds",
      price: "16.00",
      data_ai_hint: "spicy tofu bowl",
    },
    {
      name: "(V) Tuna Spicy Poke Bowl",
      description:
        "Sushi Rice, Vegan Tuna, Cucumber, Avocado, Seaweed Salad, Poke Sauce",
      price: "18.00",
      data_ai_hint: "tuna spicy poke bowl",
    },
    {
      name: "(V) Salmon Spicy Poke Bowl",
      description:
        "Sushi Rice, Vegan Salmon, Cucumber, Avocado, Seaweed Salad, Poke Sauce",
      price: "18.00",
      data_ai_hint: "salmon spicy poke bowl",
    },
  ],
};

function MenuItem({
  name,
  description,
  price,
  src,
  data_ai_hint,
}: {
  name: string;
  description: string;
  price: string;
  src?: string;
  data_ai_hint: string;
}) {
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
    </Card>
  );
}

export default function MenuPage() {
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
          <TabsTrigger value="nigiri" className="py-2.5">
            <Fish className="w-4 h-4 mr-2" />
            Nigiri (2 Pcs)
          </TabsTrigger>
          <TabsTrigger value="ramen" className="py-2.5">
            <Soup className="w-4 h-4 mr-2" />
            Ramen
          </TabsTrigger>
          <TabsTrigger value="delightfulRolls" className="py-2.5">
            <IceCream className="w-4 h-4 mr-2" />
            Delightful Rolls (Cooked)
          </TabsTrigger>
          <TabsTrigger value="delightfulRollsRaw" className="py-2.5">
            <IceCream className="w-4 h-4 mr-2" />
            Delightful Rolls (Raw Fish)
          </TabsTrigger>
          <TabsTrigger value="delightfulRollsVegan" className="py-2.5">
            <IceCream className="w-4 h-4 mr-2" />
            Delightful Rolls (Vegan)
          </TabsTrigger>
          <TabsTrigger value="sushiRiceBowl" className="py-2.5">
            <CookingPot className="w-4 h-4 mr-2" />
            Sushi Rice Bowl
          </TabsTrigger>
          <TabsTrigger value="sushiRiceBowlVegan" className="py-2.5">
            <CookingPot className="w-4 h-4 mr-2" />
            Sushi Rice Bowl (Vegan)
          </TabsTrigger>
        </TabsList>
        <TabsContent value="appetizers" className="mt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {menu.appetizers.map((item) => (
              <MenuItem key={item.name} {...item} />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="salads" className="mt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {menu.salads.map((item) => (
              <MenuItem key={item.name} {...item} />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="traditionalRolls" className="mt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {menu.traditionalRolls.map((item) => (
              <MenuItem key={item.name} {...item} />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="nigiri" className="mt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {menu.Nigiri.map((item) => (
              <MenuItem key={item.name} {...item} />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="ramen" className="mt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {menu.ramen.map((item) => (
              <MenuItem key={item.name} {...item} />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="delightfulRolls" className="mt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {menu.delightfulRolls.map((item) => (
              <MenuItem key={item.name} {...item} />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="delightfulRollsRaw" className="mt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {menu.delightfulRollsRaw.map((item) => (
              <MenuItem key={item.name} {...item} />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="delightfulRollsVegan" className="mt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {menu.delightfulRollsVegan.map((item) => (
              <MenuItem key={item.name} {...item} />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="sushiRiceBowl" className="mt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {menu.sushiRiceBowl.map((item) => (
              <MenuItem key={item.name} {...item} />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="sushiRiceBowlVegan" className="mt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {menu.sushiRiceBowlVegan.map((item) => (
              <MenuItem key={item.name} {...item} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
