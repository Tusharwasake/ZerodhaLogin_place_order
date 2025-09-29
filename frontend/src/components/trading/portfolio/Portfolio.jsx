import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setLoading,
  setHoldings,
  setPositions,
  setError,
} from "../../../features/portfolio/portfolioSlice";
import { fetchHoldings, fetchPositions } from "../../../services/portfolioAPI";

function Portfolio() {
  const dispatch = useDispatch();
  const { holdings, positions, isLoading, error } = useSelector(
    (state) => state.portfolio
  );
  const [activeTab, setActiveTab] = useState("holdings");

  const loadData = async () => {
    try {
      dispatch(setLoading(true));

      const holdingsData = await fetchHoldings();
      const positionsData = await fetchPositions();

      if (holdingsData.success) {
        dispatch(setHoldings(holdingsData.data || []));
      }

      if (positionsData.success) {
        dispatch(setPositions(positionsData.data || []));
      }
    } catch (error) {
      console.log(error);
      dispatch(setError("Failed to load portfolio data"));
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Portfolio</h2>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {/* Tabs */}
      <div className="mb-4">
        <button
          onClick={() => setActiveTab("holdings")}
          className={`px-4 py-2 mr-2 rounded ${
            activeTab === "holdings" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
        >
          Holdings ({holdings.length})
        </button>
        <button
          onClick={() => setActiveTab("positions")}
          className={`px-4 py-2 rounded ${
            activeTab === "positions" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
        >
          Positions ({positions.length})
        </button>
      </div>

      {/* Content */}
      <div className="bg-white rounded-lg shadow">
        {activeTab === "holdings" ? (
          <HoldingsTable holdings={holdings} />
        ) : (
          <PositionsTable positions={positions} />
        )}
      </div>
    </div>
  );
}

// Simple Holdings Table
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

// Simple Positions Table
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

export default Portfolio;
