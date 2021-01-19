import React from 'react';
import { useRouter } from 'next/router';

export default function TodsPrewiev() {
  const router = useRouter();
  return (
    <h2>
      {router.query.category} lala {router.query.project}
    </h2>
  );
}
