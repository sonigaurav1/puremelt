import Head from 'next/head';
import Header from '@/components/layout/Header';

export default function ReturnPolicyPage() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://penowa.in';
  return (
    <div className='min-h-screen !bg-black !text-white'>
      <Head>
        <title>Return Policy | {process.env.NEXT_PUBLIC_BRAND_NAME}</title>
        <meta
          name='description'
          content='Learn about our return and exchange policy and eligibility.'
        />
        <link rel='canonical' href={siteUrl + '/returns'} />
        <script
          type='application/ld+json'
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebPage',
              name: 'Return Policy',
              url: siteUrl + '/returns'
            })
          }}
        />
      </Head>
      <Header />
      <main className='px-4 pt-28 md:pb-20'>
        <div className='container mx-auto max-w-4xl'>
          <h1 className='mb-6 font-playfair text-4xl font-bold'>
            Return Policy
          </h1>
          <div className='space-y-4 text-white'>
            <p>
              We offer refund / exchange within first 3 days from the date of
              your purchase. If 3 days have passed since your purchase, you will
              not be offered a return, exchange or refund of any kind.
            </p>
            <p>
              In order to become eligible for a return or an exchange, (i) the
              purchased item should be unused and in the same condition as you
              received it, (ii) the item must have original packaging, (iii) if
              the item that you purchased on a sale, then the item may not be
              eligible for a return / exchange. Further, only such items are
              replaced by us (based on an exchange request), if such items are
              found defective or damaged.
            </p>
            <p>
              You agree that there may be a certain category of products / items
              that are exempted from returns or refunds. Such categories of the
              products would be identified to you at the item of purchase.
            </p>
            <p>
              For exchange / return accepted request(s) (as applicable), once
              your returned product / item is received and inspected by us, we
              will send you an email to notify you about receipt of the returned
              / exchanged product. Further. If the same has been approved after
              the quality check at our end, your request (i.e. return /
              exchange) will be processed in accordance with our policies.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
