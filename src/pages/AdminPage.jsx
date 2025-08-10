import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Context from "../context/context";
import { fetchProducts, deleteProduct, createProduct } from "../services/ProductServices"; // Import the service function
function AdminPage() {
  const { role, logout } = useContext(Context);
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [newAttribute, setNewAttribute] = useState({ key: "", value: "" });
  const [newProduct, setNewProduct] = useState({ name: "", data: {} });
  const [editingProduct, setEditingProduct] = useState(null);

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
       const updatedProducts = products.filter((product) => product.id !== id);
        setProducts(updatedProducts);
        localStorage.setItem("products", JSON.stringify(updatedProducts));

        await deleteProduct(id);
      } catch (error) {
        console.error("Error deleting product:", error);
      }
    }
  };

  const handleAddAttribute = () => {
    if (newAttribute.key && newAttribute.value) {
      setNewProduct((prev) => ({
        ...prev,
        data: { ...prev.data, [newAttribute.key]: newAttribute.value },
      }));
      setNewAttribute({ key: "", value: "" });
    }
  };

  const handleCreateProduct = async () => {
    if (!newProduct.name) {
      alert("Product name is required!");
      return;
    }

    try {
      const createdProduct = await createProduct(newProduct);
      const updatedProducts = [...products, createdProduct];
      setProducts(updatedProducts);
      localStorage.setItem("products", JSON.stringify(updatedProducts));
      setNewProduct({ name: "", data: {} });
    } catch (error) {
      console.error("Error creating product:", error);
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
  };

  const handleUpdateProduct = () => {
    if (!editingProduct.name) {
      alert("Product name is required!");
      return;
    }

    const updatedProducts = products.map((product) =>
      product.id === editingProduct.id ? editingProduct : product
    );
    setProducts(updatedProducts);
    localStorage.setItem("products", JSON.stringify(updatedProducts));
    setEditingProduct(null); // Close the modal
  };

  const handleRefreshSession = async () => {
    try {
      const data = await fetchProducts();
        setProducts(data);
        localStorage.setItem("products", JSON.stringify(data));
    } catch (error) {
      console.error("Error refreshing session:", error);
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

return (
    <div>
        <h1>Welcome, {role}</h1>
        <button onClick={handleRefreshSession}>Refresh Session</button>
        {/* Create Product Form */}
        <div>
            <h2>Create Product</h2>
            <div>
                <label>
                    Name:
                    <input
                        type="text"
                        value={newProduct.name}
                        onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                    />
                </label>
            </div>
            
            <div>
                <h3>Attributes</h3>
                <div>
                    <input
                        type="text"
                        placeholder="Key"
                        value={newAttribute.key}
                        onChange={(e) => setNewAttribute({ ...newAttribute, key: e.target.value })}
                    />
                    <input
                        type="text"
                        placeholder="Value"
                        value={newAttribute.value}
                        onChange={(e) => setNewAttribute({ ...newAttribute, value: e.target.value })}
                    />
                    <button onClick={handleAddAttribute}>Add Attribute</button>
                </div>
                <ul>
                    {Object.entries(newProduct.data).map(([key, value]) => (
                        <li key={key}>
                            <strong>{key}:</strong> {value}
                        </li>
                    ))}
                </ul>
            </div>
            <button onClick={handleCreateProduct}>Create Product</button>
        </div>
{/* Edit Product Modal */}
{editingProduct && (
<div className="modal">
    <h2>Edit Product</h2>
    <div>
        <label>
            Name:
            <input
                type="text"
                value={editingProduct.name}
                onChange={(e) =>
                    setEditingProduct({ ...editingProduct, name: e.target.value })
                }
            />
        </label>
    </div>
    <div>
        <h3>Attributes</h3>
        <ul>
            {Object.entries(editingProduct.data || {}).map(([key, value]) => (
                <li key={key}>
                    <input
                        type="text"
                        value={key}
                        onChange={(e) => {
                            const newKey = e.target.value;
                            const { [key]: oldValue, ...rest } = editingProduct.data;
                            setEditingProduct({
                                ...editingProduct,
                                data: { ...rest, [newKey]: oldValue },
                            });
                        }}
                    />
                    <input
                        type="text"
                        value={value}
                        onChange={(e) =>
                            setEditingProduct({
                                ...editingProduct,
                                data: { ...editingProduct.data, [key]: e.target.value },
                            })
                        }
                    />
                </li>
            ))}
        </ul>
        {/* Add New Attribute */}
        <div>
            <input
                type="text"
                placeholder="New Attribute Key"
                value={newAttribute.key}
                onChange={(e) => setNewAttribute({ ...newAttribute, key: e.target.value })}
            />
            <input
                type="text"
                placeholder="New Attribute Value"
                value={newAttribute.value}
                onChange={(e) => setNewAttribute({ ...newAttribute, value: e.target.value })}
            />
            <button
                onClick={() => {
                    if (newAttribute.key && newAttribute.value) {
                        setEditingProduct((prev) => ({
                            ...prev,
                            data: { ...prev.data, [newAttribute.key]: newAttribute.value },
                        }));
                        setNewAttribute({ key: "", value: "" }); // Reset the input fields
                    } else {
                        alert("Both key and value are required to add an attribute.");
                    }
                }}
            >
                Add Attribute
            </button>
        </div>
    </div>
    <button onClick={handleUpdateProduct}>Save Changes</button>
    <button onClick={() => setEditingProduct(null)}>Cancel</button>
</div>
)}
        {/* Product Table */}
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Date</th>
                    <th>Name</th>
                    <th>Attributes</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {products.map((product) => (
                    <tr key={product.id}>
                        <td>{product.id}</td>
                        <td>
                            {product.createdAt
                                ? `${new Date(product.createdAt).toLocaleDateString()} ${new Date(product.createdAt).toLocaleTimeString()}`
                                : "N/A"}
                        </td>
                        <td>{product.name}</td>
                        <td>
                            {product.data ? (
                                <ul className="attributes-list">
                                    {Object.entries(product.data).map(([key, value]) => (
                                        <li key={key}>
                                            <strong>{key}:</strong> {value}
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <span>No data</span>
                            )}
                        </td>
                        <td>
                            <button onClick={() => handleEdit(product)}>Edit</button>
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
