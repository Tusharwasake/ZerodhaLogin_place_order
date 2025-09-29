import React from "react";

function NavItem({ item, isActive, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`group relative inline-flex items-center 
        px-4 py-2 rounded-lg text-sm font-medium 
        transition-all duration-200 ease-in-out 
        ${
          isActive
            ? "bg-blue-50 text-blue-700 shadow-sm border border-blue-200"
            : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
        }`}
    >
      <span>{item.label}</span>
    </button>
  );
}

export default NavItem;
