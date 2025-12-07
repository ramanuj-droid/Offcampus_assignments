import React from "react";

export default function FiltersPanel({ filters, setFilters, horizontal }) {
  function update(field, value) {
    setFilters(prev => ({ ...prev, [field]: value }));
  }

  return (
    <div className={`${
      horizontal ? "flex flex-wrap gap-4 mb-4" : "grid grid-cols-3 gap-4"
    } bg-white p-4 rounded shadow`}>
      
      {/* Customer Region */}
      <select
        className="border p-2"
        value={filters.region || ""}
        onChange={(e) => update("region", e.target.value)}
      >
        <option value="">All Regions</option>
        <option value="North">North</option>
        <option value="South">South</option>
        <option value="East">East</option>
        <option value="West">West</option>
      </select>

      {/* Gender */}
      <select
        className="border p-2"
        value={filters.gender || ""}
        onChange={(e) => update("gender", e.target.value)}
      >
        <option value="">All Genders</option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
      </select>

      {/* Product Category */}
      <select
        className="border p-2"
        value={filters.category || ""}
        onChange={(e) => update("category", e.target.value)}
      >
        <option value="">All Categories</option>
        <option value="Electronics">Electronics</option>
        <option value="Clothing">Clothing</option>
        <option value="Furniture">Furniture</option>
      </select>

      {/* Payment Method */}
      <select
        className="border p-2"
        value={filters.payment || ""}
        onChange={(e) => update("payment", e.target.value)}
      >
        <option value="">All Payment Methods</option>
        <option value="UPI">UPI</option>
        <option value="Cash">Cash</option>
        <option value="Credit Card">Credit Card</option>
      </select>

      {/* Date From */}
      <input
        type="date"
        className="border p-2"
        value={filters.date_from || ""}
        onChange={(e) => update("date_from", e.target.value)}
      />

      {/* Date To */}
      <input
        type="date"
        className="border p-2"
        value={filters.date_to || ""}
        onChange={(e) => update("date_to", e.target.value)}
      />
    </div>
  );
}
