'use client';
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getToken } from '../../utils/auth';
import HeroSection from '@/app/components/HeroSection';
import BestProduct from '@/app/components/BestProduct';
import FeedbackSection from '@/app/components/FeedbackSection';
import LatestProduct from '@/app/components/LatestProduct';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';

const Home = () => {
    const router = useRouter();

    useEffect(() => {
        const token = getToken();
        if (!token) {
            router.replace('/pages/Login'); // Redirect to login if not logged in
        }
    }, []);

    return (
        <div>
            <Navbar/>
        <HeroSection />
        <div className='padding-both '>
          <LatestProduct />
          <BestProduct />
          <FeedbackSection />
            </div>
            <Footer />
        </div>
  
    );
};

export default Home;
