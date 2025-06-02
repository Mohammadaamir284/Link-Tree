'use client'
import Linkpage from '../page'
import { Suspense } from 'react';
import React from 'react'

const page = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Linkpage />
    </Suspense>
  )
}

export default page