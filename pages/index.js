import React, { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.push('/Skrzynka spraw/main');
  }, []);
  return <h1>Loading</h1>;
}
