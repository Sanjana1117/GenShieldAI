import { Fragment } from 'react';
import Head from 'next/head';
import Navbar from './Navbar';
import Footer from './Footer';

export default function Layout({ children, title = 'GenShield - Secure Content Sharing Platform' }) {
  return (
    <Fragment>
      <Head>
        <title>{title}</title>
        <meta name="description" content="A secure platform to upload and share sensitive content using invisible watermarking, platform-restricted access, digital fingerprinting, and GenAI-powered reporting" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </div>
    </Fragment>
  );
}
