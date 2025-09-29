import React from "react";

function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center p-10">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      <span className="ml-3 text-gray-600">Loading orders...</span>
    </div>
  );
}

export default LoadingSpinner;
