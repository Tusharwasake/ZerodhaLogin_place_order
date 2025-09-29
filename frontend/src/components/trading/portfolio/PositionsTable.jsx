import React from "react";

function PositionsTable({ positions }) {
  // Ensure positions is an array and has data
  if (!Array.isArray(positions) || positions.length === 0) {
    return (
      <div className="p-8 text-center text-gray-500">No positions found</div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-2 text-left">Symbol</th>
            <th className="px-4 py-2 text-left">Quantity</th>
            <th className="px-4 py-2 text-left">Product</th>
            <th className="px-4 py-2 text-left">P&L</th>
          </tr>
        </thead>
        <tbody>
          {positions.map((position, index) => (
            <tr key={index} className="border-b">
              <td className="px-4 py-3">{position.tradingsymbol}</td>
              <td className="px-4 py-3">{position.quantity}</td>
              <td className="px-4 py-3">{position.product}</td>
              <td className="px-4 py-3">
                <span
                  className={
                    position.pnl >= 0 ? "text-green-600" : "text-red-600"
                  }
                >
                  ₹{position.pnl}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PositionsTable;
