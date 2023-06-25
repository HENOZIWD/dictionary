import { useSession } from 'next-auth/react';
import Link from 'next/link';
import React from 'react';
import { Session } from 'next-auth';
import styles from '@/app/styles/useSessionInfo.module.css';

async function getUserId(session: Session) {
  if (session.user !== undefined) {
    const { email } = session.user;

    try {
      const res = await fetch('/api/getUserId', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
        }),
      });

      const { id } = await res.json();

      if (id !== sessionStorage.getItem('userId')) {
        sessionStorage.setItem('userId', id);
      }
    } catch (err) {
      console.error(err);
    }
  }
}

export default function UserSessionInfo() {
  const { data: session, status } = useSession();

  if (status === 'authenticated') {
    if (sessionStorage.getItem('userId') === null) {
      getUserId(session);
    }

    return (
      <div className={styles.info}>
        <span>
          Signed with
          {' '}
          {session.user?.email}
        </span>
        <Link href="/api/auth/signout" prefetch={false}>Sign out</Link>
      </div>
    );
  } if (status === 'loading') {
    return (
      <div>
        Loading...
      </div>
    );
  }

  sessionStorage.removeItem('words');
  sessionStorage.removeItem('userId');
  return (
    <Link href="/api/auth/signin" prefetch={false}>Sign in</Link>
  );
}
