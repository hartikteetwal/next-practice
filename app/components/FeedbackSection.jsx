import React, { useState } from "react";
import { SendFeedback } from "../services/api";
import toast from "react-hot-toast";

const FeedbackSection = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Feedback submitted:", formData);
        try {
            const response = await SendFeedback(formData);
            if (response.success) {
                toast.success("Feedback sent successfully!");
                setFormData({ name: "", email: "", message: "" });
            } else {
                toast.error(response.error || "Failed to send feedback.");
            }
        } catch (error) {
            toast.error(error.message || "An error occurred while sending feedback.");
        }
    };

    return (
        <section className="bg-[#f9fafb] py-12 px-4 sm:px-6 lg:px-16">
            <div className="max-w-3xl mx-auto text-center mb-10">
                <h2 className="text-3xl font-bold text-[#1f2937] mb-4"><span className="text-[#066a3a]">User</span> <span className="text-[#009966]">Feedback</span></h2>
                <p className="text-gray-600">Let us know your thoughts, ideas, or issues so we can make ForeverWebsite better.</p>
            </div>

            <form
                onSubmit={handleSubmit}
                className="max-w-2xl mx-auto bg-white shadow-lg rounded-2xl p-6 space-y-6"
            >
                <div>
                    <label className="block text-sm font-medium text-gray-700">Name</label>
                    <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-[#d97706] focus:border-[#d97706]"
                        placeholder="Your name"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-[#d97706] focus:border-[#d97706]"
                        placeholder="you@example.com"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Message</label>
                    <textarea
                        name="message"
                        required
                        rows={4}
                        value={formData.message}
                        onChange={handleChange}
                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-[#d97706] focus:border-[#d97706]"
                        placeholder="Write your feedback here..."
                    ></textarea>
                </div>

                <div>
                    <button
                        type="submit"
                        className="w-full bg-[#009966] hover:bg-[#016630] text-white font-semibold py-2 px-4 rounded-lg transition duration-300"
                    >
                        Submit Feedback
                    </button>
                </div>
            </form>
        </section>
    );
};

export default FeedbackSection;