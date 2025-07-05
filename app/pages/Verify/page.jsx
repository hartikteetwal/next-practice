'use client'

export const dynamic = 'force-dynamic';

import React, { useContext, useEffect } from 'react'
import axios from 'axios'
import { ShopContext } from '@/app/context/ShopContext'
import { useRouter, useSearchParams } from 'next/navigation'
import toast, { Toaster } from 'react-hot-toast'
import { VerifyStripe } from '@/app/services/api'
import SkeletonPage from '@/app/components/SkeletonPage'

const Verify = () => {
    const { token, setCartProducts, getCartData } = useContext(ShopContext)
    const searchParams = useSearchParams()
    const router = useRouter()

    const success = searchParams.get('success')
    const orderId = searchParams.get('orderId')

    console.log("Verify response:", success, orderId)

    const verifyPayment = async () => {
        try {
            if (!token) return

            const response = await VerifyStripe(success, orderId)
            if (response.success) {
                setCartProducts([])
                getCartData()
                toast.success("Payment successful! Redirecting to orders...")
                router.push('/pages/Order')
            } else {
                toast.error("Payment failed. Please try again.")
                router.push('/pages/Cart')
            }
        } catch (error) {
            console.error('Payment verify error:', error)
            toast.error(error.message || 'Something went wrong.')
        }
    }

    useEffect(() => {
        verifyPayment()
    }, [token,router])

    return (
        <div>
            <SkeletonPage />
            <Toaster />
        </div>
    )
}

export default Verify
