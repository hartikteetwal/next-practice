'use client'

import React, { useContext, useEffect } from 'react'
import { ShopContext } from '@/app/context/ShopContext'
import { useRouter, useSearchParams } from 'next/navigation'
import toast, { Toaster } from 'react-hot-toast'
import { VerifyStripe } from '@/app/services/api'
import SkeletonPage from '@/app/components/SkeletonPage'

const VerifyContent = () => {
    const { token, setCartProducts, getCartData } = useContext(ShopContext)
    const searchParams = useSearchParams()
    const router = useRouter()

    const success = searchParams.get('success')
    const orderId = searchParams.get('orderId')

    const verifyPayment = async () => {
        if (!token) return

        try {
            const response = await VerifyStripe(success, orderId)
            if (response.success) {
                setCartProducts([])
                getCartData()
                toast.success('Payment successful! Redirecting to orders...')
                router.push('/pages/Order')
            } else {
                toast.error('Payment failed. Please try again.')
                router.push('/pages/Cart')
            }
        } catch (error) {
            console.error('Error verifying payment:', error)
            toast.error(error.message || 'Something went wrong.')
        }
    }

    useEffect(() => {
        verifyPayment()
    }, [token])

    return (
        <div>
            <SkeletonPage />
            <Toaster />
        </div>
    )
}

export default VerifyContent
