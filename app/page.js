'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getRole, getToken } from './utils/auth';

export default function RootPage() {
  const router = useRouter();

  useEffect(() => {
    const token = getToken();
    const role = getRole();
    if (token) {
        router.replace('/pages/Home');
    } else {
      router.replace('/pages/Login');
    }
  }, []);

  return null; // or loading spinner
}
