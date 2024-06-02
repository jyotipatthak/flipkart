import React from "react";

const ProductModal = ({ product, onClose }) => {
  if (!product) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-4 rounded-lg max-w-md w-full relative">
        <button onClick={onClose} className="absolute top-2 right-2 text-black">
          Close
        </button>
        <img
          className="w-full mb-4 h-60 object-cover rounded-lg"
          src={product.image}
          alt={product.title}
        />
        <h3 className="text-lg font-bold mb-2">{product.title}</h3>
        <p className="text-md font-bold mb-2">Price: ${product.price}</p>
      </div>
    </div>
  );
};

export default ProductModal;
