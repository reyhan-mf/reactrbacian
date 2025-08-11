import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import './App.css'
import ContextProvider from './context/ContextProvider'
import ProtectedRoute from './context/ProtectedRoute'
import AdminPage from './pages/AdminPage'
import EditorPage from './pages/EditorPage'
import LoginPage from './pages/LoginPage'
import UnauthorizedPage from './pages/UnauthorizedPage'
import ViewerPage from './pages/ViewerPage'
import 'bootstrap/dist/css/bootstrap.min.css';


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
            <ProtectedRoute requiredRoles={['editor']}>
              <EditorPage />
            </ProtectedRoute>
          } />
          <Route path="/viewer" element={
            <ProtectedRoute requiredRoles={['viewer']}>
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
