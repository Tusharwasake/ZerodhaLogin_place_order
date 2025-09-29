import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setLoading,
  setHoldings,
  setPositions,
  setError,
} from "../../../features/portfolio/portfolioSlice";
import { fetchHoldings, fetchPositions } from "../../../services/portfolioAPI";
import HoldingsTable from "./HoldingsTable";
import PositionsTable from "./PositionsTable";

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
      dispatch(setError("Failed to load portfolio data"));
      console.log(error);
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
          {" "}
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

export default Portfolio;
