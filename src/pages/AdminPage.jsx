import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Context from '../context/context';

function AdminPage(){
    const { role, logout } = useContext(Context);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <div>
            <h1>This is Admin Page</h1>
            <p>Welcome, {role}!</p>
            <button onClick={handleLogout}>Logout</button>
        </div>
    )
}

export default AdminPage