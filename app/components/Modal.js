"use client";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { remove } from "@/app/Redux/Cartslice";

const Modal = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const { items: cartItems } = useSelector((state) => state.cart);
  console.log("cartItems:", cartItems);

  const handleRemove = (id) => {
    dispatch(remove(id));
  };

  if (!isOpen) return null;

  if (!cartItems || cartItems.length === 0) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <button
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            onClick={onClose}
          >
            &times;
          </button>
          <h2 className="text-2xl font-bold mb-4">Cart Items</h2>
          <p>Your cart is empty.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-8 rounded-lg shadow-lg max-h-[80vh] w-96 overflow-y-auto">
        <button
          className="absolute top-4 right-4 text-black hover:text-gray-700"
          onClick={onClose}
        >
          &times;
        </button>
        <h2 className="text-2xl font-bold mb-4">Cart Items</h2>
        <div className="space-y-4">
          {cartItems.map((product) => (
            <div key={product.id} className="flex items-center ">
              <img
                src={product.image}
                alt={product.title}
                className="w-16 h-16 object-cover mr-4"
              />
              <div>
                <h3 className="font-medium">{product.title}</h3>
                <p>Price: ${product.price}</p>
                <button
                  onClick={() => handleRemove(product.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Modal;
