import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import './App.css'
import ContextProvider from './context/ContextProvider'
import ProtectedRoute from './context/ProtectedRoute'
import AdminPage from './pages/AdminPage'
import EditorPage from './pages/EditorPage'
import LoginPage from './pages/LoginPage'
import UnauthorizedPage from './pages/UnauthorizedPage'
import ViewerPage from './pages/ViewerPage'

function App() {
  return (
    <ContextProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />

          {/* Protected Routes */}
          <Route path="/admin" element={
            <ProtectedRoute requiredRoles={['admin']}>
              <AdminPage />
            </ProtectedRoute>
          } />
          <Route path="/editor" element={
            <ProtectedRoute requiredRoles={['admin', 'editor']}>
              <EditorPage />
            </ProtectedRoute>
          } />
          <Route path="/viewer" element={
            <ProtectedRoute requiredRoles={['admin', 'editor', 'viewer']}>
              <ViewerPage />
            </ProtectedRoute>
          } />
          <Route path="/unauthorized" element={<UnauthorizedPage />} />

        </Routes>
      </Router>
    </ContextProvider>
  )
}

export default App
