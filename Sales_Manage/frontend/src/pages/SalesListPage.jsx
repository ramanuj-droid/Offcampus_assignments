import React, { useEffect, useState } from "react";
import SalesTable from "../components/SalesTable";
import PaginationControls from "../components/PaginationControls";
import FiltersPanel from "../components/FiltersPanel";
import SearchBar from "../components/SearchBar";
import SortDropdown from "../components/SortDropdown";
import { fetchSales } from "../services/api";

export default function SalesListPage() {
  const [salesData, setSalesData] = useState([]);
  const [filters, setFilters] = useState({});
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState({ field: "date", order: "desc" });
  const [pagination, setPagination] = useState({ page: 1, totalPages: 1 });
  const [totals, setTotals] = useState({ units: 0, amount: 0, discount: 0 });

  const loadSales = async () => {
    const response = await fetchSales({
      filters,
      search,
      sort,
      page: pagination.page,
    });

    setSalesData(response.data);
    setPagination(prev => ({ ...prev, totalPages: response.meta.totalPages }));

    const units = response.data.reduce((acc, s) => acc + (s.quantity || 0), 0);
    const amount = response.data.reduce((acc, s) => acc + (s.finalAmount || 0), 0);
    const discount = response.data.reduce((acc, s) => acc + ((s.totalAmount || 0) - (s.finalAmount || 0)), 0);
    setTotals({ units, amount, discount });
  };

  useEffect(() => {
    loadSales();
  }, [filters, search, sort, pagination.page]);

  return (
    <div className="p-4 flex flex-col gap-4">
      {/* Title */}
      <h1 className="text-3xl font-bold">Sales Management System</h1>

      {/* Search Bar */}
      <SearchBar search={search} setSearch={setSearch} />

      {/* Filters Navbar */}
      <FiltersPanel filters={filters} setFilters={setFilters} horizontal />

      {/* Stats Navbar */}
      <div className="flex gap-4">
        <div className="flex-1 bg-white border p-4 rounded shadow text-center">
          <h2 className="font-semibold">Total Units Sold</h2>
          <p className="text-xl">{totals.units}</p>
        </div>
        <div className="flex-1 bg-white border p-4 rounded shadow text-center">
          <h2 className="font-semibold">Total Amount</h2>
          <p className="text-xl">{totals.amount} rupees</p>
        </div>
        <div className="flex-1 bg-white border p-4 rounded shadow text-center">
          <h2 className="font-semibold">Total Discount</h2>
          <p className="text-xl">{totals.discount} rupees</p>
        </div>
      </div>

      {/* Sort Dropdown */}
      <div className="flex justify-end mb-2">
        <SortDropdown sort={sort} setSort={setSort} />
      </div>

      {/* Sales Table + Pagination */}
      <SalesTable data={salesData} sort={sort} setSort={setSort} />
      <PaginationControls pagination={pagination} setPagination={setPagination} />
    </div>
  );
}
