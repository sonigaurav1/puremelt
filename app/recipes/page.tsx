import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Users, ChefHat } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/layout/Header";

export default function RecipesPage() {
  const recipes = [
    {
      id: 1,
      title: "PureMelt Power Smoothie",
      description: "Start your day with this protein-packed smoothie",
      time: "5 mins",
      serves: "1",
      difficulty: "Easy",
      image: "/placeholder.svg?height=300&width=400&text=Power+Smoothie",
      ingredients: [
        "2 tbsp PureMelt",
        "1 banana",
        "1 cup almond milk",
        "1 tbsp honey",
        "Ice cubes",
      ],
      instructions: [
        "Add all ingredients to a blender",
        "Blend until smooth and creamy",
        "Pour into a glass and enjoy immediately",
      ],
    },
    {
      id: 2,
      title: "PureMelt Energy Balls",
      description: "Perfect pre-workout snack packed with nutrients",
      time: "15 mins",
      serves: "12",
      difficulty: "Easy",
      image: "/placeholder.svg?height=300&width=400&text=Energy+Balls",
      ingredients: [
        "1/2 cup PureMelt",
        "1 cup oats",
        "1/4 cup honey",
        "1/4 cup dark chocolate chips",
        "2 tbsp chia seeds",
      ],
      instructions: [
        "Mix all ingredients in a bowl",
        "Roll into small balls",
        "Refrigerate for 30 minutes before serving",
      ],
    },
    {
      id: 3,
      title: "PureMelt Toast Deluxe",
      description: "Elevate your breakfast toast game",
      time: "10 mins",
      serves: "2",
      difficulty: "Easy",
      image: "/placeholder.svg?height=300&width=400&text=Toast+Deluxe",
      ingredients: [
        "2 slices whole grain bread",
        "3 tbsp PureMelt",
        "1 banana sliced",
        "Berries",
        "Honey drizzle",
      ],
      instructions: [
        "Toast bread to golden brown",
        "Spread PureMelt generously",
        "Top with banana slices and berries",
        "Drizzle with honey and serve",
      ],
    },
    {
      id: 4,
      title: "PureMelt Protein Pancakes",
      description: "Fluffy pancakes with a protein boost",
      time: "20 mins",
      serves: "4",
      difficulty: "Medium",
      image: "/placeholder.svg?height=300&width=400&text=Protein+Pancakes",
      ingredients: [
        "1 cup flour",
        "2 eggs",
        "1 cup milk",
        "3 tbsp PureMelt",
        "1 tsp baking powder",
        "Pinch of salt",
      ],
      instructions: [
        "Mix dry ingredients in a bowl",
        "Whisk wet ingredients separately",
        "Combine and cook on griddle",
        "Serve with extra PureMelt on top",
      ],
    },
    {
      id: 5,
      title: "PureMelt Chocolate Cookies",
      description: "Indulgent cookies with a healthy twist",
      time: "30 mins",
      serves: "24",
      difficulty: "Medium",
      image: "/placeholder.svg?height=300&width=400&text=Chocolate+Cookies",
      ingredients: [
        "1/2 cup PureMelt",
        "1/4 cup brown sugar",
        "1 egg",
        "1 cup flour",
        "1/2 tsp baking soda",
        "Chocolate chips",
      ],
      instructions: [
        "Preheat oven to 350°F",
        "Mix PureMelt, sugar, and egg",
        "Add dry ingredients and chocolate chips",
        "Bake for 12-15 minutes",
      ],
    },
    {
      id: 6,
      title: "PureMelt Overnight Oats",
      description: "Prepare tonight, enjoy tomorrow morning",
      time: "5 mins prep",
      serves: "1",
      difficulty: "Easy",
      image: "/placeholder.svg?height=300&width=400&text=Overnight+Oats",
      ingredients: [
        "1/2 cup oats",
        "2 tbsp PureMelt",
        "1/2 cup milk",
        "1 tbsp chia seeds",
        "Fruits for topping",
      ],
      instructions: [
        "Mix oats, PureMelt, and milk",
        "Add chia seeds and stir",
        "Refrigerate overnight",
        "Top with fruits before serving",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl font-bold text-secondary-color mb-6">
            PureMelt Recipes
          </h1>
          <p className="text-xl text-amber-700 max-w-3xl mx-auto leading-relaxed">
            Discover delicious ways to enjoy PureMelt. From quick breakfast
            ideas to indulgent treats, these recipes will transform your daily
            nutrition into something extraordinary.
          </p>
        </div>
      </section>

      {/* Recipe Categories */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-200 px-4 py-2 cursor-pointer">
              All Recipes
            </Badge>
            <Badge className="bg-amber-50 text-amber-700 hover:bg-amber-100 px-4 py-2 cursor-pointer">
              Breakfast
            </Badge>
            <Badge className="bg-amber-50 text-amber-700 hover:bg-amber-100 px-4 py-2 cursor-pointer">
              Snacks
            </Badge>
            <Badge className="bg-amber-50 text-amber-700 hover:bg-amber-100 px-4 py-2 cursor-pointer">
              Desserts
            </Badge>
            <Badge className="bg-amber-50 text-amber-700 hover:bg-amber-100 px-4 py-2 cursor-pointer">
              Smoothies
            </Badge>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {recipes.map((recipe) => (
              <Card
                key={recipe.id}
                className="border-amber-200 hover:shadow-lg transition-shadow overflow-hidden"
              >
                <div className="relative">
                  <Image
                    src={recipe.image || "/placeholder.svg"}
                    alt={recipe.title}
                    width={400}
                    height={300}
                    className="w-full h-48 object-cover"
                  />
                  <Badge className="absolute top-4 right-4 bg-amber-600 text-white">
                    {recipe.difficulty}
                  </Badge>
                </div>

                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-secondary-color mb-2">
                    {recipe.title}
                  </h3>
                  <p className="text-amber-700 mb-4">{recipe.description}</p>

                  <div className="flex items-center space-x-4 mb-4 text-sm text-amber-600">
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>{recipe.time}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Users className="w-4 h-4" />
                      <span>Serves {recipe.serves}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <ChefHat className="w-4 h-4" />
                      <span>{recipe.difficulty}</span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-secondary-color mb-2">
                        Ingredients:
                      </h4>
                      <ul className="text-sm text-amber-700 space-y-1">
                        {recipe.ingredients.map((ingredient, index) => (
                          <li key={index}>• {ingredient}</li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-semibold text-secondary-color mb-2">
                        Instructions:
                      </h4>
                      <ol className="text-sm text-amber-700 space-y-1">
                        {recipe.instructions.map((instruction, index) => (
                          <li key={index}>
                            {index + 1}. {instruction}
                          </li>
                        ))}
                      </ol>
                    </div>
                  </div>

                  <Button className="w-full mt-4 bg-amber-600 hover:bg-amber-700 text-white">
                    Try This Recipe
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Recipe Tips */}
      <section className="py-20 bg-gradient-to-b from-amber-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-secondary-color mb-4">
              Pro Tips for Cooking with PureMelt
            </h2>
            <p className="text-xl text-amber-700">
              Get the most out of your PureMelt experience
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Room Temperature is Best",
                description:
                  "Let PureMelt come to room temperature for easier spreading and mixing",
                icon: "🌡️",
              },
              {
                title: "Mix Well Before Use",
                description:
                  "Natural separation is normal. Give it a good stir for perfect consistency",
                icon: "🥄",
              },
              {
                title: "Store Properly",
                description:
                  "Keep in a cool, dry place. Refrigeration extends shelf life",
                icon: "🏠",
              },
              {
                title: "Measure by Weight",
                description:
                  "For baking, weighing PureMelt gives more consistent results",
                icon: "⚖️",
              },
              {
                title: "Warm for Drizzling",
                description:
                  "Gently warm PureMelt for easy drizzling over desserts",
                icon: "🍯",
              },
              {
                title: "Pair with Fruits",
                description:
                  "PureMelt complements apples, bananas, and berries perfectly",
                icon: "🍎",
              },
            ].map((tip, index) => (
              <Card
                key={index}
                className="border-amber-200 hover:shadow-lg transition-shadow"
              >
                <CardContent className="p-6 text-center">
                  <div className="text-4xl mb-4">{tip.icon}</div>
                  <h3 className="font-bold text-secondary-color mb-2">
                    {tip.title}
                  </h3>
                  <p className="text-amber-700">{tip.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-amber-800 via-amber-700 to-orange-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Start Cooking?</h2>
          <p className="text-xl mb-8 opacity-90">
            Get your PureMelt today and start creating delicious, healthy meals
          </p>
          <Link href="/buy-now">
            <Button
              size="lg"
              className="bg-white text-amber-700 hover:bg-amber-50 px-8 py-3"
            >
              Order PureMelt Now
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
