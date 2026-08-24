import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

const defaultProfile = {
  name: "Admin User",
  email: "admin@analytix.com",
  role: "Administrator",
  bio: "Analytics dashboard administrator.",
};

function Sidebar() {
  const navigate = useNavigate();

  // =========================
  // PROFILE
  // =========================

  const [profile, setProfile] = useState(() => {
    try {
      const savedProfile = localStorage.getItem("analytixProfile");

      return savedProfile ? JSON.parse(savedProfile) : defaultProfile;
    } catch {
      return defaultProfile;
    }
  });

  // Update sidebar when profile is saved
  useEffect(() => {
    const handleProfileUpdate = () => {
      try {
        const savedProfile = localStorage.getItem("analytixProfile");

        setProfile(savedProfile ? JSON.parse(savedProfile) : defaultProfile);
      } catch {
        setProfile(defaultProfile);
      }
    };

    window.addEventListener("profileUpdated", handleProfileUpdate);

    return () => {
      window.removeEventListener("profileUpdated", handleProfileUpdate);
    };
  }, []);

  const mainItems = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: "▦",
    },
    {
      name: "Analytics",
      path: "/analytics",
      icon: "◈",
    },
    {
      name: "Data",
      path: "/data",
      icon: "▤",
    },
    {
      name: "Reports",
      path: "/reports",
      icon: "▥",
    },
  ];

  const managementItems = [
    {
      name: "Users",
      path: "/users",
      icon: "♙",
    },
    {
      name: "Activity",
      path: "/activity",
      icon: "◷",
    },
  ];

  return (
    <aside className="sidebar">
      {/* Logo */}
      <div className="brand">
        <div className="brand-icon">A</div>
        <span>Analytix</span>
      </div>

      {/* Navigation */}
      <nav className="sidebar-nav">
        {/* Main */}
        <p className="nav-label">MAIN</p>

        {mainItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`}
          >
            <span className="nav-icon">{item.icon}</span>
            <span>{item.name}</span>
          </NavLink>
        ))}

        {/* Management */}
        <p className="nav-label management-label">MANAGEMENT</p>

        {managementItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`}
          >
            <span className="nav-icon">{item.icon}</span>
            <span>{item.name}</span>
          </NavLink>
        ))}
      </nav>

      {/* Bottom */}
      <div className="sidebar-bottom">
        {/* Settings */}
        <NavLink
          to="/settings"
          className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`}
        >
          <span className="nav-icon">⚙</span>
          <span>Settings</span>
        </NavLink>

        {/* Admin Profile */}
        <div
          className="sidebar-user"
          onClick={() => navigate("/profile")}
          title="Open Profile"
          role="button"
          tabIndex={0}
          onKeyDown={(event) => {
            if (event.key === "Enter" || event.key === " ") {
              navigate("/profile");
            }
          }}
        >
          <div className="user-avatar">
            {profile.name ? profile.name.charAt(0).toUpperCase() : "A"}
          </div>

          <div className="user-details">
            <strong>{profile.name}</strong>
            <span>{profile.role}</span>
          </div>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
