import React from "react";

function HeaderLogo() {
  return (
    <div className="flex items-center">
      <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center mr-3 shadow-md">
        <svg
          className="w-6 h-6 text-white"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
            clipRule="evenodd"
          />
        </svg>
      </div>
      <div>
        <h1 className="text-xl font-bold text-gray-900">TradePro</h1>
        <p className="text-xs text-gray-500">Trading Dashboard</p>
      </div>
    </div>
  );
}

export default HeaderLogo;
