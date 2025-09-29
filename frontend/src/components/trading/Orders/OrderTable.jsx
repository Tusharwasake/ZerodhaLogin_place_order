import React from "react";
import TableHeader from "../../TableHeader";
import OrderRow from "./OrderRow";

function OrderTable({
  orders,
  onCancel,
  getStatusStyle,
  formatDateTime,
  formatPrice,
}) {
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="p-4 border-b">
        <span className="text-sm text-gray-600">
          Total Orders:{" "}
          <span className="font-semibold text-gray-800">{orders.length}</span>
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <TableHeader />
          <tbody className="bg-white divide-y divide-gray-200">
            {orders.map((order, index) => (
              <OrderRow
                key={order.order_id || index}
                order={order}
                onCancel={onCancel}
                getStatusStyle={getStatusStyle}
                formatDateTime={formatDateTime}
                formatPrice={formatPrice}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default OrderTable;
