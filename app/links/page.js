"use client"
import { Suspense } from 'react';

import dynamic from 'next/dynamic';

const Linkpage = dynamic(() => import('./Linkpage'), { ssr: false });

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Linkpage />
    </Suspense>
  )
}
