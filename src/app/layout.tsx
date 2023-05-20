import Link from 'next/link';
import './globals.css';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dictionary',
  description: 'Memorize your words!',
}

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
          <Link href='/'>Main page</Link>
          <Link href='/dictionary'>Dictionary</Link>
        </nav>
        {children}
      </body>

    </html>
  )
}
