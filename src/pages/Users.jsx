import { useMemo, useState } from "react";
import { usersData } from "../data/usersData";

function Users() {
  const [users, setUsers] = useState(usersData);

  const [search, setSearch] = useState("");
  const [role, setRole] = useState("all");
  const [status, setStatus] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);

  // Add User Modal
  const [showAddModal, setShowAddModal] = useState(false);

  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    role: "User",
    status: "Active",
    department: "Sales",
  });

  // Action Menu
  const [openActionId, setOpenActionId] = useState(null);

  const usersPerPage = 6;

  // =========================
  // FILTER USERS
  // =========================
  const filteredUsers = useMemo(() => {
    const query = search.trim().toLowerCase();

    return users.filter((user) => {
      const matchesSearch =
        !query ||
        user.name.toLowerCase().includes(query) ||
        user.email.toLowerCase().includes(query);

      const matchesRole = role === "all" || user.role.toLowerCase() === role;

      const matchesStatus =
        status === "all" || user.status.toLowerCase() === status;

      return matchesSearch && matchesRole && matchesStatus;
    });
  }, [users, search, role, status]);

  // =========================
  // PAGINATION
  // =========================
  const totalPages = Math.max(
    1,
    Math.ceil(filteredUsers.length / usersPerPage),
  );

  const safePage = Math.min(currentPage, totalPages);

  const startIndex = (safePage - 1) * usersPerPage;
  const endIndex = startIndex + usersPerPage;

  const currentUsers = filteredUsers.slice(startIndex, endIndex);

  // =========================
  // STATISTICS
  // =========================
  const totalUsers = users.length;

  const activeUsers = users.filter((user) => user.status === "Active").length;

  const pendingUsers = users.filter((user) => user.status === "Pending").length;

  const inactiveUsers = users.filter(
    (user) => user.status === "Inactive",
  ).length;

  // =========================
  // SEARCH / FILTER
  // =========================
  const handleSearch = (e) => {
    setSearch(e.target.value);
    setCurrentPage(1);
  };

  const handleRoleChange = (e) => {
    setRole(e.target.value);
    setCurrentPage(1);
  };

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
    setCurrentPage(1);
  };

  // =========================
  // ADD USER FORM
  // =========================
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setNewUser((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleAddUser = (e) => {
    e.preventDefault();

    if (!newUser.name.trim() || !newUser.email.trim()) {
      return;
    }

    const user = {
      id: Date.now(),
      name: newUser.name.trim(),
      email: newUser.email.trim(),
      role: newUser.role,
      status: newUser.status,
      department: newUser.department,
      revenue: 0,
      joined: new Date().toISOString().split("T")[0],
    };

    setUsers((current) => [user, ...current]);

    setNewUser({
      name: "",
      email: "",
      role: "User",
      status: "Active",
      department: "Sales",
    });

    setShowAddModal(false);
    setCurrentPage(1);
  };

  // =========================
  // DELETE USER
  // =========================
  const handleDeleteUser = (id) => {
    const user = users.find((item) => item.id === id);

    if (!user) return;

    const confirmed = window.confirm(
      `Are you sure you want to delete ${user.name}?`,
    );

    if (!confirmed) return;

    setUsers((current) => current.filter((item) => item.id !== id));

    setOpenActionId(null);
  };

  // =========================
  // TOGGLE USER STATUS
  // =========================
  const handleToggleStatus = (id) => {
    setUsers((current) =>
      current.map((user) => {
        if (user.id !== id) return user;

        return {
          ...user,
          status: user.status === "Active" ? "Inactive" : "Active",
        };
      }),
    );

    setOpenActionId(null);
  };

  // =========================
  // PAGINATION
  // =========================
  const goToPreviousPage = () => {
    setCurrentPage((page) => Math.max(page - 1, 1));
  };

  const goToNextPage = () => {
    setCurrentPage((page) => Math.min(page + 1, totalPages));
  };

  const goToPage = (page) => {
    setCurrentPage(page);
  };

  // =========================
  // RESET FORM
  // =========================
  const closeAddModal = () => {
    setShowAddModal(false);

    setNewUser({
      name: "",
      email: "",
      role: "User",
      status: "Active",
      department: "Sales",
    });
  };

  return (
    <div className="users-page">
      {/* =========================
          HEADING
      ========================= */}
      <div className="page-heading">
        <div>
          <p className="eyebrow">USERS</p>

          <h1>User Management</h1>

          <p>Manage users, roles and account activity.</p>
        </div>

        <button
          className="primary-button"
          onClick={() => setShowAddModal(true)}
        >
          + Add User
        </button>
      </div>

      {/* =========================
          USER STATISTICS
      ========================= */}
      <div className="user-stats-grid">
        <div className="user-stat-card">
          <span className="user-stat-icon">♙</span>

          <div>
            <span>Total Users</span>
            <strong>{totalUsers.toLocaleString()}</strong>
          </div>
        </div>

        <div className="user-stat-card">
          <span className="user-stat-icon">✓</span>

          <div>
            <span>Active Users</span>
            <strong>{activeUsers.toLocaleString()}</strong>
          </div>
        </div>

        <div className="user-stat-card">
          <span className="user-stat-icon">◷</span>

          <div>
            <span>Pending</span>
            <strong>{pendingUsers.toLocaleString()}</strong>
          </div>
        </div>

        <div className="user-stat-card">
          <span className="user-stat-icon">!</span>

          <div>
            <span>Inactive</span>
            <strong>{inactiveUsers.toLocaleString()}</strong>
          </div>
        </div>
      </div>

      {/* =========================
          USERS CARD
      ========================= */}
      <div className="users-card">
        {/* Toolbar */}
        <div className="users-toolbar">
          <div className="users-search">
            <span>⌕</span>

            <input
              type="text"
              placeholder="Search users..."
              value={search}
              onChange={handleSearch}
            />
          </div>

          <div className="users-filters">
            <select value={role} onChange={handleRoleChange}>
              <option value="all">All Roles</option>
              <option value="admin">Admin</option>
              <option value="manager">Manager</option>
              <option value="editor">Editor</option>
              <option value="executive">Executive</option>
              <option value="analyst">Analyst</option>
              <option value="specialist">Specialist</option>
              <option value="user">User</option>
            </select>

            <select value={status} onChange={handleStatusChange}>
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="pending">Pending</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        </div>

        {/* =========================
            TABLE
        ========================= */}
        <div className="users-table-wrapper">
          {currentUsers.length > 0 ? (
            <table className="users-table">
              <thead>
                <tr>
                  <th>User</th>
                  <th>Role</th>
                  <th>Status</th>
                  <th>Joined</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {currentUsers.map((user) => (
                  <tr key={user.id}>
                    {/* USER */}
                    <td>
                      <div className="user-table-info">
                        <div className="user-table-avatar">
                          {user.name
                            .split(" ")
                            .map((name) => name[0])
                            .join("")
                            .slice(0, 2)}
                        </div>

                        <div>
                          <strong>{user.name}</strong>
                          <span>{user.email}</span>
                        </div>
                      </div>
                    </td>

                    {/* ROLE */}
                    <td>
                      <span className="user-role">{user.role}</span>
                    </td>

                    {/* STATUS */}
                    <td>
                      <span
                        className={`user-status ${user.status.toLowerCase()}`}
                      >
                        <span></span>
                        {user.status}
                      </span>
                    </td>

                    {/* JOINED */}
                    <td>
                      <span className="joined-date">
                        {new Date(user.joined).toLocaleDateString("en-US", {
                          month: "short",
                          day: "2-digit",
                          year: "numeric",
                        })}
                      </span>
                    </td>

                    {/* ACTION */}
                    <td className="user-action-cell">
                      <button
                        className="user-action-button"
                        onClick={() =>
                          setOpenActionId(
                            openActionId === user.id ? null : user.id,
                          )
                        }
                        title="User actions"
                      >
                        ⋮
                      </button>

                      {openActionId === user.id && (
                        <div className="user-action-menu">
                          <button onClick={() => handleToggleStatus(user.id)}>
                            {user.status === "Active"
                              ? "Deactivate"
                              : "Activate"}
                          </button>

                          <button
                            className="danger-action"
                            onClick={() => handleDeleteUser(user.id)}
                          >
                            Delete User
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="no-results">
              <strong>No users found</strong>
              <span>Try changing your search or filters.</span>
            </div>
          )}
        </div>

        {/* =========================
            FOOTER
        ========================= */}
        <div className="users-footer">
          <span>
            Showing{" "}
            <strong>
              {filteredUsers.length === 0 ? 0 : startIndex + 1}–
              {Math.min(endIndex, filteredUsers.length)}
            </strong>{" "}
            of <strong>{filteredUsers.length}</strong> users
          </span>

          {filteredUsers.length > 0 && (
            <div className="pagination">
              <button onClick={goToPreviousPage} disabled={safePage === 1}>
                ←
              </button>

              {Array.from({ length: totalPages }, (_, index) => index + 1).map(
                (page) => (
                  <button
                    key={page}
                    className={safePage === page ? "active" : ""}
                    onClick={() => goToPage(page)}
                  >
                    {page}
                  </button>
                ),
              )}

              <button onClick={goToNextPage} disabled={safePage === totalPages}>
                →
              </button>
            </div>
          )}
        </div>
      </div>

      {/* =========================
          ADD USER MODAL
      ========================= */}
      {showAddModal && (
        <div className="modal-overlay" onClick={closeAddModal}>
          <div className="add-user-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div>
                <h2>Add New User</h2>
                <p>Create a new user account.</p>
              </div>

              <button
                className="modal-close"
                onClick={closeAddModal}
                type="button"
              >
                ×
              </button>
            </div>

            <form onSubmit={handleAddUser}>
              {/* Name */}
              <div className="form-group">
                <label>Full Name</label>

                <input
                  type="text"
                  name="name"
                  placeholder="Enter full name"
                  value={newUser.name}
                  onChange={handleInputChange}
                  required
                />
              </div>

              {/* Email */}
              <div className="form-group">
                <label>Email Address</label>

                <input
                  type="email"
                  name="email"
                  placeholder="Enter email address"
                  value={newUser.email}
                  onChange={handleInputChange}
                  required
                />
              </div>

              {/* Role + Status */}
              <div className="modal-form-row">
                <div className="form-group">
                  <label>Role</label>

                  <select
                    name="role"
                    value={newUser.role}
                    onChange={handleInputChange}
                  >
                    <option value="Admin">Admin</option>
                    <option value="Manager">Manager</option>
                    <option value="Editor">Editor</option>
                    <option value="Executive">Executive</option>
                    <option value="Analyst">Analyst</option>
                    <option value="Specialist">Specialist</option>
                    <option value="User">User</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Status</label>

                  <select
                    name="status"
                    value={newUser.status}
                    onChange={handleInputChange}
                  >
                    <option value="Active">Active</option>
                    <option value="Pending">Pending</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
              </div>

              {/* Department */}
              <div className="form-group">
                <label>Department</label>

                <select
                  name="department"
                  value={newUser.department}
                  onChange={handleInputChange}
                >
                  <option value="Sales">Sales</option>
                  <option value="Marketing">Marketing</option>
                  <option value="Operations">Operations</option>
                  <option value="Finance">Finance</option>
                  <option value="Support">Support</option>
                </select>
              </div>

              {/* Actions */}
              <div className="modal-actions">
                <button
                  type="button"
                  className="secondary-button"
                  onClick={closeAddModal}
                >
                  Cancel
                </button>

                <button type="submit" className="primary-button">
                  Add User
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Users;
