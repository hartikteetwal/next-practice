import React from "react";
import { FaFacebookF, FaInstagram, FaTwitter, FaLeaf } from "react-icons/fa";

const Footer = () => {
    return (
        <footer className="bg-green-900 text-white px-6 py-10">
            <div className="max-w-7xl mx-auto flex flex-col gap-8 md:grid md:grid-cols-4 md:gap-10">
                {/* Logo & About */}
                <div className="text-center md:text-left">
                    <div className="flex justify-center md:justify-start items-center gap-2 text-2xl font-bold">
                        <FaLeaf className="text-lime-400" />
                        EcoWear
                    </div>
                    <p className="mt-4 text-sm text-gray-300">
                        EcoWear is committed to sustainable fashion and eco-friendly products that make a difference.
                    </p>
                </div>

                {/* Quick Links */}
                <div className="text-center md:text-left">
                    <h3 className="font-semibold mb-3 text-lg">Quick Links</h3>
                    <ul className="space-y-2 text-sm text-gray-300">
                        <li><a href="#home" className="hover:text-lime-400">Home</a></li>
                        <li><a href="#about" className="hover:text-lime-400">About Us</a></li>
                        <li><a href="#products" className="hover:text-lime-400">Products</a></li>
                        <li><a href="#contact" className="hover:text-lime-400">Contact</a></li>
                    </ul>
                </div>

                {/* Support */}
                <div className="text-center md:text-left">
                    <h3 className="font-semibold mb-3 text-lg">Support</h3>
                    <ul className="space-y-2 text-sm text-gray-300">
                        <li><a href="#" className="hover:text-lime-400">FAQs</a></li>
                        <li><a href="#" className="hover:text-lime-400">Privacy Policy</a></li>
                        <li><a href="#" className="hover:text-lime-400">Terms & Conditions</a></li>
                    </ul>
                </div>

                {/* Social Media */}
                <div className="text-center md:text-left">
                    <h3 className="font-semibold mb-3 text-lg">Follow Us</h3>
                    <div className="flex justify-center md:justify-start gap-4">
                        <a href="#" className="text-gray-300 hover:text-lime-400 text-xl">
                            <FaFacebookF />
                        </a>
                        <a href="#" className="text-gray-300 hover:text-lime-400 text-xl">
                            <FaInstagram />
                        </a>
                        <a href="#" className="text-gray-300 hover:text-lime-400 text-xl">
                            <FaTwitter />
                        </a>
                    </div>
                </div>
            </div>

            <div className="text-center text-sm text-gray-400 mt-10 border-t border-gray-600 pt-6">
                © {new Date().getFullYear()} EcoWear. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;