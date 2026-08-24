import { useState } from "react";

const defaultProfile = {
  name: "Admin User",
  email: "admin@analytix.com",
  role: "Administrator",
  bio: "Analytics dashboard administrator.",
};

function Profile() {
  const [profile, setProfile] = useState(() => {
    try {
      const savedProfile = localStorage.getItem("analytixProfile");

      return savedProfile ? JSON.parse(savedProfile) : defaultProfile;
    } catch {
      return defaultProfile;
    }
  });

  const [savedMessage, setSavedMessage] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;

    setProfile((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const saveProfile = () => {
    try {
      localStorage.setItem("analytixProfile", JSON.stringify(profile));

      setSavedMessage("Profile changes saved successfully.");

      setTimeout(() => {
        setSavedMessage("");
      }, 2500);
    } catch (error) {
      console.error("Failed to save profile:", error);
      setSavedMessage("Failed to save profile changes.");
    }
  };

  const cancelChanges = () => {
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

  return (
    <div className="profile-page">
      {/* Page Heading */}
      <div className="page-heading">
        <div>
          <p className="eyebrow">ACCOUNT</p>

          <h1>My Profile</h1>

          <p>Manage your personal information and account details.</p>
        </div>
      </div>

      {/* Profile Card */}
      <div className="profile-card">
        {/* Profile Header */}
        <div className="profile-card-header">
          <div className="profile-avatar-large">
            {profile.name ? profile.name.charAt(0).toUpperCase() : "A"}
          </div>

          <div>
            <h2>{profile.name}</h2>
            <p>{profile.role}</p>
          </div>
        </div>

        {/* Profile Form */}
        <div className="profile-form">
          <div className="form-row">
            <div className="form-group">
              <label>Full Name</label>

              <input
                type="text"
                name="name"
                value={profile.name}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Role</label>

              <input type="text" value={profile.role} disabled readOnly />
            </div>
          </div>

          <div className="form-group">
            <label>Email Address</label>

            <input
              type="email"
              name="email"
              value={profile.email}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Bio</label>

            <textarea
              rows="4"
              name="bio"
              value={profile.bio}
              onChange={handleChange}
            />
          </div>

          {savedMessage && (
            <div className="settings-save-message">{savedMessage}</div>
          )}

          <div className="profile-actions">
            <button
              type="button"
              className="secondary-button"
              onClick={cancelChanges}
            >
              Cancel
            </button>

            <button
              type="button"
              className="primary-button"
              onClick={saveProfile}
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
