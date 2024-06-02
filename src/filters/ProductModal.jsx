import React from "react";

// Modal component to display product details
const ProductModal = ({ product, onClose }) => {
  // If there's no product data, return null to render nothing
  if (!product) return null;

  // Render the modal with product details
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      {/* Modal content */}
      <div className="bg-white p-4 rounded-lg max-w-md w-full relative">
        {/* Button to close the modal */}
        <button onClick={onClose} className="absolute top-2 right-2 text-black">
          Close
        </button>
        {/* Product image */}
        <img
          className="w-full mb-4 h-60 object-cover rounded-lg"
          src={product.image}
          alt={product.title}
        />
        {/* Product title */}
        <h3 className="text-lg font-bold mb-2">{product.title}</h3>
        {/* Product price */}
        <p className="text-md font-bold mb-2">Price: ${product.price}</p>
      </div>
    </div>
  );
};

export default ProductModal;
