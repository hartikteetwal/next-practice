import React from "react";

const HeroSection = () => {
    return (
        <section className="w-full h-screen bg-gradient-to-r from-green-100 via-white to-green-50 flex items-center justify-center px-6">
            <div className="text-center max-w-2xl">
                <h1 className="text-5xl md:text-6xl font-extrabold text-green-800 mb-6">
                    Welcome to <span className="text-emerald-600">Ecowear</span>
                </h1>
                <p className="text-lg md:text-xl text-gray-700 mb-8">
                    Sustainable Fashion for a Better Tomorrow. Shop eco-friendly, stylish, and affordable wearables.
                </p>
                <div className="flex justify-center gap-4">
                    <button className="px-6 py-3 bg-emerald-600 text-white rounded-full text-lg hover:bg-emerald-700 transition">
                        Shop Now
                    </button>
                    <button className="px-6 py-3 border border-emerald-600 text-emerald-600 rounded-full text-lg hover:bg-emerald-50 transition">
                        Learn More
                    </button>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;