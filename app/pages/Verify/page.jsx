'use client'

import React, { Suspense } from 'react'
import VerifyContent from './VerifyContent'
import SkeletonPage from '@/app/components/SkeletonPage'

const VerifyPage = () => {
    return (
        <Suspense fallback={<div><SkeletonPage/></div>}>
            <VerifyContent />
        </Suspense>
    )
}

export default VerifyPage
