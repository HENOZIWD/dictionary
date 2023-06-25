'use client';

import React from 'react';
import Link from 'next/link';
import '@/app/styles/globals.css';
import { SessionProvider } from 'next-auth/react';
import { Session } from 'next-auth';
import UserSessionInfo from './userSessionInfo';
import styles from '@/app/styles/rootLayout.module.css';

export default function RootLayout({
  children,
  session,
}: {
  children: React.ReactNode
  session: Session
}) {
  return (
    <html lang="ko">

      <body>
        <SessionProvider session={session}>
          <nav className={styles.navbar}>
            <div className={styles.menu}>
              <Link href="/">Main page</Link>
              <Link href="/dictionary" prefetch={false}>Dictionary</Link>
              <Link href="/dictionary/quiz" prefetch={false}>Quiz</Link>
            </div>
            <UserSessionInfo />
          </nav>
          <div className={styles.mainContent}>
            {children}
          </div>
        </SessionProvider>
      </body>

    </html>
  );
}
