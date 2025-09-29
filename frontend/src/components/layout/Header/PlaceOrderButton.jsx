import React from "react";

function PlaceOrderButton({ isActive, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`group relative inline-flex items-center px-6 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 shadow-md ${
        isActive
          ? "bg-green-600 text-white shadow-green-200 focus:ring-green-500"
          : "bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700 focus:ring-green-500"
      }`}
    >
      <span>Place Order</span>
    </button>
  );
}

export default PlaceOrderButton;
