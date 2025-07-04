'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getRole, getToken } from './utils/auth';
import SkeletonPage from './components/SkeletonPage';

export default function RootPage() {
  const router = useRouter();
  const token = getToken();
  const role = getRole();

  useEffect(() => {
    if (token) {
        router.replace('/pages/Home');
    } else {
      router.replace('/pages/Login');
    }
  }, [token, role]);

  return ; // or loading spinner
}
