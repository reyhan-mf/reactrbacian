import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Context from "../context/context";

function LoginPage() {
  const [selectedRole, setSelectedRole] = useState("");
  const navigate = useNavigate();
  const { login, authenticated, role, logout } = useContext(Context);

  // Debug logging
  console.log("LoginPage - authenticated:", authenticated, "role:", role);
  console.log("localStorage userRole:", localStorage.getItem("userRole"));
  console.log(
    "localStorage isAuthenticated:",
    localStorage.getItem("isAuthenticated")
  );

  useEffect(() => {
    if (authenticated && role) {
      console.log("Auto-redirecting to:", role);
      setTimeout(() => {
        if (role === "admin") navigate("/admin");
        else if (role === "editor") navigate("/editor");
        else if (role === "viewer") navigate("/viewer");
      }, 100);
    }
  }, [authenticated, role, navigate]);

  const handleLogin = () => {
    if (!selectedRole) {
      alert("Please select a role first!");
      return;
    }

    login(selectedRole);

    if (selectedRole === "admin") navigate("/admin");
    else if (selectedRole === "editor") navigate("/editor");
    else if (selectedRole === "viewer") navigate("/viewer");
    else navigate("/unauthorized");
  };

  const handleLogout = () => {
    logout();
  };

  const getRoleIcon = (role) => {
    switch (role) {
      case "admin":
        return (
          <div style={{ fontSize: "2rem", marginBottom: "0.3rem" }}>
            <svg
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{ color: "var(--primary)" }}
            >
              <path
                d="M12,15.5A3.5,3.5 0 0,1 8.5,12A3.5,3.5 0 0,1 12,8.5A3.5,3.5 0 0,1 15.5,12A3.5,3.5 0 0,1 12,15.5M19.43,12.97C19.47,12.65 19.5,12.33 19.5,12C19.5,11.67 19.47,11.34 19.43,11L21.54,9.37C21.73,9.22 21.78,8.95 21.66,8.73L19.66,5.27C19.54,5.05 19.27,4.96 19.05,5.05L16.56,6.05C16.04,5.66 15.5,5.32 14.87,5.07L14.5,2.42C14.46,2.18 14.25,2 14,2H10C9.75,2 9.54,2.18 9.5,2.42L9.13,5.07C8.5,5.32 7.96,5.66 7.44,6.05L4.95,5.05C4.73,4.96 4.46,5.05 4.34,5.27L2.34,8.73C2.22,8.95 2.27,9.22 2.46,9.37L4.57,11C4.53,11.34 4.5,11.67 4.5,12C4.5,12.33 4.53,12.65 4.57,12.97L2.46,14.63C2.27,14.78 2.22,15.05 2.34,15.27L4.34,18.73C4.46,18.95 4.73,19.03 4.95,18.95L7.44,17.94C7.96,18.34 8.5,18.68 9.13,18.93L9.5,21.58C9.54,21.82 9.75,22 10,22H14C14.25,22 14.46,21.82 14.5,21.58L14.87,18.93C15.5,18.68 16.04,18.34 16.56,17.94L19.05,18.95C19.27,19.03 19.54,18.95 19.66,18.73L21.66,15.27C21.78,15.05 21.73,14.78 21.54,14.63L19.43,12.97Z"
                fill="currentColor"
              />
            </svg>
          </div>
        );
      case "editor":
        return "✏️";
      case "viewer":
        return "👁️";
      default:
        return "👤";
    }
  };

  const getRoleDescription = (role) => {
    switch (role) {
      case "admin":
        return "Full access to all features and settings";
      case "editor":
        return "Edit, and manage content";
      case "viewer":
        return "View and read content only";
      default:
        return "";
    }
  };

  return (
    <div className="login-container">
      <div className="login-wrapper">
        {/* Main Login Card */}
        <div className="login-card">
          <div className="card">
            <div className="card-body p-4">
              <div className="text-center mb-3">
                <div className="mb-2">
                  <div
                    style={{
                      fontSize: "3rem",
                      background:
                        "linear-gradient(135deg, var(--primary) 0%, var(--primary-light) 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    🔐
                  </div>
                </div>
                <h2
                  className="mb-2"
                  style={{
                    fontWeight: "700",
                    fontSize: "1.8rem",
                    color: "var(--text-primary)",
                    fontFamily: "Poppins, Inter, sans-serif",
                  }}
                >
                  Welcome Back
                </h2>
                <p
                  style={{
                    color: "var(--text-secondary)",
                    fontSize: "0.95rem",
                    marginBottom: "0",
                  }}
                >
                  Please select your role to continue
                </p>
              </div>

              {authenticated && (
                <div
                  className="alert alert-success mb-3"
                  style={{
                    background: "rgba(16, 185, 129, 0.1)",
                    border: "1px solid rgba(16, 185, 129, 0.3)",
                    borderRadius: "12px",
                    color: "var(--success)",
                    padding: "0.75rem 1rem",
                  }}
                >
                  <div className="d-flex align-items-center mb-2">
                    <span className="me-2" style={{ fontSize: "1.3rem" }}>
                      {getRoleIcon(role)}
                    </span>
                    <div>
                      <strong
                        style={{
                          color: "var(--text-primary)",
                          fontSize: "0.9rem",
                        }}
                      >
                        Already logged in as: {role}
                      </strong>
                      <div
                        className="small"
                        style={{
                          color: "var(--text-secondary)",
                          fontSize: "0.8rem",
                        }}
                      >
                        Redirecting to your dashboard...
                      </div>
                    </div>
                  </div>
                  <button
                    className="btn btn-secondary btn-sm mt-1"
                    onClick={handleLogout}
                    style={{ fontSize: "0.8rem", padding: "0.4rem 0.8rem" }}
                  >
                    Clear Session / Logout
                  </button>
                </div>
              )}

              {!authenticated && (
                <form
                  className="login-form"
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleLogin();
                  }}
                >
                  <div className="row">
                    <div className="col-md-10 mx-auto">
                      <div
                        className="form-group"
                        style={{ marginBottom: "1rem" }}
                      >
                        <label htmlFor="roleSelect" className="form-label">
                          Select Your Role
                        </label>
                        <select
                          id="roleSelect"
                          className="form-control form-control-lg"
                          value={selectedRole}
                          onChange={(e) => setSelectedRole(e.target.value)}
                          style={{
                            cursor: "pointer",
                            fontSize: "1rem",
                            padding: "1.75rem",
                          }}
                        >
                          <option value="" disabled>
                            Choose your role...
                          </option>
                          <option value="admin">Administrator</option>
                          <option value="editor">Editor</option>
                          <option value="viewer">Viewer</option>
                        </select>
                      </div>

                      {selectedRole && (
                        <div className="role-preview-section mb-3 p-3">
                          <div className="d-flex align-items-center mb-1">
                            <span
                              className="me-2"
                              style={{ fontSize: "1.3rem" }}
                            >
                              {getRoleIcon(selectedRole)}
                            </span>
                            <h6
                              className="mb-0 text-capitalize"
                              style={{
                                fontWeight: "600",
                                color: "var(--text-primary)",
                                fontSize: "1rem",
                              }}
                            >
                              {selectedRole}
                            </h6>
                          </div>
                          <small
                            style={{
                              color: "var(--text-secondary)",
                              fontSize: "0.85rem",
                            }}
                          >
                            {getRoleDescription(selectedRole)}
                          </small>
                        </div>
                      )}

                      <div className="d-grid">
                        <button
                          type="submit"
                          className="btn btn-primary btn-lg"
                          disabled={!selectedRole}
                          style={{
                            fontSize: "1rem",
                            padding: "0.75rem",
                          }}
                        >
                          {selectedRole
                            ? `Login as ${selectedRole}`
                            : "Select a role to continue"}
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              )}

              <div className="text-center mt-3">
                <small
                  style={{ color: "var(--text-secondary)", fontSize: "0.8rem" }}
                >
                  Secure Role-Based Access Control System
                </small>
              </div>
            </div>
          </div>
        </div>

        {/* Role Info Cards - Only show when not authenticated */}
        {!authenticated && (
          <div className="role-info-cards">
            <div className="row g-2">
              <div className="col-4">
                <div
                  className="role-info-card"
                  style={{ padding: "1rem 0.5rem" }}
                >
                  <div style={{ fontSize: "2rem", marginBottom: "0.3rem" }}>
                    <svg
                      width="32"
                      height="32"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      style={{ color: "var(--primary)" }}
                    >
                      <path
                        d="M12,15.5A3.5,3.5 0 0,1 8.5,12A3.5,3.5 0 0,1 12,8.5A3.5,3.5 0 0,1 15.5,12A3.5,3.5 0 0,1 12,15.5M19.43,12.97C19.47,12.65 19.5,12.33 19.5,12C19.5,11.67 19.47,11.34 19.43,11L21.54,9.37C21.73,9.22 21.78,8.95 21.66,8.73L19.66,5.27C19.54,5.05 19.27,4.96 19.05,5.05L16.56,6.05C16.04,5.66 15.5,5.32 14.87,5.07L14.5,2.42C14.46,2.18 14.25,2 14,2H10C9.75,2 9.54,2.18 9.5,2.42L9.13,5.07C8.5,5.32 7.96,5.66 7.44,6.05L4.95,5.05C4.73,4.96 4.46,5.05 4.34,5.27L2.34,8.73C2.22,8.95 2.27,9.22 2.46,9.37L4.57,11C4.53,11.34 4.5,11.67 4.5,12C4.5,12.33 4.53,12.65 4.57,12.97L2.46,14.63C2.27,14.78 2.22,15.05 2.34,15.27L4.34,18.73C4.46,18.95 4.73,19.03 4.95,18.95L7.44,17.94C7.96,18.34 8.5,18.68 9.13,18.93L9.5,21.58C9.54,21.82 9.75,22 10,22H14C14.25,22 14.46,21.82 14.5,21.58L14.87,18.93C15.5,18.68 16.04,18.34 16.56,17.94L19.05,18.95C19.27,19.03 19.54,18.95 19.66,18.73L21.66,15.27C21.78,15.05 21.73,14.78 21.54,14.63L19.43,12.97Z"
                        fill="currentColor"
                      />
                    </svg>
                  </div>{" "}
                  <small
                    style={{
                      color: "var(--text-secondary)",
                      fontWeight: "500",
                      fontSize: "0.8rem",
                    }}
                  >
                    Admin
                  </small>
                </div>
              </div>
              <div className="col-4">
                <div
                  className="role-info-card"
                  style={{ padding: "1rem 0.5rem" }}
                >
                  <div style={{ fontSize: "2rem", marginBottom: "0.3rem" }}>
                    ✏️
                  </div>
                  <small
                    style={{
                      color: "var(--text-secondary)",
                      fontWeight: "500",
                      fontSize: "0.8rem",
                    }}
                  >
                    Editor
                  </small>
                </div>
              </div>
              <div className="col-4">
                <div
                  className="role-info-card"
                  style={{ padding: "1rem 0.5rem" }}
                >
                  <div style={{ fontSize: "2rem", marginBottom: "0.3rem" }}>
                    👁️
                  </div>
                  <small
                    style={{
                      color: "var(--text-secondary)",
                      fontWeight: "500",
                      fontSize: "0.8rem",
                    }}
                  >
                    Viewer
                  </small>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default LoginPage;
