import React from "react";

function MessageAlert({ message }) {
  return (
    <div
      className={`p-4 mb-6 rounded-lg border ${
        message.includes("successfully")
          ? "bg-green-50 border-green-200 text-green-800"
          : "bg-red-50 border-red-200 text-red-800"
      }`}
    >
      <div className="flex items-center">
        <span className="mr-2">
          {message.includes("successfully") ? "success" : "fail"}
        </span>
        {message}
      </div>
    </div>
  );
}

export default MessageAlert;
