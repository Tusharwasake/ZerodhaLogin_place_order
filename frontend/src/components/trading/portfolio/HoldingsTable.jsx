import React from "react";

function HoldingsTable({ holdings }) {
  // Ensure holdings is an array and has data
  if (!Array.isArray(holdings) || holdings.length === 0) {
    return (
      <div className="p-8 text-center text-gray-500">No holdings found</div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-2 text-left">Symbol</th>
            <th className="px-4 py-2 text-left">Quantity</th>
            <th className="px-4 py-2 text-left">Avg Price</th>
            <th className="px-4 py-2 text-left">Current Price</th>
            <th className="px-4 py-2 text-left">P&L</th>
          </tr>
        </thead>
        <tbody>
          {holdings.map((holding, index) => (
            <tr key={index} className="border-b">
              <td className="px-4 py-3">{holding.tradingsymbol}</td>
              <td className="px-4 py-3">{holding.quantity}</td>
              <td className="px-4 py-3">₹{holding.average_price}</td>
              <td className="px-4 py-3">₹{holding.last_price}</td>
              <td className="px-4 py-3">
                <span
                  className={
                    (holding.last_price - holding.average_price) *
                      holding.quantity >=
                    0
                      ? "text-green-600"
                      : "text-red-600"
                  }
                >
                  ₹
                  {(
                    (holding.last_price - holding.average_price) *
                    holding.quantity
                  ).toFixed(2)}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default HoldingsTable;
