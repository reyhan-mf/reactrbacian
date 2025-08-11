import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Context from '../context/context';

function LoginPage() {
  const [selectedRole, setSelectedRole] = useState('') 
  const navigate = useNavigate();
  const { login, authenticated, role, logout } = useContext(Context);

  // Debug logging
  console.log('LoginPage - authenticated:', authenticated, 'role:', role);
  console.log('localStorage userRole:', localStorage.getItem('userRole'));
  console.log('localStorage isAuthenticated:', localStorage.getItem('isAuthenticated'));

  useEffect(() => {
    if (authenticated && role) {
      console.log('Auto-redirecting to:', role);
      setTimeout(() => {
        if (role === 'admin') navigate('/admin');
        else if (role === 'editor') navigate('/editor');
        else if (role === 'viewer') navigate('/viewer');
      }, 100); 
    }
  }, [authenticated, role, navigate]);

  const handleLogin = () => {
    if (!selectedRole) {
      alert('Please select a role first!');
      return;
    }
    
    login(selectedRole);
    
    if (selectedRole === 'admin') navigate('/admin');
    else if (selectedRole === 'editor') navigate('/editor');
    else if (selectedRole === 'viewer') navigate('/viewer'); 
    else navigate('/unauthorized');
  };

  const handleLogout = () => {
    logout();
  };

  const getRoleIcon = (role) => {
    switch(role) {
      case 'admin': return '👑';
      case 'editor': return '✏️';
      case 'viewer': return '👁️';
      default: return '👤';
    }
  };

  const getRoleDescription = (role) => {
    switch(role) {
      case 'admin': return 'Full access to all features and settings';
      case 'editor': return 'Create, edit, and manage content';
      case 'viewer': return 'View and read content only';
      default: return '';
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
                  <div style={{ 
                    fontSize: '3rem', 
                    background: 'linear-gradient(135deg, var(--primary) 0%, var(--primary-light) 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text'
                  }}>
                    🔐
                  </div>
                </div>
                <h2 className="mb-2" style={{ 
                  fontWeight: '700',
                  fontSize: '1.8rem',
                  color: 'var(--text-primary)',
                  fontFamily: 'Poppins, Inter, sans-serif'
                }}>
                  Welcome Back
                </h2>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginBottom: '0' }}>
                  Please select your role to continue
                </p>
              </div>

              {authenticated && (
                <div className="alert alert-success mb-3" style={{
                  background: 'rgba(16, 185, 129, 0.1)',
                  border: '1px solid rgba(16, 185, 129, 0.3)',
                  borderRadius: '12px',
                  color: 'var(--success)',
                  padding: '0.75rem 1rem'
                }}>
                  <div className="d-flex align-items-center mb-2">
                    <span className="me-2" style={{ fontSize: '1.3rem' }}>{getRoleIcon(role)}</span>
                    <div>
                      <strong style={{ color: 'var(--text-primary)', fontSize: '0.9rem' }}>
                        Already logged in as: {role}
                      </strong>
                      <div className="small" style={{ color: 'var(--text-secondary)', fontSize: '0.8rem' }}>
                        Redirecting to your dashboard...
                      </div>
                    </div>
                  </div>
                  <button 
                    className="btn btn-secondary btn-sm mt-1" 
                    onClick={handleLogout}
                    style={{ fontSize: '0.8rem', padding: '0.4rem 0.8rem' }}
                  >
                    Clear Session / Logout
                  </button>
                </div>
              )}

              {!authenticated && (
                <form className="login-form" onSubmit={(e) => { e.preventDefault(); handleLogin(); }}>
                  <div className="row">
                    <div className="col-md-10 mx-auto">
                      <div className="form-group" style={{ marginBottom: '1rem' }}>
                        <label htmlFor="roleSelect" className="form-label">
                          Select Your Role
                        </label>
                        <select
                          id="roleSelect"
                          className="form-control form-control-lg"
                          value={selectedRole}
                          onChange={e => setSelectedRole(e.target.value)}
                          style={{ 
                            cursor: 'pointer',
                            fontSize: '1rem',
                            padding: '0.75rem'
                          }}
                        >
                          <option value="" disabled>Choose your role...</option>
                          <option value="admin">👑 Administrator</option>
                          <option value="editor">✏️ Editor</option>
                          <option value="viewer">👁️ Viewer</option>
                        </select>
                      </div>

                      {selectedRole && (
                        <div className="role-preview-section mb-3 p-3">
                          <div className="d-flex align-items-center mb-1">
                            <span className="me-2" style={{ fontSize: '1.3rem' }}>{getRoleIcon(selectedRole)}</span>
                            <h6 className="mb-0 text-capitalize" style={{ 
                              fontWeight: '600',
                              color: 'var(--text-primary)',
                              fontSize: '1rem'
                            }}>
                              {selectedRole}
                            </h6>
                          </div>
                          <small style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
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
                            fontSize: '1rem',
                            padding: '0.75rem'
                          }}
                        >
                          {selectedRole ? `Login as ${selectedRole}` : 'Select a role to continue'}
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              )}

              <div className="text-center mt-3">
                <small style={{ color: 'var(--text-secondary)', fontSize: '0.8rem' }}>
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
                <div className="role-info-card" style={{ padding: '1rem 0.5rem' }}>
                  <div style={{ fontSize: '2rem', marginBottom: '0.3rem' }}>👑</div>
                  <small style={{ color: 'var(--text-secondary)', fontWeight: '500', fontSize: '0.8rem' }}>Admin</small>
                </div>
              </div>
              <div className="col-4">
                <div className="role-info-card" style={{ padding: '1rem 0.5rem' }}>
                  <div style={{ fontSize: '2rem', marginBottom: '0.3rem' }}>✏️</div>
                  <small style={{ color: 'var(--text-secondary)', fontWeight: '500', fontSize: '0.8rem' }}>Editor</small>
                </div>
              </div>
              <div className="col-4">
                <div className="role-info-card" style={{ padding: '1rem 0.5rem' }}>
                  <div style={{ fontSize: '2rem', marginBottom: '0.3rem' }}>👁️</div>
                  <small style={{ color: 'var(--text-secondary)', fontWeight: '500', fontSize: '0.8rem' }}>Viewer</small>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default LoginPage