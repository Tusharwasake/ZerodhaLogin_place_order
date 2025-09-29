function MarginsSection({ marginData }) {
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header Section */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Margin Details</h1>
            <p className="text-gray-600 mt-1">
              View your trading margin and available funds
            </p>
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
              />
            </svg>
            <span>Real-time data</span>
          </div>
        </div>
      </div>

      {marginData ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">


          {/* Equity Section */}
          {marginData.equity && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center mb-4">
                <div>
                  <h4 className="text-lg font-semibold text-gray-900">
                    Equity
                  </h4>
                  <p className="text-sm text-gray-500">Cash & Carry segment</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg border border-green-200">
                  <div className="flex items-center">
                    <span className="text-sm font-medium text-green-800">
                      Available
                    </span>
                  </div>
                  <span className="text-lg font-bold text-green-800">
                    ₹{marginData.equity.available?.cash || 0}
                  </span>
                </div>

                <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg border border-red-200">
                  <div className="flex items-center">
                    <span className="text-sm font-medium text-red-800">
                      Used
                    </span>
                  </div>
                  <span className="text-lg font-bold text-red-800">
                    ₹{marginData.equity.utilised?.debits || 0}
                  </span>
                </div>

                <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="flex items-center">
                    <span className="text-sm font-medium text-blue-800">
                      Total
                    </span>
                  </div>
                  <span className="text-lg font-bold text-blue-800">
                    ₹{marginData.equity.net || 0}
                  </span>
                </div>
              </div>
            </div>
          )}



          {/* Commodity Section */}
          {marginData.commodity && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center mb-4">
                <div>
                  <h4 className="text-lg font-semibold text-gray-900">
                    Commodity
                  </h4>
                  <p className="text-sm text-gray-500">MCX trading segment</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg border border-green-200">
                  <div className="flex items-center">
                    <span className="text-sm font-medium text-green-800">
                      Available
                    </span>
                  </div>
                  <span className="text-lg font-bold text-green-800">
                    ₹{marginData.commodity.available?.cash || 0}
                  </span>
                </div>

                <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg border border-red-200">
                  <div className="flex items-center">
                    <span className="text-sm font-medium text-red-800">
                      Used
                    </span>
                  </div>
                  <span className="text-lg font-bold text-red-800">
                    ₹{marginData.commodity.utilised?.debits || 0}
                  </span>
                </div>

                <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="flex items-center">
                    <span className="text-sm font-medium text-blue-800">
                      Total
                    </span>
                  </div>
                  <span className="text-lg font-bold text-blue-800">
                    ₹{marginData.commodity.net || 0}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md p-12 text-center">
          <div className="flex flex-col items-center">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4"></div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No Margin Data Available
            </h3>
            <p className="text-gray-500">
              Please refresh the page or check your connection
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default MarginsSection;
