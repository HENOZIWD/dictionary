import React from 'react';
import Link from 'next/link';
import './globals.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">

      <body>
        <nav>
          <div>navigation bar</div>
          <div>
            <Link href="/">Main page</Link>
            <Link href="/dictionary">Dictionary</Link>
          </div>
        </nav>
        {children}
      </body>

    </html>
  );
}
