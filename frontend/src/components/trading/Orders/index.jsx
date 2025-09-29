import React, { useEffect, useState } from "react";
import LoadingSpinner from "../../layout/LoadingSpinner";
import MessageAlert from "../../common/MessageAlert";
import EmptyState from "../../common/EmptyState";
import OrderTable from "./OrderTable";
import OrderHeader from "./OrderHeader";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      setMessage("");
      const response = await fetch(`${import.meta.env.VITE_API_URL}/orders`);
      const result = await response.json();

      if (result.success) {
        setOrders(result.data || []);
      } else {
        setMessage(`Error: ${result.message}`);
      }
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const cancelOrder = async (orderId) => {
    if (!window.confirm("Are you sure you want to cancel this order?")) {
      return;
    }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/orders/${orderId}`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ variety: "regular" }),
        }
      );

      const result = await response.json();

      if (result.success) {
        setMessage("Order cancelled successfully");
        fetchOrders();
      } else {
        setMessage(`Cancel failed: ${result.message}`);
      }
    } catch (error) {
      setMessage(`Cancel error: ${error.message}`);
    }
  };

  const getStatusStyle = (status) => {
    switch (status?.toUpperCase()) {
      case "COMPLETE":
      case "EXECUTED":
        return "bg-green-100 text-green-800";
      case "OPEN":
      case "PENDING":
        return "bg-blue-100 text-blue-800";
      case "CANCELLED":
      case "CANCELED":
        return "bg-red-100 text-red-800";
      case "REJECTED":
        return "bg-orange-100 text-orange-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const formatDateTime = (timestamp) => {
    if (!timestamp) return "N/A";
    try {
      return new Date(timestamp).toLocaleString("en-IN", {
        dateStyle: "short",
        timeStyle: "short",
      });
    } catch {
      return "Invalid Date";
    }
  };

  const formatPrice = (price) => {
    if (!price || price === 0) return "Market";
    return `₹${parseFloat(price).toFixed(2)}`;
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <OrderHeader onRefresh={fetchOrders} />

      {message && <MessageAlert message={message} />}

      {orders.length === 0 ? 
        ( <EmptyState />) : 
        (
          <OrderTable
            orders={orders}
            onCancel={cancelOrder}
            getStatusStyle={getStatusStyle}
            formatDateTime={formatDateTime}
            formatPrice={formatPrice}
          />
        )
      }
    </div>
  );
}

export default Orders;
