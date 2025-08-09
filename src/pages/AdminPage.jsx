import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Context from "../context/context";

function AdminPage() {
  const { role, logout } = useContext(Context);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div>
      <h1>Welcome, {role}</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Attributes</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Google Pixel 6 Pro</td>
            <td>
              <ul class="attributes-list">
                <li>
                  <strong>color:</strong> Cloudy White
                </li>
                <li>
                  <strong>capacity:</strong> 128 GB
                </li>
              </ul>
            </td>
            <td>
              <button>Edit</button>
              <button>Delete</button>
            </td>
          </tr>

          <tr>
            <td>7</td>
            <td>Apple MacBook Pro 16</td>
            <td>
              <ul class="attributes-list">
                <li>
                  <strong>year:</strong> 2019
                </li>
                <li>
                  <strong>price:</strong> 1849.99
                </li>
                <li>
                  <strong>CPU model:</strong> Intel Core i9
                </li>
                <li>
                  <strong>Hard disk size:</strong> 1 TB
                </li>
              </ul>
            </td>
            <td>
              <button>Edit</button>
              <button>Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
      <br />
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default AdminPage;
