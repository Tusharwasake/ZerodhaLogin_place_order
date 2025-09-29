import React from "react";

function OrderRow({
  order,
  onCancel,
  getStatusStyle,
  formatDateTime,
  formatPrice,
}) {
  return (
    <tr className="hover:bg-gray-50 transition-colors">
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
        {order.tradingsymbol}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm">
        <span
          className={`font-medium ${
            order.transaction_type === "BUY" ? "text-green-600" : "text-red-600"
          }`}
        >
          {order.transaction_type}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
        {order.quantity}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
        {order.order_type}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
        {formatPrice(order.price || order.average_price)}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span
          className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusStyle(
            order.status
          )}`}
        >
          {order.status || "UNKNOWN"}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {formatDateTime(order.order_timestamp)}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
        {(order.status === "OPEN" || order.status === "PENDING") && (
          <button
            onClick={() => onCancel(order.order_id)}
            className="px-3 py-1 bg-red-600 text-white text-xs rounded hover:bg-red-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            Cancel
          </button>
        )}
      </td>
    </tr>
  );
}

export default OrderRow;
