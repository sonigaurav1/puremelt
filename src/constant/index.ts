export const PRODUCT_WEIGHTS = ["350g"] as const;
export const PRODUCT_CATEGORIES = ["nuts", "peanut-butter", "almond-butter", "cashew-butter"] as const;
export const PRODUCT_TAGS = ["organic", "gluten-free", "vegan", "high-protein"] as const;
export const PRODUCT_BRANDS = ["PureMelt", "NutriBlend", "HealthyHarvest"] as const;
export const PRODUCT_COLORS = ["brown", "golden", "creamy", "crunchy"] as const;
export const PRODUCT_INGREDIENTS = ["Peanuts", "Almonds", "Cashews", "Pistachios", "Dates", "Honey", "Salt"] as const;
export const PRODUCT_INGREDIENTS_DETAILED = [
  {
    name: 'Peanuts',
    description: 'Roasted for aroma & crunch',
    icon: 'https://images.unsplash.com/photo-1575399872095-9363bf262e64?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cGVhbnV0fGVufDB8fDB8fHww'
  },
  {
    name: 'Almonds',
    description: 'Smoothness & healthy fats',
    icon: 'https://plus.unsplash.com/premium_photo-1675237625910-e5d354c03987?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YWxtb25kc3xlbnwwfHwwfHx8MA%3D%3D'
  },
  {
    name: 'Cashews',
    description: 'Creamy delight & rich nutrients',
    icon: 'https://images.unsplash.com/photo-1723466998060-533cd1af4e11?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzZ8fGNhc2hld3xlbnwwfHwwfHx8MA%3D%3D'
  },
  {
    name: 'Pistachios',
    description: 'Luxury & antioxidants',
    icon: 'https://images.unsplash.com/photo-1704079662049-d00890d21a69?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cGlzdGFjaGlvc3xlbnwwfHwwfHx8MA%3D%3D'
  },
  {
    name: 'Dates',
    description: 'Fiber-rich with caramel twist',
    icon: 'https://plus.unsplash.com/premium_photo-1676208753932-6e8bc83a0b0d?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8ZGF0ZXN8ZW58MHx8MHx8fDA%3D'
  },
  {
    name: 'Honey',
    description: 'Natural sweetness',
    icon: 'https://images.unsplash.com/photo-1654515722385-c684c5331c04?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGhvbmV5fGVufDB8fDB8fHww'
  }, {
    name: 'Salt',
    description: 'Enhances flavor',
    icon: 'https://images.unsplash.com/photo-1648595093268-c0fd39b4cc30?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDJ8fHNhbHR8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&q=60&w=900'
  }
] as const;
export const PRODUCT_INGREDIENTS_DETAILED_PRODUCT_PAGE = [
  {
    name: 'Peanuts',
    description:
      'Roasted to perfection for that signature crunch and aroma',
    icon: 'https://images.unsplash.com/photo-1575399872095-9363bf262e64?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cGVhbnV0fGVufDB8fDB8fHww',
    benefits: 'High protein, healthy fats, vitamin E'
  },
  {
    name: 'Almonds',
    description:
      'Adds smoothness and creamy texture to every spoonful',
    icon: 'https://plus.unsplash.com/premium_photo-1675237625910-e5d354c03987?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YWxtb25kc3xlbnwwfHwwfHx8MA%3D%3D',
    benefits: 'Vitamin E, magnesium, fiber'
  },
  {
    name: 'Cashews',
    description:
      'Premium cashews for ultimate creaminess and indulgence',
    icon: 'https://images.unsplash.com/photo-1723466998060-533cd1af4e11?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzZ8fGNhc2hld3xlbnwwfHwwfHx8MA%3D%3D',
    benefits: 'Copper, magnesium, healthy fats'
  },
  {
    name: 'Pistachios',
    description:
      'Hand-picked pistachios adding luxury and antioxidants',
    icon: 'https://images.unsplash.com/photo-1704079662049-d00890d21a69?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cGlzdGFjaGlvc3xlbnwwfHwwfHx8MA%3D%3D',
    benefits: 'Antioxidants, protein, potassium'
  },
  {
    name: 'Dates',
    description: 'Natural sweetness with a rich caramel twist',
    icon: 'https://plus.unsplash.com/premium_photo-1676208753932-6e8bc83a0b0d?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8ZGF0ZXN8ZW58MHx8MHx8fDA%3D',
    benefits: 'Fiber, potassium, natural sugars'
  },
  {
    name: 'Pure Honey',
    description:
      'Raw, unprocessed honey for natural golden sweetness',
    icon: 'https://images.unsplash.com/photo-1654515722385-c684c5331c04?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGhvbmV5fGVufDB8fDB8fHww',
    benefits: 'Antioxidants, enzymes, natural energy'
  }
] as const;
export const PRODUCT_SIZES = ["small", "medium", "large"] as const;
export const PRODUCT_FLAVORS = ["original", "chocolate", "honey", "salted"] as const;
export const PRODUCT_ORIGINS = ["India", "USA", "Australia", "Canada"] as const;
export const PRODUCT_NUTRITION = {
  calories: 200,
  protein: 8,
  fat: 16,
  carbs: 6,
  fiber: 2,
  sugar: 3,
};
export const PRODUCT_SERVING_SIZE = "30g";
export const PRODUCT_SERVINGS_PER_CONTAINER = 10;
export const PRODUCT_DESCRIPTION = `PureMelt's Premium All-in-One Nuts Butter is a delicious blend of the finest nuts,
crafted to perfection for a creamy, rich taste. Made with 100% natural ingredients, it's
perfect for spreading, baking, or enjoying straight from the jar. Packed with protein and healthy fats,
this versatile butter is ideal for a nutritious breakfast, a post-workout snack, or a guilt-free treat.
Experience the melt-in-your-mouth goodness of PureMelt, where quality meets taste.
Whether you're a fitness enthusiast or just love the taste of premium nuts, PureMelt is your go-to choice for a healthy, indulgent experience.`;
export const PRODUCT_META_DESCRIPTION = `Discover PureMelt's Premium All-in-One Nuts Butter - a blend of the finest nuts for a creamy, rich taste. Made with 100% natural ingredients, it's perfect for spreading, baking, or enjoying straight from the jar. Packed with protein and healthy fats, this versatile butter is ideal for a nutritious breakfast, a post-workout snack, or a guilt-free treat. Experience the melt-in-your-mouth goodness of PureMelt, where quality meets taste. Whether you're a fitness enthusiast or just love the taste of premium nuts, PureMelt is your go-to choice for a healthy, indulgent experience.`;
export const PRODUCT_META_KEYWORDS = `PureMelt, nuts butter, premium nuts, natural ingredients, creamy taste, healthy snack, protein rich, gluten-free, vegan, all-in-one butter, gourmet nuts, nut spread, healthy breakfast, post-workout snack, guilt-free treat, melt-in-your-mouth, quality nuts, indulgent experience, fitness snack, nut butter blend, organic nuts, healthy fats, nutritious spread, versatile butter, almond butter, peanut butter, cashew butter, hazelnut spread, chocolate nut butter,
honey nut butter, salted nut butter, original nut butter, crunchy nut butter, creamy nut butter, nut butter for baking, nut butter for spreading, nut butter for smoothies, nut butter for desserts, nut butter for breakfast, nut butter for snacks, nut butter for fitness, nut butter for health, nut butter for indulgence, gourmet nut spread, artisan nut butter, handcrafted nut butter, premium nut spread, all-natural nut butter, healthy indulgence, guilt-free indulgence`;
export const PRODUCT_URL = "/product/premium-all-in-one-nuts-butter";
export const PRODUCT_SLUG = "premium-all-in-one-nuts-butter";
export const PRODUCT_ID = "puremelt-premium-nuts-butter";
export const PRODUCT_SKU = "PM-NUTS-BTR-001";
export const PRODUCT_UPC = "123456789012";
export const PRODUCT_BARCODE = "1234567890123";
export const PRODUCT_AVAILABILITY = "in stock";
export const PRODUCT_CONDITION = "new";
export const PRODUCT_BRAND = "PureMelt";
export const PRODUCT_RATING = 4.5;
export const PRODUCT_REVIEWS_COUNT = 150;
export const PRODUCT_REVIEW_AVERAGE = 4.7;
export const PRODUCT_REVIEW_COUNT = 120;
export const PRODUCT_REVIEW_RATINGS = {
  "5-star": 80,
  "4-star": 30,
  "3-star": 5,
  "2-star": 3,
  "1-star": 2,
};
export const PRODUCT_REVIEW_TEXT = `PureMelt's Premium All-in-One Nuts Butter is simply amazing! The blend of nuts creates a rich, creamy texture that is perfect for spreading on toast or adding to smoothies. I love that it's made with 100% natural ingredients and is packed with protein and healthy fats. It's become a staple in my kitchen for breakfast and snacks. Highly recommend it to anyone looking for a delicious and nutritious nut butter!`;
export const PRODUCT_REVIEW_AUTHOR = "John Doe";
export const PRODUCT_REVIEW_DATE = "2023-10-01";
export const PRODUCT_REVIEW_SOURCE = "Verified Purchase";
export const PRODUCT_REVIEW_SOURCE_URL = "https://example.com/reviews/premium-nuts-butter";
export const PRODUCT_REVIEW_HELPFUL_COUNT = 25;
export const PRODUCT_REVIEW_NOT_HELPFUL_COUNT = 2;
export const PRODUCT_REVIEW_RESPONSE = `Thank you for your kind words, John! We're thrilled to hear that you love our Premium All-in-One Nuts Butter. Your feedback means a lot to us, and we're glad to know that our product has become a staple in your kitchen. If you have any other suggestions or feedback, feel free to reach out. Enjoy your nut butter!`;
export const PRODUCT_REVIEW_RESPONSE_AUTHOR = "PureMelt Team";
export const PRODUCT_REVIEW_RESPONSE_DATE = "2023-10-02";
export const PRODUCT_REVIEW_RESPONSE_SOURCE = "Official Response";
export const PRODUCT_REVIEW_RESPONSE_SOURCE_URL = "https://example.com/reviews/premium-nuts-butter/response";
export const PRODUCT_REVIEW_RESPONSE_HELPFUL_COUNT = 10;
export const PRODUCT_REVIEW_RESPONSE_NOT_HELPFUL_COUNT = 0;
export const PRODUCT_REVIEW_RESPONSE_TEXT = `Thank you for your kind words, John! We're thrilled to hear that you love our Premium All-in-One Nuts Butter. Your feedback means a lot to us, and we're glad to know that our product has become a staple in your kitchen. If you have any other suggestions or feedback, feel free to reach out. Enjoy your nut butter!`;


export const PRODUCT_PRICES = {
  "premium-nuts-butter": { 
    "250g": { original: 349, discounted: 299 },
    "350g": { original: 449, discounted: 399 },
    "500g": { original: 699, discounted: 599 },
    "750g": { original: 799, discounted: 699 },
    "1kg": { original: 1299, discounted: 1099 },
   },
  "peanut-butter": { 
    "250g": { original: 349, discounted: 299 },
    "350g": { original: 449, discounted: 399 },
    "500g": { original: 349, discounted: 299 },
    "750g": { original: 799, discounted: 699 },
    "1kg": { original: 1299, discounted: 1099 },
  },
  "almond-walnut-cashew-butter": { 
    "250g": { original: 549, discounted: 499 },
    "350g": { original: 449, discounted: 399 },
    "500g": { original: 699, discounted: 599 },
    "750g": { original: 799, discounted: 699 },
    "1kg": { original: 1299, discounted: 1099 },
  },
}

export const PRODUCT_IMAGES = {
  "250g": "/images/product-250g.jpg",
  "350g": "/images/product-350g.jpg",
  "500g": "/images/product-500g.jpg",
  "1kg": "/images/product-1kg.jpg",
};

export const PHONE_NUMBER = "+91 93183 67696";
export const EMAIL_ADDRESS = `support@${process.env.NEXT_PUBLIC_BRAND_NAME?.toLowerCase()}.in`;