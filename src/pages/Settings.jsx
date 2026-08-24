import { useEffect, useState } from "react";
import { useTheme } from "../context/ThemeContext";

const defaultProfile = {
  name: "Admin User",
  email: "admin@analytix.com",
  bio: "Analytics dashboard administrator.",
};

function Settings() {
  const { darkMode, toggleTheme } = useTheme();

  // =========================
  // GENERAL SETTINGS
  // =========================

  const [compactSidebar, setCompactSidebar] = useState(() => {
    return localStorage.getItem("compactSidebar") === "true";
  });

  const [animations, setAnimations] = useState(() => {
    return localStorage.getItem("animations") !== "false";
  });

  // =========================
  // NOTIFICATIONS
  // =========================

  const [dashboardAlerts, setDashboardAlerts] = useState(() => {
    return localStorage.getItem("dashboardAlerts") !== "false";
  });

  const [weeklyReports, setWeeklyReports] = useState(() => {
    return localStorage.getItem("weeklyReports") !== "false";
  });

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

  const [savedMessage, setSavedMessage] = useState("");

  // =========================
  // SAVE GENERAL SETTINGS
  // =========================

  useEffect(() => {
    localStorage.setItem("compactSidebar", String(compactSidebar));
  }, [compactSidebar]);

  useEffect(() => {
    localStorage.setItem("animations", String(animations));
  }, [animations]);

  useEffect(() => {
    localStorage.setItem("dashboardAlerts", String(dashboardAlerts));
  }, [dashboardAlerts]);

  useEffect(() => {
    localStorage.setItem("weeklyReports", String(weeklyReports));
  }, [weeklyReports]);

  // =========================
  // SMOOTH SCROLL
  // =========================

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);

    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  // =========================
  // PROFILE CHANGE
  // =========================

  const handleProfileChange = (event) => {
    const { name, value } = event.target;

    setProfile((current) => ({
      ...current,
      [name]: value,
    }));
  };

  // =========================
  // SAVE PROFILE
  // =========================

  const saveProfile = () => {
    localStorage.setItem("analytixProfile", JSON.stringify(profile));

    setSavedMessage("Profile changes saved successfully.");

    setTimeout(() => {
      setSavedMessage("");
    }, 2500);
  };

  // =========================
  // CANCEL PROFILE
  // =========================

  const cancelProfile = () => {
    try {
      const savedProfile = localStorage.getItem("analytixProfile");

      setProfile(savedProfile ? JSON.parse(savedProfile) : defaultProfile);
    } catch {
      setProfile(defaultProfile);
    }

    setSavedMessage("Changes discarded.");

    setTimeout(() => {
      setSavedMessage("");
    }, 2000);
  };

  // =========================
  // THEME
  // =========================

  const currentTheme = darkMode ? "dark" : "light";

  const handleThemeChange = (selectedTheme) => {
    if (selectedTheme === "dark") {
      if (!darkMode) {
        toggleTheme();
      }

      localStorage.setItem("theme", "dark");
      return;
    }

    if (selectedTheme === "light") {
      if (darkMode) {
        toggleTheme();
      }

      localStorage.setItem("theme", "light");
      return;
    }

    if (selectedTheme === "system") {
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)",
      ).matches;

      if (prefersDark !== darkMode) {
        toggleTheme();
      }

      localStorage.setItem("theme", prefersDark ? "dark" : "light");
    }
  };

  return (
    <div className="settings-page">
      {/* =========================
          PAGE HEADER
      ========================= */}

      <div className="page-heading">
        <div>
          <p className="eyebrow">PREFERENCES</p>

          <h1>Settings</h1>

          <p>Manage your dashboard preferences and account settings.</p>
        </div>
      </div>

      {/* =========================
          SETTINGS LAYOUT
      ========================= */}

      <div className="settings-layout">
        {/* =========================
            LEFT NAVIGATION
        ========================= */}

        <aside className="settings-nav">
          <button
            type="button"
            className="settings-nav-item"
            onClick={() => scrollToSection("general-settings")}
          >
            <span>⚙</span>
            General
          </button>

          <button
            type="button"
            className="settings-nav-item"
            onClick={() => scrollToSection("appearance-settings")}
          >
            <span>◐</span>
            Appearance
          </button>

          <button
            type="button"
            className="settings-nav-item"
            onClick={() => scrollToSection("notification-settings")}
          >
            <span>♢</span>
            Notifications
          </button>
        </aside>

        {/* =========================
            SETTINGS CONTENT
        ========================= */}

        <div className="settings-content">
          {/* =========================
              APPEARANCE
          ========================= */}

          <section id="appearance-settings" className="settings-card">
            <div className="settings-card-header">
              <h2>Appearance</h2>

              <p>Customize how Analytix looks on your screen.</p>
            </div>

            <div className="theme-options">
              {/* LIGHT */}

              <button
                type="button"
                className={`theme-option ${
                  currentTheme === "light" ? "selected" : ""
                }`}
                onClick={() => handleThemeChange("light")}
              >
                <div className="theme-preview light-preview">
                  <div className="preview-sidebar"></div>

                  <div className="preview-content">
                    <div></div>
                    <div></div>
                    <div></div>
                  </div>
                </div>

                <div className="theme-option-info">
                  <strong>Light</strong>

                  <span>Clean and bright interface</span>
                </div>

                {currentTheme === "light" && (
                  <div className="theme-radio">✓</div>
                )}
              </button>

              {/* DARK */}

              <button
                type="button"
                className={`theme-option ${
                  currentTheme === "dark" ? "selected" : ""
                }`}
                onClick={() => handleThemeChange("dark")}
              >
                <div className="theme-preview dark-preview">
                  <div className="preview-sidebar"></div>

                  <div className="preview-content">
                    <div></div>
                    <div></div>
                    <div></div>
                  </div>
                </div>

                <div className="theme-option-info">
                  <strong>Dark</strong>

                  <span>Comfortable for low-light environments</span>
                </div>

                {currentTheme === "dark" && (
                  <div className="theme-radio">✓</div>
                )}
              </button>

              {/* SYSTEM */}

              <button
                type="button"
                className="theme-option"
                onClick={() => handleThemeChange("system")}
              >
                <div className="theme-preview system-preview">
                  <div className="preview-sidebar"></div>

                  <div className="preview-content">
                    <div></div>
                    <div></div>
                    <div></div>
                  </div>
                </div>

                <div className="theme-option-info">
                  <strong>System</strong>

                  <span>Follow your device preference</span>
                </div>
              </button>
            </div>
          </section>

          {/* =========================
              GENERAL
          ========================= */}

          <section id="general-settings" className="settings-card">
            <div className="settings-card-header">
              <h2>General</h2>

              <p>Manage general dashboard preferences.</p>
            </div>

            {/* COMPACT SIDEBAR */}

            <div className="setting-row">
              <div>
                <strong>Compact sidebar</strong>

                <span>Use a smaller navigation sidebar.</span>
              </div>

              <label className="switch">
                <input
                  type="checkbox"
                  checked={compactSidebar}
                  onChange={(event) => setCompactSidebar(event.target.checked)}
                />

                <span></span>
              </label>
            </div>

            {/* ANIMATIONS */}

            <div className="setting-row">
              <div>
                <strong>Animations</strong>

                <span>Enable interface animations and transitions.</span>
              </div>

              <label className="switch">
                <input
                  type="checkbox"
                  checked={animations}
                  onChange={(event) => setAnimations(event.target.checked)}
                />

                <span></span>
              </label>
            </div>
          </section>

          {/* =========================
              NOTIFICATIONS
          ========================= */}

          <section id="notification-settings" className="settings-card">
            <div className="settings-card-header">
              <h2>Notifications</h2>

              <p>Choose which notifications you want to receive.</p>
            </div>

            {/* DASHBOARD ALERTS */}

            <div className="setting-row">
              <div>
                <strong>Dashboard alerts</strong>

                <span>Receive important dashboard updates.</span>
              </div>

              <label className="switch">
                <input
                  type="checkbox"
                  checked={dashboardAlerts}
                  onChange={(event) => setDashboardAlerts(event.target.checked)}
                />

                <span></span>
              </label>
            </div>

            {/* WEEKLY REPORTS */}

            <div className="setting-row">
              <div>
                <strong>Weekly reports</strong>

                <span>Receive your weekly analytics summary.</span>
              </div>

              <label className="switch">
                <input
                  type="checkbox"
                  checked={weeklyReports}
                  onChange={(event) => setWeeklyReports(event.target.checked)}
                />

                <span></span>
              </label>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default Settings;
