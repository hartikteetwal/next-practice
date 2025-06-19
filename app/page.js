'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getToken } from './utils/auth';

export default function RootPage() {
  const router = useRouter();

  useEffect(() => {
    const token = getToken();
    if (token) {
      router.replace('/pages/Home');
    } else {
      router.replace('/pages/Login');
    }
  }, []);

  return null; // or loading spinner
}
