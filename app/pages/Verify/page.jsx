'use client'

import React, { Suspense } from 'react'
import VerifyContent from './VerifyContent'

const VerifyPage = () => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <VerifyContent />
        </Suspense>
    )
}

export default VerifyPage
