import Footer from "@/app/components/Footer";
import Navbar from "@/app/components/Navbar";
import React from "react";

const About = () => {
    return (
        <>
            <Navbar />
            <section className="py-[100px] px-4 sm:px-6 lg:px-16 bg-white text-gray-800">
                <div className="max-w-5xl mx-auto">
                    <h1 className="text-4xl font-bold text-[#016630] mb-6 text-center">
                        About <span className="text-[#009966]">EcoWear</span>
                    </h1>

                    <p className="text-lg mb-8 text-center text-gray-600">
                        Where sustainability meets style. Join us in building a better world—one outfit at a time.
                    </p>

                    <div className="space-y-8 text-gray-700">
                        <div>
                            <h2 className="text-2xl font-semibold mb-2">🌿 Our Mission</h2>
                            <p>
                                EcoWear is committed to redefining fashion with eco-friendly, sustainable clothing.
                                We believe looking good shouldn't come at the planet’s expense. Our products are
                                crafted with organic materials, ethical labor, and minimal carbon footprint.
                            </p>
                        </div>

                        <div>
                            <h2 className="text-2xl font-semibold mb-2">👕 What We Offer</h2>
                            <p>
                                From everyday essentials to bold statement pieces, EcoWear delivers high-quality fashion
                                that’s kind to the Earth. Explore our collections of organic cotton t-shirts, recycled
                                denim, biodegradable packaging, and much more.
                            </p>
                        </div>

                        <div>
                            <h2 className="text-2xl font-semibold mb-2">♻️ Sustainability</h2>
                            <p>
                                We use eco-conscious materials, limit water waste, and maintain transparent supply chains.
                                Every product is a step toward a greener tomorrow. Our packaging is 100% recyclable and
                                our production partners follow fair-trade standards.
                            </p>
                        </div>

                        <div>
                            <h2 className="text-2xl font-semibold mb-2">🌍 Join the Movement</h2>
                            <p>
                                EcoWear is more than a brand—it's a lifestyle. Follow us on our journey to make fashion
                                more sustainable. Every purchase you make contributes to a cleaner planet and a better future.
                            </p>
                        </div>
                    </div>

                    <div className="mt-12 text-center">
                        <a
                            href="/"
                            className="inline-block bg-[#009966] text-white px-6 py-3 rounded-xl text-lg font-medium hover:bg-[#007755] transition"
                        >
                            Start Shopping
                        </a>
                    </div>
                </div>
            </section>
            <Footer/>
        </>
    );
};

export default About;