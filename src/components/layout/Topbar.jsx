import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";

function Topbar() {
  const { darkMode, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const searchInputRef = useRef(null);

  // =========================
  // SEARCH PAGES
  // =========================

  const searchPages = [
    {
      keywords: ["dashboard", "home"],
      path: "/dashboard",
    },
    {
      keywords: ["analytics", "analysis"],
      path: "/analytics",
    },
    {
      keywords: ["data", "database"],
      path: "/data",
    },
    {
      keywords: ["report", "reports"],
      path: "/reports",
    },
    {
      keywords: ["user", "users"],
      path: "/users",
    },
    {
      keywords: ["activity", "activities"],
      path: "/activity",
    },
    {
      keywords: ["setting", "settings"],
      path: "/settings",
    },
    {
      keywords: ["profile", "admin", "account"],
      path: "/profile",
    },
  ];

  // =========================
  // PERFORM SEARCH
  // =========================

  const performSearch = () => {
    const query = search.toLowerCase().trim();

    if (!query) return;

    const result = searchPages.find((page) =>
      page.keywords.some((keyword) => query.includes(keyword)),
    );

    if (result) {
      navigate(result.path);
      setSearch("");
    }
  };

  // =========================
  // ENTER KEY
  // =========================

  const handleSearchKeyDown = (event) => {
    if (event.key === "Enter") {
      performSearch();
    }
  };

  // =========================
  // CTRL + K
  // =========================

  useEffect(() => {
    const handleShortcut = (event) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();

        searchInputRef.current?.focus();
      }
    };

    window.addEventListener("keydown", handleShortcut);

    return () => {
      window.removeEventListener("keydown", handleShortcut);
    };
  }, []);

  return (
    <header className="topbar">
      {/* =========================
          SEARCH
      ========================= */}

      <div className="search-box">
        <span className="search-icon">⌕</span>

        <input
          ref={searchInputRef}
          type="text"
          placeholder="Search anything..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          onKeyDown={handleSearchKeyDown}
        />

        <kbd>Ctrl K</kbd>
      </div>

      {/* =========================
          RIGHT SIDE
      ========================= */}

      <div className="topbar-actions">
        {/* Theme Toggle */}

        <button
          type="button"
          className="theme-toggle"
          onClick={toggleTheme}
          aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
          title={darkMode ? "Switch to light mode" : "Switch to dark mode"}
        >
          {darkMode ? "☀" : "☾"}
        </button>

        {/* Notifications */}

        <button
          type="button"
          className="icon-button"
          aria-label="Notifications"
        >
          ♢<span className="notification-dot"></span>
        </button>

        {/* Profile */}

        <div
          className="topbar-profile"
          onClick={() => navigate("/profile")}
          title="Open Profile"
          role="button"
          tabIndex="0"
        >
          <div className="user-avatar">A</div>

          <div className="profile-info">
            <strong>Admin User</strong>
            <span>Administrator</span>
          </div>

          <span className="profile-arrow">⌄</span>
        </div>
      </div>
    </header>
  );
}

export default Topbar;
