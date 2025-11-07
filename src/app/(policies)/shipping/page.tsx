import Head from 'next/head';
import Header from '@/components/layout/Header';

export default function ShippingPolicyPage() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://penowa.in';
  return (
    <div className='min-h-screen !bg-black !text-white'>
      <Head>
        <title>Shipping Policy | {process.env.NEXT_PUBLIC_BRAND_NAME}</title>
        <meta
          name='description'
          content='Read about our shipping timelines, methods, and terms.'
        />
        <link rel='canonical' href={siteUrl + '/shipping'} />
        <script
          type='application/ld+json'
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebPage',
              name: 'Shipping Policy',
              url: siteUrl + '/shipping'
            })
          }}
        />
      </Head>
      <Header />
      <main className='px-4 pt-28 md:pb-20'>
        <div className='container mx-auto max-w-4xl'>
          <h1 className='mb-6 font-playfair text-4xl font-bold'>
            Shipping Policy
          </h1>
          <div className='space-y-4 text-white'>
            <p>
              The orders for the user are shipped through registered domestic
              courier companies and/or speed post only. Orders are shipped
              within 3 days from the date of the order and/or payment or as per
              the delivery date agreed at the time of order confirmation and
              delivering of the shipment, subject to courier company / post
              office norms.
            </p>
            <p>
              Platform Owner shall not be liable for any delay in delivery by
              the courier company / postal authority. Delivery of all orders
              will be made to the address provided by the buyer at the time of
              purchase. Delivery of our services will be confirmed on your email
              ID as specified at the time of registration.
            </p>
            <p>
              If there are any shipping cost(s) levied by the seller or the
              Platform Owner (as the case be), the same is not refundable.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
