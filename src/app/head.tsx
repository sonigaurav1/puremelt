// This file customizes the <head> for the home page using Next.js App Router conventions.
// You can add <title>, <meta>, <script> etc. here. This will be rendered in the <head> for /.

export default function Head() {
  return (
    <>
      <title>
        Penowa Peanut Butter | Best Organic, Healthy Peanut Butter in India
      </title>
      <meta
        name='description'
        content="Buy Penowa's premium, organic, and healthy peanut butter. India's best peanut butter for fitness, gym, and health. No palm oil, no refined sugar, only real ingredients!"
      />
      <meta
        name='keywords'
        content='peanut butter, penowa peanut butter, organic peanut butter, healthy peanut butter, best peanut butter, india peanut butter, premium peanut butter, fitness peanut butter, gym peanut butter, nuts butter, natural peanut butter, protein peanut butter'
      />
      <meta name='robots' content='index, follow' />
      {/* Open Graph Tags */}
      <meta
        property='og:title'
        content='Penowa Peanut Butter | Best Organic, Healthy Peanut Butter in India'
      />
      <meta
        property='og:description'
        content="Buy Penowa's premium, organic, and healthy peanut butter. India's best peanut butter for fitness, gym, and health. No palm oil, no refined sugar, only real ingredients!"
      />
      <meta property='og:type' content='website' />
      <meta property='og:url' content='https://penowa.in/' />
      <meta property='og:image' content='https://penowa.in/penowa.png' />
      {/* Twitter Card Tags */}
      <meta name='twitter:card' content='summary_large_image' />
      <meta
        name='twitter:title'
        content='Penowa Peanut Butter | Best Organic, Healthy Peanut Butter in India'
      />
      <meta
        name='twitter:description'
        content="Buy Penowa's premium, organic, and healthy peanut butter. India's best peanut butter for fitness, gym, and health. No palm oil, no refined sugar, only real ingredients!"
      />
      <meta name='twitter:image' content='https://penowa.in/penowa.png' />
      <meta
        name='google-site-verification'
        content='mqrw5ytanki61KRLZuBoD3VRNQp6pYxIWHqizSFOv2o'
      />
      {/* JSON-LD Structured Data for Product SEO */}
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org/',
            '@type': 'Product',
            name:
              (process.env.NEXT_PUBLIC_BRAND_NAME || 'Penowa') +
              ' Premium Peanut Butter',
            image: [
              (process.env.NEXT_PUBLIC_SITE_URL || 'https://penowa.in') +
                '/penowa.png',
              (process.env.NEXT_PUBLIC_SITE_URL || 'https://penowa.in') +
                '/penowa.png'
            ],
            description:
              'Premium healthy peanut butter and nuts butters: blend of peanuts, almonds, cashews, pistachios, dates & honey. No preservatives, no palm oil, no refined sugar. Healthier, tastier, organic.',
            brand: {
              '@type': 'Brand',
              name: process.env.NEXT_PUBLIC_BRAND_NAME || 'Penowa'
            },
            offers: {
              '@type': 'Offer',
              url:
                (process.env.NEXT_PUBLIC_SITE_URL || 'https://penowa.in') +
                '/buy-now',
              priceCurrency: 'INR',
              price: '599',
              availability: 'https://schema.org/InStock',
              itemCondition: 'https://schema.org/NewCondition'
            },
            aggregateRating: {
              '@type': 'AggregateRating',
              ratingValue: '4.5',
              reviewCount: '2500'
            }
          })
        }}
      />
      {/* FAQPage JSON-LD for SEO */}
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: [
              {
                '@type': 'Question',
                name: 'What makes Penowa the best healthy peanut butter in India?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Penowa uses only premium, natural ingredients: peanuts, almonds, cashews, pistachios, dates and honey. No palm oil, no preservatives, and no refined sugar. Our peanut butter is protein-rich, organic, and delicious!'
                }
              },
              {
                '@type': 'Question',
                name: 'Is your peanut butter suitable for fitness and weight loss?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Yes! Our healthy peanut butter is high in protein and healthy fats, making it perfect for fitness enthusiasts, athletes, and anyone looking for a nutritious snack or post-workout meal.'
                }
              },
              {
                '@type': 'Question',
                name: 'Do you use palm oil or refined sugar?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Never. We use only natural sweeteners like dates and honey, and never add palm oil or refined sugar. This makes our nuts butter healthier and tastier.'
                }
              },
              {
                '@type': 'Question',
                name: 'Is Penowa peanut butter organic?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Yes, we use certified organic ingredients wherever possible, ensuring a clean, healthy, and safe product for you and your family.'
                }
              },
              {
                '@type': 'Question',
                name: 'How can I use your peanut butter?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Spread it on bread, add to shakes, pair with fruits, or drizzle on desserts. Check out our healthy peanut butter recipes for more ideas!'
                }
              }
            ]
          })
        }}
      />
    </>
  );
}
