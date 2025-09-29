import React from "react";

function TableHeader() {
  return (
    <thead className="bg-gray-50">
      <tr>
        {[
          "Symbol",
          "Type",
          "Quantity",
          "Order Type",
          "Price",
          "Status",
          "Time",
          "Actions",
        ].map((header) => (
          <th key={header} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            {header}
          </th>
        ))}
      </tr>
    </thead>
  );
}

export default TableHeader;
