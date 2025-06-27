'use client';
import React, { useContext, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getToken } from '../../utils/auth';
import HeroSection from '@/app/components/HeroSection';
import BestProduct from '@/app/components/BestProduct';
import FeedbackSection from '@/app/components/FeedbackSection';
import LatestProduct from '@/app/components/LatestProduct';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import { ShopContext } from '@/app/context/ShopContext';

const Home = () => {
    const router = useRouter();
    const {role} = useContext(ShopContext)

    useEffect(() => {
        const token = getToken();
        if (!token) {
            router.replace('/pages/Login'); // Redirect to login if not logged in
        }
    }, []);

    return (
        <div>
            <Navbar />
            {role === "admin" ? <>
                <div className='min-h-100'>
                Dashboard
                </div>
            </> :
                <>
        <HeroSection />
        <div className='padding-both '>
          <LatestProduct />
          <BestProduct />
          <FeedbackSection />
                    </div>
                </>
                }
            <Footer />
        </div>
  
    );
};

export default Home;
