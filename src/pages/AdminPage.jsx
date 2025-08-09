import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Context from "../context/context";
import { fetchProducts, deleteProduct } from "../services/ProductServices"; // Import the service function
function AdminPage() {
  const { role, logout } = useContext(Context);
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      const localData = localStorage.getItem("products");
      if (localData) {
        setProducts(JSON.parse(localData)); 
      } else {
        try {
          const data = await fetchProducts();
          setProducts(data);
          localStorage.setItem("products", JSON.stringify(data)); 
        } catch (error) {
          console.error("Error fetching products:", error);
        }
      }
    };
    loadData();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm(`Are you sure you want to delete product with ID: ${id}?`)) {
      try {
        // Simulate deletion locally
        const updatedProducts = products.filter((product) => product.id !== id);
        setProducts(updatedProducts);
        localStorage.setItem("products", JSON.stringify(updatedProducts)); // Update localStorage

        // Optionally call the API to delete the product
        await deleteProduct(id);
      } catch (error) {
        console.error("Error deleting product:", error);
      }
    }
  };
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
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.name}</td>
              <td>
                <ul className="attributes-list">
                  {Object.entries(product.data || {}).map(
                    ([key, value]) => (
                      <li key={key}>
                        <strong>{key}:</strong> {value}
                      </li>
                    )
                  )}
                </ul>
              </td>
              <td>
                <button>Edit</button>
                <button onClick={() => handleDelete(product.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <br />
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default AdminPage;
