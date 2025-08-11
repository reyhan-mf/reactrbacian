import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import Context from './context';

const ProtectedRoute = ({ children, requiredRoles }) => {
    const { role, authenticated } = useContext(Context);

    if (!authenticated) {
        return <Navigate to="/" />;
    }

    if (requiredRoles && !requiredRoles.includes(role)) {
        return <Navigate to="/unauthorized" />;
    }

    if (!requiredRoles && role !== 'admin' && role !== 'editor' && role !== 'viewer') {
        return <Navigate to="/unauthorized" />;
    }

    return children;
}

export default ProtectedRoute;