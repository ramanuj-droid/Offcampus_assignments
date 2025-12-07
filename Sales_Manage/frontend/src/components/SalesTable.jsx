import React from "react";

export default function SalesTable({ data, sort, setSort }) {
  const handleSort = field => {
    setSort(prev => ({
      field,
      order: prev.order === "asc" ? "desc" : "asc",
    }));
  };

  return (
    <table className="w-full table-auto border-collapse">
      <thead>
        <tr>
          <th className="border p-2 cursor-pointer" onClick={() => handleSort("date")}>
            Date {sort.field === "date" ? (sort.order === "asc" ? "↑" : "↓") : ""}
          </th>
          <th className="border p-2">Customer Name</th>
          <th className="border p-2">Phone</th>
          <th className="border p-2">Product</th>
          <th className="border p-2 cursor-pointer" onClick={() => handleSort("quantity")}>
            Quantity {sort.field === "quantity" ? (sort.order === "asc" ? "↑" : "↓") : ""}
          </th>
          <th className="border p-2">Final Amount</th>
          <th className="border p-2">Payment Method</th>
          <th className="border p-2">Order Status</th>
        </tr>
      </thead>
      <tbody>
        {data.length === 0 ? (
          <tr>
            <td colSpan="8" className="text-center p-4">No records found</td>
          </tr>
        ) : (
          data.map((sale, idx) => (
            <tr key={idx} className="hover:bg-gray-100">
              <td className="border p-2">{sale?.Date || sale?.date || ""}</td>
              <td className="border p-2">{sale?.["Customer Name"] || sale?.customer?.name || ""}</td>
              <td className="border p-2">{sale?.["Phone Number"] || sale?.customer?.phone || ""}</td>
              <td className="border p-2">{sale?.["Product Name"] || sale?.product?.name || ""}</td>
              <td className="border p-2">{sale?.Quantity || sale?.order?.quantity || ""}</td>
              <td className="border p-2">{sale?.["Final Amount"] || sale?.order?.finalAmount || ""}</td>
              <td className="border p-2">{sale?.["Payment Method"] || sale?.order?.paymentMethod || ""}</td>
              <td className="border p-2">{sale?.["Order Status"] || sale?.order?.orderStatus || ""}</td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
}
