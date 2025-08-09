import React, { useState } from 'react'

function LoginPage() {
  const [role, setRole] = useState('user')

  return (
    <div>
      <h1>This is Login Pages</h1>
      <select value={role} onChange={e => setRole(e.target.value)}>
        <option value="admin">Admin</option>
        <option value="user">User</option>
        <option value="guest">Guest</option>
      </select>
      <p>Selected role: {role}</p>
    </div>
  )
}

export default LoginPage