import { useMemo, useRef, useState } from "react";

const initialData = [
  {
    id: 1,
    name: "Ali Raza",
    email: "ali@example.com",
    revenue: 12450,
    status: "Active",
    department: "Sales",
  },
  {
    id: 2,
    name: "Sara Ahmed",
    email: "sara@example.com",
    revenue: 9820,
    status: "Active",
    department: "Marketing",
  },
  {
    id: 3,
    name: "Usman Khan",
    email: "usman@example.com",
    revenue: 7640,
    status: "Pending",
    department: "Operations",
  },
  {
    id: 4,
    name: "Ayesha Malik",
    email: "ayesha@example.com",
    revenue: 15320,
    status: "Active",
    department: "Sales",
  },
  {
    id: 5,
    name: "Hamza Ali",
    email: "hamza@example.com",
    revenue: 5420,
    status: "Inactive",
    department: "Support",
  },
  {
    id: 6,
    name: "Hina Shah",
    email: "hina@example.com",
    revenue: 11800,
    status: "Active",
    department: "Marketing",
  },
  {
    id: 7,
    name: "Ahmed Hassan",
    email: "ahmed@example.com",
    revenue: 8750,
    status: "Pending",
    department: "Operations",
  },
  {
    id: 8,
    name: "Maham Tariq",
    email: "maham@example.com",
    revenue: 13400,
    status: "Active",
    department: "Sales",
  },
];

function DataTable({
  data,
  setData,
  showAddModal,
  setShowAddModal,
  showImportModal,
  setShowImportModal,
}) {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");
  const [department, setDepartment] = useState("All");

  const [sortConfig, setSortConfig] = useState([
    {
      key: "name",
      direction: "asc",
    },
  ]);

  const [form, setForm] = useState({
    name: "",
    email: "",
    revenue: "",
    status: "Active",
    department: "Sales",
  });

  const [selectedFile, setSelectedFile] = useState(null);

  const fileInputRef = useRef(null);

  // =========================
  // MULTI COLUMN SORT
  // =========================

  const handleSort = (key) => {
    setSortConfig((current) => {
      const existingIndex = current.findIndex((sort) => sort.key === key);

      if (existingIndex === -1) {
        return [
          ...current,
          {
            key,
            direction: "asc",
          },
        ];
      }

      const existing = current[existingIndex];

      if (existing.direction === "asc") {
        const updated = [...current];

        updated[existingIndex] = {
          ...existing,
          direction: "desc",
        };

        return updated;
      }

      return current.filter((sort) => sort.key !== key);
    });
  };

  // =========================
  // FILTER + SEARCH + SORT
  // =========================

  const filteredData = useMemo(() => {
    let result = [...data];

    if (search.trim()) {
      const query = search.toLowerCase().trim();

      result = result.filter(
        (item) =>
          item.name.toLowerCase().includes(query) ||
          item.email.toLowerCase().includes(query) ||
          item.department.toLowerCase().includes(query) ||
          item.status.toLowerCase().includes(query),
      );
    }

    if (status !== "All") {
      result = result.filter((item) => item.status === status);
    }

    if (department !== "All") {
      result = result.filter((item) => item.department === department);
    }

    result.sort((a, b) => {
      for (const sort of sortConfig) {
        const valueA = a[sort.key];
        const valueB = b[sort.key];

        let comparison = 0;

        if (typeof valueA === "number") {
          comparison = valueA - valueB;
        } else {
          comparison = String(valueA).localeCompare(String(valueB), undefined, {
            sensitivity: "base",
          });
        }

        if (comparison !== 0) {
          return sort.direction === "asc" ? comparison : -comparison;
        }
      }

      return 0;
    });

    return result;
  }, [data, search, status, department, sortConfig]);

  // =========================
  // SORT ICON
  // =========================

  const sortIcon = (key) => {
    const index = sortConfig.findIndex((sort) => sort.key === key);

    if (index === -1) {
      return <span className="sort-icon">↕</span>;
    }

    const sort = sortConfig[index];

    return (
      <span className="sort-indicator">
        {sort.direction === "asc" ? "↑" : "↓"}

        {sortConfig.length > 1 && <small>{index + 1}</small>}
      </span>
    );
  };

  // =========================
  // RESET SORTING
  // =========================

  const resetSorting = () => {
    setSortConfig([]);
  };

  // =========================
  // ADD RECORD
  // =========================

  const handleFormChange = (e) => {
    const { name, value } = e.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleAddRecord = (e) => {
    e.preventDefault();

    if (!form.name.trim() || !form.email.trim() || !form.revenue) {
      alert("Please fill in all required fields.");
      return;
    }

    const newRecord = {
      id: Date.now(),
      name: form.name.trim(),
      email: form.email.trim(),
      revenue: Number(form.revenue),
      status: form.status,
      department: form.department,
    };

    setData((current) => [newRecord, ...current]);

    setForm({
      name: "",
      email: "",
      revenue: "",
      status: "Active",
      department: "Sales",
    });

    setShowAddModal(false);
  };

  // =========================
  // IMPORT FILE
  // =========================

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const validTypes = [
      "text/csv",
      "application/vnd.ms-excel",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    ];

    const fileName = file.name.toLowerCase();

    const isValid =
      validTypes.includes(file.type) ||
      fileName.endsWith(".csv") ||
      fileName.endsWith(".xlsx");

    if (!isValid) {
      alert("Please select a CSV or XLSX file.");
      return;
    }

    setSelectedFile(file);
  };

  const handleImport = () => {
    if (!selectedFile) {
      alert("Please select a CSV or XLSX file first.");
      return;
    }

    alert(
      `${selectedFile.name} selected successfully. File import is ready for backend/CSV parsing.`,
    );

    setSelectedFile(null);
    setShowImportModal(false);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <>
      <div className="data-table-card">
        {/* =========================
            TOOLBAR
        ========================= */}

        <div className="table-toolbar">
          <div className="table-search">
            <span>⌕</span>

            <input
              type="text"
              placeholder="Search users..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="table-filters">
            <select value={status} onChange={(e) => setStatus(e.target.value)}>
              <option value="All">All Status</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
              <option value="Pending">Pending</option>
            </select>

            <select
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
            >
              <option value="All">All Departments</option>
              <option value="Sales">Sales</option>
              <option value="Marketing">Marketing</option>
              <option value="Operations">Operations</option>
              <option value="Support">Support</option>
            </select>

            {sortConfig.length > 0 && (
              <button className="reset-sort-button" onClick={resetSorting}>
                Clear Sort
              </button>
            )}
          </div>
        </div>

        {/* SUMMARY */}

        <div className="table-summary">
          Showing <strong>{filteredData.length}</strong> of{" "}
          <strong>{data.length}</strong> users
          {sortConfig.length > 0 && (
            <span className="sorting-info">
              {" "}
              • Sorted by{" "}
              {sortConfig.map((sort, index) => (
                <span key={sort.key}>
                  {index > 0 && ", "}
                  <strong>{sort.key}</strong>{" "}
                  {sort.direction === "asc" ? "↑" : "↓"}
                </span>
              ))}
            </span>
          )}
        </div>

        {/* TABLE */}

        <div className="table-wrapper">
          {filteredData.length > 0 ? (
            <table>
              <thead>
                <tr>
                  <th onClick={() => handleSort("name")}>
                    User {sortIcon("name")}
                  </th>

                  <th onClick={() => handleSort("department")}>
                    Department {sortIcon("department")}
                  </th>

                  <th onClick={() => handleSort("revenue")}>
                    Revenue {sortIcon("revenue")}
                  </th>

                  <th onClick={() => handleSort("status")}>
                    Status {sortIcon("status")}
                  </th>
                </tr>
              </thead>

              <tbody>
                {filteredData.map((user) => (
                  <tr key={user.id}>
                    <td>
                      <div className="table-user">
                        <div className="table-avatar">
                          {user.name.charAt(0)}
                        </div>

                        <div>
                          <strong>{user.name}</strong>
                          <span>{user.email}</span>
                        </div>
                      </div>
                    </td>

                    <td>{user.department}</td>

                    <td className="revenue-cell">
                      ${user.revenue.toLocaleString()}
                    </td>

                    <td>
                      <span
                        className={`status-badge ${user.status.toLowerCase()}`}
                      >
                        <span></span>
                        {user.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="no-results">
              No users found matching your filters.
            </div>
          )}
        </div>
      </div>

      {/* =========================
          ADD RECORD MODAL
      ========================= */}

      {showAddModal && (
        <div className="modal-overlay">
          <div className="modal-card">
            <div className="modal-header">
              <div>
                <h2>Add New Record</h2>
                <p>Add a new business record to your data.</p>
              </div>

              <button
                className="modal-close"
                onClick={() => setShowAddModal(false)}
              >
                ×
              </button>
            </div>

            <form className="record-form" onSubmit={handleAddRecord}>
              <div className="form-group">
                <label>Name *</label>

                <input
                  name="name"
                  value={form.name}
                  onChange={handleFormChange}
                  placeholder="Enter full name"
                />
              </div>

              <div className="form-group">
                <label>Email *</label>

                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleFormChange}
                  placeholder="Enter email"
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Revenue *</label>

                  <input
                    type="number"
                    name="revenue"
                    value={form.revenue}
                    onChange={handleFormChange}
                    placeholder="e.g. 12500"
                  />
                </div>

                <div className="form-group">
                  <label>Status</label>

                  <select
                    name="status"
                    value={form.status}
                    onChange={handleFormChange}
                  >
                    <option value="Active">Active</option>
                    <option value="Pending">Pending</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label>Department</label>

                <select
                  name="department"
                  value={form.department}
                  onChange={handleFormChange}
                >
                  <option value="Sales">Sales</option>
                  <option value="Marketing">Marketing</option>
                  <option value="Operations">Operations</option>
                  <option value="Support">Support</option>
                </select>
              </div>

              <div className="modal-actions">
                <button
                  type="button"
                  className="secondary-button"
                  onClick={() => setShowAddModal(false)}
                >
                  Cancel
                </button>

                <button type="submit" className="primary-button">
                  Add Record
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* =========================
          IMPORT MODAL
      ========================= */}

      {showImportModal && (
        <div className="modal-overlay">
          <div className="modal-card">
            <div className="modal-header">
              <div>
                <h2>Import Data</h2>
                <p>Upload a CSV or Excel file.</p>
              </div>

              <button
                className="modal-close"
                onClick={() => setShowImportModal(false)}
              >
                ×
              </button>
            </div>

            <div className="upload-box">
              <div className="upload-icon">↑</div>

              <strong>Upload your data file</strong>

              <span>CSV or XLSX files supported</span>

              <input
                ref={fileInputRef}
                type="file"
                accept=".csv,.xlsx"
                onChange={handleFileChange}
              />

              {selectedFile && (
                <span className="selected-file">
                  Selected: <strong>{selectedFile.name}</strong>
                </span>
              )}
            </div>

            <div className="modal-actions">
              <button
                className="secondary-button"
                onClick={() => setShowImportModal(false)}
              >
                Cancel
              </button>

              <button className="primary-button" onClick={handleImport}>
                Import Data
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default DataTable;
