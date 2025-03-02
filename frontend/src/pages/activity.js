import React from 'react';
import Layout from '@/components/Layout';
import Link from 'next/link';

export default function Activity() {
  return (
    <Layout title="Activity - Instagram Clone">
      <div className="max-w-md mx-auto text-center py-10">
        <h1 className="text-2xl font-semibold mb-4">Activity</h1>
        <p className="text-gray-500 mb-6">This feature is coming soon!</p>
        <div className="bg-gray-100 p-8 rounded-lg mb-6">
          <p className="text-lg mb-2">🚧 Under Construction 🚧</p>
          <p className="text-gray-600">We're working on bringing you activity notifications.</p>
        </div>
        <Link href="/" className="text-instagram-blue font-semibold">
          Return to Home
        </Link>
      </div>
    </Layout>
  );
}
