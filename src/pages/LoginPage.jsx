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

  return (
    <div>
      <h1>This is Login Page</h1>
      {authenticated && (
        <div style={{background: '#f0f0f0', padding: '10px', margin: '10px 0'}}>
          <p>Already logged in as: <strong>{role}</strong></p>
          <p>Redirecting...</p>
          <button onClick={handleLogout} style={{marginTop: '10px'}}>
            Clear Session / Logout
          </button>
        </div>
      )}
      {!authenticated && (
        <>
          <select
            value={selectedRole}
            onChange={e => setSelectedRole(e.target.value)}
          >
            <option value="" disabled>Select Role</option>
            <option value="admin">Admin</option>
            <option value="editor">Editor</option>
            <option value="viewer">Viewer</option>
          </select>
          <p>Selected role: {selectedRole}</p>
          <button onClick={handleLogin}>Login</button>
        </>
      )}
    </div>
  )
}

export default LoginPage