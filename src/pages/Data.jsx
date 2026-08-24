import { useState } from "react";
import DataTable from "../components/dashboard/DataTable";

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

function Data() {
  const [data, setData] = useState(initialData);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showImportModal, setShowImportModal] = useState(false);

  // ========================================
  // ADD NEW RECORD
  // ========================================
  const handleAddRecord = (newRecord) => {
    setData((currentData) => [
      ...currentData,
      {
        ...newRecord,
        id:
          currentData.length > 0
            ? Math.max(...currentData.map((item) => item.id)) + 1
            : 1,
      },
    ]);

    setShowAddModal(false);
  };

  // ========================================
  // IMPORT CSV
  // ========================================
  const handleImport = (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const text = e.target.result;

        const lines = text
          .split("\n")
          .map((line) => line.trim())
          .filter(Boolean);

        if (lines.length < 2) {
          alert("CSV file is empty or invalid.");
          return;
        }

        const headers = lines[0]
          .split(",")
          .map((header) => header.trim().toLowerCase());

        const importedRecords = lines.slice(1).map((line, index) => {
          const values = line.split(",").map((value) => value.trim());

          const record = {};

          headers.forEach((header, i) => {
            record[header] = values[i] || "";
          });

          return {
            id: Date.now() + index,
            name: record.name || "Unknown User",
            email: record.email || "",
            revenue: Number(record.revenue) || 0,
            status: record.status || "Pending",
            department: record.department || "Sales",
          };
        });

        setData((currentData) => [...currentData, ...importedRecords]);

        setShowImportModal(false);

        alert(`${importedRecords.length} record(s) imported successfully.`);
      } catch (error) {
        console.error("Import error:", error);
        alert("Unable to import this CSV file.");
      }
    };

    reader.readAsText(file);

    // Allow selecting the same file again
    event.target.value = "";
  };

  // ========================================
  // DYNAMIC SUMMARY COUNTS
  // ========================================

  const totalRecords = data.length;

  const activeRecords = data.filter((item) => item.status === "Active").length;

  const pendingRecords = data.filter(
    (item) => item.status === "Pending",
  ).length;

  const inactiveRecords = data.filter(
    (item) => item.status === "Inactive",
  ).length;

  return (
    <div className="data-page">
      {/* ========================================
          PAGE HEADING
      ======================================== */}

      <div className="page-heading">
        <div>
          <p className="eyebrow">DATA MANAGEMENT</p>

          <h1>Business Data</h1>

          <p>View, manage and monitor your business records from one place.</p>
        </div>

        <div className="data-actions">
          {/* IMPORT */}

          <button
            className="secondary-button"
            onClick={() => setShowImportModal(true)}
          >
            Import
          </button>

          {/* ADD RECORD */}

          <button
            className="primary-button"
            onClick={() => setShowAddModal(true)}
          >
            + Add Record
          </button>
        </div>
      </div>

      {/* ========================================
          SUMMARY CARDS
      ======================================== */}

      <div className="data-summary-grid">
        {/* TOTAL */}

        <div className="data-summary-card">
          <span>Total Records</span>

          <strong>{totalRecords.toLocaleString()}</strong>

          <small>All business records</small>
        </div>

        {/* ACTIVE */}

        <div className="data-summary-card">
          <span>Active Records</span>

          <strong>{activeRecords.toLocaleString()}</strong>

          <small>
            {totalRecords > 0
              ? `${((activeRecords / totalRecords) * 100).toFixed(1)}% of total`
              : "0% of total"}
          </small>
        </div>

        {/* PENDING */}

        <div className="data-summary-card">
          <span>Pending</span>

          <strong>{pendingRecords.toLocaleString()}</strong>

          <small>Needs attention</small>
        </div>

        {/* INACTIVE */}

        <div className="data-summary-card">
          <span>Inactive</span>

          <strong>{inactiveRecords.toLocaleString()}</strong>

          <small>
            {totalRecords > 0
              ? `${((inactiveRecords / totalRecords) * 100).toFixed(1)}% of total`
              : "0% of total"}
          </small>
        </div>
      </div>

      {/* ========================================
          DATA TABLE
      ======================================== */}

      <DataTable data={data} />

      {/* ========================================
          ADD RECORD MODAL
      ======================================== */}

      {showAddModal && (
        <AddRecordModal
          onClose={() => setShowAddModal(false)}
          onAdd={handleAddRecord}
        />
      )}

      {/* ========================================
          IMPORT MODAL
      ======================================== */}

      {showImportModal && (
        <div className="modal-overlay">
          <div className="modal-card">
            <div className="modal-header">
              <div>
                <h2>Import Records</h2>

                <p>Import users from a CSV file.</p>
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

              <strong>Select CSV File</strong>

              <span>
                Required columns: name, email, revenue, status, department
              </span>

              <input type="file" accept=".csv" onChange={handleImport} />
            </div>

            <div className="modal-actions">
              <button
                className="secondary-button"
                onClick={() => setShowImportModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ========================================
   ADD RECORD MODAL
======================================== */

function AddRecordModal({ onClose, onAdd }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    revenue: "",
    status: "Active",
    department: "Sales",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!formData.name.trim() || !formData.email.trim() || !formData.revenue) {
      alert("Please fill in all required fields.");
      return;
    }

    onAdd({
      name: formData.name.trim(),
      email: formData.email.trim(),
      revenue: Number(formData.revenue),
      status: formData.status,
      department: formData.department,
    });
  };

  return (
    <div className="modal-overlay">
      <div className="modal-card">
        <div className="modal-header">
          <div>
            <h2>Add New Record</h2>

            <p>Add a new business record to your data.</p>
          </div>

          <button className="modal-close" onClick={onClose}>
            ×
          </button>
        </div>

        <form className="record-form" onSubmit={handleSubmit}>
          {/* NAME + EMAIL */}

          <div className="form-row">
            <div className="form-group">
              <label>Name</label>

              <input
                type="text"
                name="name"
                placeholder="Enter name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Email</label>

              <input
                type="email"
                name="email"
                placeholder="Enter email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* REVENUE + STATUS */}

          <div className="form-row">
            <div className="form-group">
              <label>Revenue</label>

              <input
                type="number"
                name="revenue"
                placeholder="Enter revenue"
                min="0"
                value={formData.revenue}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Status</label>

              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
              >
                <option value="Active">Active</option>
                <option value="Pending">Pending</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
          </div>

          {/* DEPARTMENT */}

          <div className="form-group">
            <label>Department</label>

            <select
              name="department"
              value={formData.department}
              onChange={handleChange}
            >
              <option value="Sales">Sales</option>
              <option value="Marketing">Marketing</option>
              <option value="Operations">Operations</option>
              <option value="Support">Support</option>
            </select>
          </div>

          {/* ACTIONS */}

          <div className="modal-actions">
            <button
              type="button"
              className="secondary-button"
              onClick={onClose}
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
  );
}

export default Data;
