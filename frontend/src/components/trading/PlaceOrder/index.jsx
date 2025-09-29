import React, { useState } from "react";
import OrderHeader from "./OrderHeader";
import MessageAlert from "../../common/MessageAlert";

function PlaceOrder() {
  const [formData, setFormData] = useState({
    tradingsymbol: "",
    transaction_type: "BUY",
    quantity: "",
    order_type: "LIMIT",
    product: "CNC",
    price: "",
    trigger_price: "",
    validity: "DAY",
    variety: "regular",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        setMessage(`Order placed successfully! Order ID: ${result.order_id}`);
        setFormData({
          tradingsymbol: "",
          transaction_type: "BUY",
          quantity: "",
          order_type: "LIMIT",
          product: "CNC",
          price: "",
          trigger_price: "",
          validity: "DAY",
          variety: "regular",
        });
      } else {
        setMessage(`Error: ${result.message}`);
      }
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      tradingsymbol: "",
      transaction_type: "BUY",
      quantity: "",
      order_type: "LIMIT",
      product: "CNC",
      price: "",
      trigger_price: "",
      validity: "DAY",
      variety: "regular",
    });
    setMessage("");
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <OrderHeader title="Place Order" subtitle="Create a new trading order" />

      {message && <MessageAlert message={message} />}

      <div className="bg-white rounded-lg shadow-md p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Stock Symbol */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Stock Symbol
              </label>
              <input
                type="text"
                name="tradingsymbol"
                value={formData.tradingsymbol}
                onChange={handleInputChange}
                placeholder="eg. ITC, RELIANCE"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            {/* Transaction Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Transaction Type
              </label>
              <select
                name="transaction_type"
                value={formData.transaction_type}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="BUY">BUY</option>
                <option value="SELL">SELL</option>
              </select>
            </div>

            {/* Quantity */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Quantity
              </label>
              <input
                type="number"
                name="quantity"
                value={formData.quantity}
                min="1"
                step="1"
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            {/* Product Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Product Type
              </label>
              <select
                name="product"
                value={formData.product}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="CNC">CNC (Cash & Carry)</option>
                <option value="MIS">MIS (Intraday)</option>
                <option value="NRML">NRML (Normal)</option>
              </select>
            </div>

            {/* Order Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Order Type
              </label>
              <select
                name="order_type"
                value={formData.order_type}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="LIMIT">LIMIT</option>
                <option value="MARKET">MARKET</option>
                <option value="SL">STOP LOSS</option>
                <option value="SL-M">SL-MARKET</option>
              </select>
            </div>

            {/* Order Variety */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Order Variety
              </label>
              <select
                name="variety"
                value={formData.variety}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="regular">Regular</option>
                <option value="amo">AMO (After Market Order)</option>
                <option value="co">Cover Order</option>
                <option value="bo">Bracket Order</option>
              </select>
            </div>

            {/* Validity */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Validity
              </label>
              <select
                name="validity"
                value={formData.validity}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="DAY">DAY</option>
                <option value="IOC">IOC (Immediate or Cancel)</option>
                <option value="TTL">TTL (Till Triggered)</option>
              </select>
            </div>

            {/* Price - show only for LIMIT and SL orders */}
            {(formData.order_type === "LIMIT" ||
              formData.order_type === "SL") && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Price (₹)
                </label>
                <input
                  type="number"
                  step="0.05"
                  min="0.05"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  placeholder="Enter price"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
            )}

            {/* Trigger Price - show only for SL and SL-M orders */}
            {(formData.order_type === "SL" ||
              formData.order_type === "SL-M") && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Trigger Price (₹)
                </label>
                <input
                  type="number"
                  step="0.05"
                  min="0.05"
                  name="trigger_price"
                  value={formData.trigger_price}
                  onChange={handleInputChange}
                  placeholder="Enter trigger price"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={resetForm}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-colors duration-200"
            >
              Reset
            </button>

            <button
              type="submit"
              disabled={loading}
              className={`px-6 py-2 rounded-lg font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                loading
                  ? "bg-gray-400 text-gray-200 cursor-not-allowed"
                  : formData.transaction_type === "BUY"
                  ? "bg-green-600 text-white hover:bg-green-700 focus:ring-green-500"
                  : "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500"
              }`}
            >
              {loading ? (
                <div className="flex items-center">
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Placing Order...
                </div>
              ) : (
                `Place ${formData.transaction_type} Order`
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PlaceOrder;
