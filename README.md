# Penowa Website

## Brand Overview

Penowa is redefining nuts butter in India with a single, premium variant that blends peanuts, almonds, cashews, pistachios, dates, raisins, and honey into one irresistible spread. Crafted for health-conscious, flavor-seeking consumers, Penowa stands for clean, honest ingredients—no preservatives, no palm oil, and no refined sugar. It’s not just a product, but a lifestyle choice for those who demand quality, authenticity, and indulgence without compromise.

---

## Table of Contents

- [Brand Description](#brand-description)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [How to Run Locally](#how-to-run-locally)
- [Page Structure](#page-structure)
- [Brand Messaging & Pillars](#brand-messaging--pillars)
- [Contributing](#contributing)
- [License](#license)

---

## Brand Description

### Short Version

🥄 **All-in-One Nuts Butter**  
A premium blend of peanuts, almonds, cashews, pistachios, dates, raisins & honey—crafted into one irresistible spoon.

### Medium Version

**A Spoonful of Everything Good**  
Penowa brings you a singular, standout variant of nuts butter that doesn’t exist anywhere else. We’ve combined the richness of multiple premium nuts with the natural sweetness of honey and raisins. No preservatives. No compromises. Just wholesome indulgence in every jar.

### Long Version

Welcome to Penowa, where the simplest ideas make the boldest impact. In a world full of generic peanut butters, we dared to ask—what if one spoon could offer more? That led to our signature and only product: a premium nuts butter unlike anything else on the market. Designed for those who value both health and taste, Penowa is perfect for gym-goers, parents, foodies, or anyone craving honest nourishment with a premium touch.

**Brand Tagline:** Healthier. Happier. And Organic.

**Mission:** To elevate everyday nutrition with a thoughtfully crafted nuts butter that blends premium ingredients, health, and indulgence—all in a single, standout variant.

**Vision:** To be the most trusted single-variant nuts butter brand in India, known for innovation, purity, and uncompromising commitment to taste and quality.

---

## Features

- **Single Premium SKU:** All-in-one blend of peanuts, almonds, cashews, pistachios, dates, raisins & honey
- **No Preservatives, No Palm Oil, No Refined Sugar**
- **Organic Ingredients**
- **Protein Rich (25g/100g)**
- **Healthy Fats (Omega-3 & Omega-6)**
- **Fiber from Dates & Nuts**
- **Unique Flavor Profile**
- **Ideal for Gym-goers, Foodies, Kids & Families**
- **Versatile Usage:** Spread, shakes, fruits, desserts
- **Customer Testimonials & Trust Badges**
- **Modern, Minimalist UI**

---

## Tech Stack

- **Frontend:** Next.js 15, Tailwind CSS, ShadCN UI
- **Backend:** Next.js API routes (Convex recommended for eComm logic + auth)
- **Payment:** Phonepe (UPI, Cards, Wallets, Netbanking)
- **SEO & Analytics:** Google Analytics, Meta/Facebook Pixel, schema.org markup, OpenGraph tags
- **CMS (Recommended):** Sanity or Strapi for dynamic blogs/recipes

---

## Project Structure

```
app/
  ├── components/         # Contexts, UI, layout, slider
  ├── api/                # Newsletter, Phonepe, contact
  ├── buy-now/            # Buy Now page
  ├── cart/               # Cart page
  ├── contact/            # Contact page
  ├── product/            # Product page
  ├── recipes/            # Recipes page
  ├── about/              # About Us page
components/
  ├── layout/             # Header, Footer, etc.
  ├── ui/                 # ShadCN UI components
constant/
  └── index.ts            # Product prices, weights
hooks/
  └── use-mobile.tsx      # Custom hooks
lib/
  └── utils.ts            # Utility functions
public/
  ├── images, icons, fonts
```

---

## How to Run Locally

1. **Clone the repository:**
   ```sh
   git clone <repo-url>
   cd penowa-website
   ```

````
2. **Install dependencies:**
   ```sh
npm install
````

3. **Set environment variables:**
   - Create a `.env.local` file and add:
     ```
     NEXT_PUBLIC_BRAND_NAME=Penowa
     ```

# Add other required env variables here

````
4. **Run the development server:**
   ```sh
npm run dev
````

5. **Open [http://localhost:3000](http://localhost:3000) in your browser.**

---

## Page Structure

| Page         | Purpose                                            |
| ------------ | -------------------------------------------------- |
| Home         | Hero, product spotlight, ingredients, testimonials |
| Our Product  | Detailed nutrition, ingredient sourcing, use cases |
| Recipes      | Blog-style visual recipes                          |
| About Us     | Brand story, team, sourcing process                |
| Contact Us   | Basic form, support details                        |
| Login/Signup | Accounts and order tracking                        |

---

## Brand Messaging & Pillars

1. **Only One Product. Because One is Enough.**
2. **Nature’s Finest, Blended to Perfection.**
3. **Crafted for Modern Lifestyles.**
4. **No Junk. Just Joy.**

### Brand Personality

- Minimalistic yet bold
- Health-driven but indulgent
- Premium without being pretentious
- Experimental with a single-minded focus

### Ideal Brand Colors

- Earthy Brown / Mocha
- Muted Gold or Honey Yellow
- Olive Green
- Soft Cream / Almond White

---

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

---

## License

This project is licensed under the MIT License.

---

## Real-World Use Cases

- Direct-to-consumer (D2C) model
- Instagram-first brands
- Brands leveraging content, influencers, and storytelling

---

## Contact

- Email: support@penowa.in
- Phone: +91 93183 67696
- Instagram: [@penowa](#)
- Facebook: [@penowa](#)
- Twitter: [@penowa](#)

---

## Credits

Inspired by luxury craft food brands like The Whole Truth and Jimmy’s Cocktails—minimal SKUs, bold storytelling.
