import Head from 'next/head';
import Header from '@/components/layout/Header';

export default function RefundCancellationPolicyPage() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://penowa.in';
  return (
    <div className='min-h-screen !bg-black !text-white'>
      <Head>
        <title>
          Refund & Cancellation Policy | {process.env.NEXT_PUBLIC_BRAND_NAME}
        </title>
        <meta
          name='description'
          content='Understand our refund and cancellation policy for orders placed through the Platform.'
        />
        <link rel='canonical' href={siteUrl + '/refund-cancellation-policy'} />
        <script
          type='application/ld+json'
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebPage',
              name: 'Refund & Cancellation Policy',
              url: siteUrl + '/refund-cancellation-policy'
            })
          }}
        />
      </Head>
      <Header />
      <main className='px-4 pt-28 md:pb-20'>
        <div className='container mx-auto max-w-4xl'>
          <h1 className='mb-6 font-playfair text-4xl font-bold'>
            Refund & Cancellation Policy
          </h1>
          <div className='space-y-4 text-white'>
            <p>
              This refund and cancellation policy outlines how you can cancel or
              seek a refund for a product / service that you have purchased
              through the Platform. Under this policy:
            </p>
            <ol className='list-decimal space-y-2 pl-6'>
              <li>
                Cancellations will only be considered if the request is made 3
                days of placing the order. However, cancellation requests may
                not be entertained if the orders have been communicated to such
                sellers / merchant(s) listed on the Platform and they have
                initiated the process of shipping them, or the product is out
                for delivery. In such an event, you may choose to reject the
                product at the doorstep.
              </li>
              <li>
                Penowa does not accept cancellation requests for perishable
                items like flowers, eatables, etc. However, the refund /
                replacement can be made if the user establishes that the quality
                of the product delivered is not good.
              </li>
              <li>
                In case of receipt of damaged or defective items, please report
                to our customer service team. The request would be entertained
                once the seller/ merchant listed on the Platform, has checked
                and determined the same at its own end. This should be reported
                within 3 days of receipt of products. In case you feel that the
                product received is not as shown on the site or as per your
                expectations, you must bring it to the notice of our customer
                service within 3 days of receiving the product. The customer
                service team after looking into your complaint will take an
                appropriate decision.
              </li>
              <li>
                In case of complaints regarding the products that come with a
                warranty from the manufacturers, please refer the issue to them.
              </li>
              <li>
                In case of any refunds approved by Penowa, it will take 3 days
                for the refund to be processed to you.
              </li>
            </ol>
          </div>
        </div>
      </main>
    </div>
  );
}
