import React from "react";


function Disclaimer() {
    return(
        <div className="container mx-auto p-8 py-12">
        <h2 className="text-3xl text-black font-bold text-center mb-4 animate-fade-in-delay">Why Choose Us?</h2> {/* Section title */}
        <p className="text-lg text-center text-black mb-8 animate-fade-in-delay">
            We handpick our products to ensure they meet the highest quality standards. Whether you’re looking for electronics, fashion, home goods, or more, you can trust that our items are built to last and perform to your expectations.
        </p> {/* Description text */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {/* Description Cards */}
            <div className="bg-gray-800 p-6 rounded-lg shadow-md">
                <img src="/thhh.jpg" alt="Quality Products" className="mx-auto mb-4" /> {/* Image */}
                <h3 className="text-xl text-white font-bold mb-2">Quality Products</h3> {/* Card title */}
                <p className="text-gray-300">We offer only the best quality products from top brands.</p> {/* Card description */}
            </div>
            <div className="bg-gray-800 p-6 rounded-lg shadow-md">
                <img src="/fast-shipping.jpeg" alt="Fast Shipping" className="mx-auto mb-4" /> {/* Image */}
                <h3 className="text-xl font-bold mb-2 text-white">Fast Shipping</h3> {/* Card title */}
                <p className="text-gray-300">Enjoy fast and reliable shipping to your doorstep.</p> {/* Card description */}
            </div>
            <div className="bg-gray-800 p-6 rounded-lg shadow-md">
                <img src="/shop.webp" alt="Excellent Customer Service" className="mx-auto mb-4" /> {/* Image */}
                <h3 className="text-xl font-bold mb-2 text-white">Excellent Customer Service</h3> {/* Card title */}
                <p className="text-gray-300">Our dedicated customer service team is here to assist you 24/7.</p> {/* Card description */}
            </div>
        </div>
    </div>

    )
}

export default Disclaimer;