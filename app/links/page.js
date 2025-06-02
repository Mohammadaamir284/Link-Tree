import { Suspense } from 'react';
import Linkpage from './linkspage';

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Linkpage />
    </Suspense>
  )
}
