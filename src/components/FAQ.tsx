import Link from 'next/link';
import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion';

const FAQ = () => {
  return (
    <section className='px-4 py-16 md:px-12' id='faq'>
      <div className='container mx-auto md:max-w-7xl'>
        <div className='space-y-8'>
          {/* Heading / intro */}
          <div className='md:col-span-5'>
            {/* <h2 className='text-left text-3xl font-bold leading-tight text-primary-color md:text-4xl'>
              Frequently asked questions
            </h2>
            <p className='mt-3 max-w-prose text-sm text-slate-400 md:text-base'>
              Everything you want to know about our healthy nuts butter — made
              with premium nuts, dates, and honey. No palm oil. No refined
              sugar.
            </p> */}
            <h1 className='text-5xl font-bold text-center'>FAQs</h1>
          </div>

          {/* Accordion list */}
          <div className='md:col-span-7 bg-white rounded-3xl border-[2px] border-[#f8d87d] p-2 max-w-2xl mx-auto'>
            <Accordion type='single' collapsible className='w-full space-y-3'>
              {[
                {
                  question:
                    'What makes Penowa the best healthy nuts butter in India?',
                  answer:
                    'Penowa uses only premium, natural ingredients: peanuts, almonds, cashews, pistachios, dates and honey. No palm oil, no preservatives, and no refined sugar. Our nuts butter is protein-rich, organic, and delicious!'
                },
                {
                  question:
                    'Is your nuts butter suitable for fitness and weight loss?',
                  answer:
                    'Yes! Our healthy nuts butter is high in protein and healthy fats, making it perfect for fitness enthusiasts, athletes, and anyone looking for a nutritious snack or post-workout meal.'
                },
                {
                  question: 'Do you use palm oil or refined sugar?',
                  answer:
                    'Never. We use only natural sweeteners like dates and honey, and never add palm oil or refined sugar. This makes our nuts butter healthier and tastier.'
                },
                {
                  question: 'Is Penowa nuts butter organic?',
                  answer:
                    'Yes, we use certified organic ingredients wherever possible, ensuring a clean, healthy, and safe product for you and your family.'
                },
                {
                  question: 'How can I use your nuts butter?',
                  answer: (
                    <span>
                      Spread it on bread, add to shakes, pair with fruits, or
                      drizzle on desserts. Check out our{' '}
                      <Link
                        href='/recipes'
                        className='text-primary-color underline'
                      >
                        healthy nuts butter recipes
                      </Link>{' '}
                      for more ideas!
                    </span>
                  )
                }
              ].map((faq, idx) => (
                <AccordionItem
                  key={faq.question}
                  value={`item-${idx + 1}`}
                  className='rounded-3xl  bg-[rgb(200,200,200)] px-4 md:px-5'
                >
                  <AccordionTrigger className='text-left text-black hover:no-underline'>
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className='text-gray-600 text-base'>
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
