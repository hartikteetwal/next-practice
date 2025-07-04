import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import Cards from "./Cards";

const LatestProduct = () => {
    const { products, productLoader } = useContext(ShopContext);

    const latestProducts = products.filter((product) => product.latestProduct);

    return (
        <section className="py-12 px-4 sm:px-6 lg:px-16">
            <h2 className="text-3xl font-bold text-[#016630] mb-8 text-center">Latest <span className="text-[#009966]">Products</span></h2>

            <Cards products={latestProducts} />
        </section>
    );
};

export default LatestProduct;