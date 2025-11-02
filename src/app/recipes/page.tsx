'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, Users, ChefHat } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

import Head from 'next/head';
import Header from '@/components/layout/Header';

export default function RecipesPage() {
  const recipes = [
    {
      id: 1,
      title: `${process.env.NEXT_PUBLIC_BRAND_NAME} Power Smoothie`,
      description: 'Start your day with this protein-packed smoothie',
      time: '5 mins',
      serves: '1',
      difficulty: 'Easy',
      image: '/placeholder.svg?height=300&width=400&text=Power+Smoothie',
      ingredients: [
        `2 tbsp ${process.env.NEXT_PUBLIC_BRAND_NAME} Nuts Butter`,
        '1 banana',
        '1 cup almond milk',
        '1 tbsp honey',
        'Ice cubes'
      ],
      instructions: [
        'Add all ingredients to a blender',
        'Blend until smooth and creamy',
        'Pour into a glass and enjoy immediately'
      ]
    },
    {
      id: 2,
      title: `${process.env.NEXT_PUBLIC_BRAND_NAME} Energy Balls`,
      description: 'Perfect pre-workout snack packed with nutrients',
      time: '15 mins',
      serves: '12',
      difficulty: 'Easy',
      image: '/placeholder.svg?height=300&width=400&text=Energy+Balls',
      ingredients: [
        `1/2 cup ${process.env.NEXT_PUBLIC_BRAND_NAME} Nuts Butter`,
        '1 cup oats',
        '1/4 cup honey',
        '1/4 cup dark chocolate chips',
        '2 tbsp chia seeds'
      ],
      instructions: [
        'Mix all ingredients in a bowl',
        'Roll into small balls',
        'Refrigerate for 30 minutes before serving'
      ]
    },
    {
      id: 3,
      title: `${process.env.NEXT_PUBLIC_BRAND_NAME} Toast Deluxe`,
      description: 'Elevate your breakfast toast game',
      time: '10 mins',
      serves: '2',
      difficulty: 'Easy',
      image: '/placeholder.svg?height=300&width=400&text=Toast+Deluxe',
      ingredients: [
        '2 slices whole grain bread',
        `3 tbsp ${process.env.NEXT_PUBLIC_BRAND_NAME} Nuts Butter`,
        '1 banana sliced',
        'Berries',
        'Honey drizzle'
      ],
      instructions: [
        'Toast bread to golden brown',
        `Spread ${process.env.NEXT_PUBLIC_BRAND_NAME} Nuts Butter generously`,
        'Top with banana slices and berries',
        'Drizzle with honey and serve'
      ]
    },
    {
      id: 4,
      title: `${process.env.NEXT_PUBLIC_BRAND_NAME} Protein Pancakes`,
      description: 'Fluffy pancakes with a protein boost',
      time: '20 mins',
      serves: '4',
      difficulty: 'Medium',
      image: '/placeholder.svg?height=300&width=400&text=Protein+Pancakes',
      ingredients: [
        '1 cup flour',
        '2 eggs',
        '1 cup milk',
        `3 tbsp ${process.env.NEXT_PUBLIC_BRAND_NAME} Nuts Butter`,
        '1 tsp baking powder',
        'Pinch of salt'
      ],
      instructions: [
        'Mix dry ingredients in a bowl',
        'Whisk wet ingredients separately',
        'Combine and cook on griddle',
        `Serve with extra ${process.env.NEXT_PUBLIC_BRAND_NAME} Nuts Butter on top`
      ]
    },
    {
      id: 5,
      title: `${process.env.NEXT_PUBLIC_BRAND_NAME} Chocolate Cookies`,
      description: 'Indulgent cookies with a healthy twist',
      time: '30 mins',
      serves: '24',
      difficulty: 'Medium',
      image: '/placeholder.svg?height=300&width=400&text=Chocolate+Cookies',
      ingredients: [
        `1/2 cup ${process.env.NEXT_PUBLIC_BRAND_NAME} Nuts Butter`,
        '1/4 cup brown sugar',
        '1 egg',
        '1 cup flour',
        '1/2 tsp baking soda',
        'Chocolate chips'
      ],
      instructions: [
        'Preheat oven to 350°F',
        `Mix ${process.env.NEXT_PUBLIC_BRAND_NAME} Nuts Butter, sugar, and egg`,
        'Add dry ingredients and chocolate chips',
        'Bake for 12-15 minutes'
      ]
    },
    {
      id: 6,
      title: `${process.env.NEXT_PUBLIC_BRAND_NAME} Overnight Oats`,
      description: 'Prepare tonight, enjoy tomorrow morning',
      time: '5 mins prep',
      serves: '1',
      difficulty: 'Easy',
      image: '/placeholder.svg?height=300&width=400&text=Overnight+Oats',
      ingredients: [
        '1/2 cup oats',
        `2 tbsp ${process.env.NEXT_PUBLIC_BRAND_NAME} Nuts Butter`,
        '1/2 cup milk',
        '1 tbsp chia seeds',
        'Fruits for topping'
      ],
      instructions: [
        `Mix oats, ${process.env.NEXT_PUBLIC_BRAND_NAME} Nuts Butter, and milk`,
        'Add chia seeds and stir',
        'Refrigerate overnight',
        'Top with fruits before serving'
      ]
    }
  ];

  const [selectedCategory, setSelectedCategory] = React.useState('All Recipes');

  // Map recipe titles to categories
  const categoryMap: Record<string, string[]> = {
    Breakfast: ['Toast Deluxe', 'Protein Pancakes', 'Overnight Oats'],
    Snacks: ['Energy Balls'],
    Desserts: ['Chocolate Cookies'],
    Smoothies: ['Power Smoothie']
  };

  // Get all categories
  const categories = [
    'All Recipes',
    'Breakfast',
    'Snacks',
    'Desserts',
    'Smoothies'
  ];

  // Filter recipes by selected category
  const filteredRecipes =
    selectedCategory === 'All Recipes'
      ? recipes
      : recipes.filter((recipe) => {
          const title = recipe.title
            .replace(process.env.NEXT_PUBLIC_BRAND_NAME + ' ', '')
            .replace('Nuts Butter ', '');
          return categoryMap[selectedCategory]?.some((catTitle: string) =>
            title.includes(catTitle)
          );
        });

  return (
    <>
      <Head>
        <title>Healthy Peanut Butter Recipes | Penowa</title>
        <meta
          name='description'
          content='Discover delicious and healthy peanut butter recipes with Penowa. From smoothies to cookies, enjoy premium nuts butter in every meal.'
        />
        <meta
          name='keywords'
          content='peanut butter recipes, healthy peanut butter, penowa recipes, nuts butter recipes, protein recipes, breakfast, snacks, desserts'
        />
        <link
          rel='canonical'
          href={
            (process.env.NEXT_PUBLIC_SITE_URL || 'https://penowa.in') +
            '/recipes'
          }
        />
        {/* Recipes Page Structured Data */}
        <script
          type='application/ld+json'
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'CollectionPage',
              name: 'Healthy Peanut Butter Recipes | Penowa',
              description:
                'Discover delicious and healthy peanut butter recipes with Penowa. From smoothies to cookies, enjoy premium nuts butter in every meal.',
              url:
                (process.env.NEXT_PUBLIC_SITE_URL || 'https://penowa.in') +
                '/recipes',
              publisher: {
                '@type': 'Organization',
                name: process.env.NEXT_PUBLIC_BRAND_NAME || 'Penowa'
              }
            })
          }}
        />
      </Head>

      <div className='min-h-screen !bg-black !text-white'>
        {/* Header */}
        <Header />

        {/* Hero Section */}
        <section className='px-4 pt-28 md:px-8 md:pb-16'>
          <div className='container mx-auto text-center'>
            <h1 className='mb-6 font-playfair text-5xl font-bold text-white'>
              {process.env.NEXT_PUBLIC_BRAND_NAME}{' '}
              <span className='text-primary-color'>Recipes</span>
            </h1>
            <p className='mx-auto max-w-3xl text-xl leading-relaxed text-white'>
              Discover delicious ways to enjoy{' '}
              <span className='font-semibold text-primary-color'>
                {process.env.NEXT_PUBLIC_BRAND_NAME}
              </span>
              . From quick breakfast ideas to indulgent treats, these recipes
              will transform your daily nutrition into something extraordinary.
            </p>
          </div>
        </section>

        {/* Recipe Categories */}
        <section className='bg-black py-10'>
          <div className='container mx-auto px-4'>
            <div className='mb-10 flex flex-wrap justify-center gap-4'>
              {categories.map((category) => (
                <Badge
                  key={category}
                  className={`cursor-pointer border-[.5px] px-4 py-2 text-lg ${
                    selectedCategory === category
                      ? 'hover:bg-primary-color/80 border-primary-color bg-primary-color text-black'
                      : 'hover:bg-primary-color/20 border-primary-color bg-[#181818] text-primary-color'
                  }`}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </Badge>
              ))}
            </div>

            <div className='grid gap-8 md:grid-cols-2 lg:grid-cols-3'>
              {filteredRecipes.map((recipe) => (
                <Card
                  key={recipe.id}
                  className='overflow-hidden border-[.5px] border-[#f8d87d] bg-[#181818] transition-shadow hover:shadow-lg'
                >
                  <div className='relative'>
                    <Image
                      src={recipe.image || '/placeholder.svg'}
                      alt={recipe.title}
                      width={400}
                      height={300}
                      className='h-48 w-full object-cover'
                    />
                    <Badge className='absolute right-4 top-4 bg-primary-color text-white'>
                      {recipe.difficulty}
                    </Badge>
                  </div>

                  <CardContent className='p-6'>
                    <h3 className='mb-2 text-xl font-bold text-primary-color'>
                      {recipe.title}
                    </h3>
                    <p className='mb-4 text-[#f8d87d]'>{recipe.description}</p>

                    <div className='mb-4 flex items-center space-x-4 text-sm text-[#f8d87d]'>
                      <div className='flex items-center space-x-1'>
                        <Clock className='h-4 w-4' />
                        <span>{recipe.time}</span>
                      </div>
                      <div className='flex items-center space-x-1'>
                        <Users className='h-4 w-4' />
                        <span>Serves {recipe.serves}</span>
                      </div>
                      <div className='flex items-center space-x-1'>
                        <ChefHat className='h-4 w-4' />
                        <span>{recipe.difficulty}</span>
                      </div>
                    </div>

                    <div className='space-y-4'>
                      <div>
                        <h4 className='mb-2 font-semibold text-primary-color'>
                          Ingredients:
                        </h4>
                        <ul className='space-y-1 text-sm text-white'>
                          {recipe.ingredients.map((ingredient, index) => (
                            <li key={index}>• {ingredient}</li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h4 className='mb-2 font-semibold text-primary-color'>
                          Instructions:
                        </h4>
                        <ol className='space-y-1 text-sm text-white'>
                          {recipe.instructions.map((instruction, index) => (
                            <li key={index}>
                              {index + 1}. {instruction}
                            </li>
                          ))}
                        </ol>
                      </div>
                    </div>

                    <Button className='mt-4 w-full bg-[#EEFF00] text-lg text-black'>
                      Try This Recipe
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Recipe Tips */}
        <section className='bg-black py-16'>
          <div className='container mx-auto px-4'>
            <div className='mb-12 text-center'>
              <h2 className='mb-4 text-4xl font-bold text-white'>
                Pro Tips for Cooking with{' '}
                <span className='text-primary-color'>
                  {process.env.NEXT_PUBLIC_BRAND_NAME}
                </span>
              </h2>
              <p className='text-xl text-[#f8d87d]'>
                Get the most out of your {process.env.NEXT_PUBLIC_BRAND_NAME}{' '}
                experience
              </p>
            </div>

            <div className='grid gap-8 md:grid-cols-2 lg:grid-cols-3'>
              {[
                {
                  title: 'Room Temperature is Best',
                  description: `Let ${process.env.NEXT_PUBLIC_BRAND_NAME} come to room temperature for easier spreading and mixing`,
                  icon: '🌡️'
                },
                {
                  title: 'Mix Well Before Use',
                  description:
                    'Natural separation is normal. Give it a good stir for perfect consistency',
                  icon: '🥄'
                },
                {
                  title: 'Store Properly',
                  description:
                    'Keep in a cool, dry place. Refrigeration extends shelf life',
                  icon: '🏠'
                },
                {
                  title: 'Measure by Weight',
                  description: `For baking, weighing ${process.env.NEXT_PUBLIC_BRAND_NAME} gives more consistent results`,
                  icon: '⚖️'
                },
                {
                  title: 'Warm for Drizzling',
                  description: `Gently warm ${process.env.NEXT_PUBLIC_BRAND_NAME} for easy drizzling over desserts`,
                  icon: '🍯'
                },
                {
                  title: 'Pair with Fruits',
                  description: `${process.env.NEXT_PUBLIC_BRAND_NAME} complements apples, bananas, and berries perfectly`,
                  icon: '🍎'
                }
              ].map((tip, index) => (
                <Card
                  key={index}
                  className='border-[.5px] border-[#f8d87d] bg-[#181818] transition-shadow hover:shadow-lg'
                >
                  <CardContent className='p-6 text-center'>
                    <div className='mb-4 text-4xl'>{tip.icon}</div>
                    <h3 className='mb-2 font-bold text-primary-color'>
                      {tip.title}
                    </h3>
                    <p className='text-[#f8d87d]'>{tip.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className='bg-[#181818] py-16 text-white'>
          <div className='container mx-auto px-4 text-center'>
            <h2 className='mb-4 text-4xl font-bold'>Ready to Start Cooking?</h2>
            <p className='mb-8 text-xl opacity-90'>
              Get your {process.env.NEXT_PUBLIC_BRAND_NAME} today and start
              creating delicious, healthy meals
            </p>
            <Link href='/buy-now'>
              <Button
                size='lg'
                className='bg-[#EEFF00] px-8 py-3 text-lg text-black'
              >
                Order {process.env.NEXT_PUBLIC_BRAND_NAME} Now
              </Button>
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
