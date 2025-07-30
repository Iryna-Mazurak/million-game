import Link from 'next/link';
import React from 'react';

export default function Home() {
  return (
    <main>
      <h1>Who wants to be a millionaire?</h1>
      <Link href='/game'>Start</Link>
    </main>
  );
}
