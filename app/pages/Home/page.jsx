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
import SkeletonPage from '@/app/components/SkeletonPage';
import AdminDashboard from '@/app/components/AdminDashboard';
import { Toaster } from 'react-hot-toast';

const Home = () => {
    const router = useRouter();
    const {role,token} = useContext(ShopContext)

    useEffect(() => {
        const token = getToken();
        if (!token) {
            router.replace('/pages/Login'); // Redirect to login if not logged in
        }
    }, []);

    if (!token && !role) return (
        <div>
            <div className='min-h-100'>
                <SkeletonPage />;
            </div>
        </div>
    )

    return (
        <div>
            <Navbar />
            <div className='min-h-100'>
                {role === "admin" ? <>
                
                    <AdminDashboard />
             
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
            </div>
            <Footer />
            <Toaster />
        </div>
  
    );
};

export default Home;
