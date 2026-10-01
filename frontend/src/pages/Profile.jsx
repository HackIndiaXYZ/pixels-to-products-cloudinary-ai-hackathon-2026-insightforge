import { useState } from "react";
import BackButton from "../components/BackButton";

function Profile() {
  const [editing, setEditing] = useState(false);

  const [profile, setProfile] = useState({
    name: "Marketing Team",
    email: "team@insightforge.ai",
    role: "Marketing Analyst",
    organization: "InsightForge",
  });

  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="profile-page">

      <BackButton />

      <div className="profile-page-header">

        <div>
          <p className="section-label">
            ACCOUNT
          </p>

          <h1>
            My Profile
          </h1>

          <p>
            Manage your InsightForge account information.
          </p>
        </div>

        <button
          className="secondary-button"
          onClick={() => {
            window.location.href = "/";
          }}
        >
          Back to Dashboard
        </button>

      </div>


      <div className="profile-card">

        <div className="profile-large-avatar">
          {profile.name.charAt(0).toUpperCase()}
        </div>


        <div className="profile-info">

          <div className="profile-field">
            <label>
              Full Name
            </label>

            {editing ? (
              <input
                name="name"
                value={profile.name}
                onChange={handleChange}
              />
            ) : (
              <p>{profile.name}</p>
            )}
          </div>


          <div className="profile-field">
            <label>
              Email
            </label>

            {editing ? (
              <input
                name="email"
                type="email"
                value={profile.email}
                onChange={handleChange}
              />
            ) : (
              <p>{profile.email}</p>
            )}
          </div>


          <div className="profile-field">
            <label>
              Role
            </label>

            {editing ? (
              <input
                name="role"
                value={profile.role}
                onChange={handleChange}
              />
            ) : (
              <p>{profile.role}</p>
            )}
          </div>


          <div className="profile-field">
            <label>
              Organization
            </label>

            {editing ? (
              <input
                name="organization"
                value={profile.organization}
                onChange={handleChange}
              />
            ) : (
              <p>{profile.organization}</p>
            )}
          </div>

        </div>


        <div className="profile-actions">

          {editing ? (
            <>
              <button
                className="primary-button"
                onClick={() => setEditing(false)}
              >
                Save Changes
              </button>

              <button
                className="secondary-button"
                onClick={() => setEditing(false)}
              >
                Cancel
              </button>
            </>
          ) : (
            <>
              <button
                className="primary-button"
                onClick={() => setEditing(true)}
              >
                Edit Profile
              </button>

              <button
                className="secondary-button"
                onClick={() => {
                  window.location.href = "/settings";
                }}
              >
                Account Settings
              </button>
            </>
          )}

        </div>

      </div>

    </div>
  );
}

export default Profile;