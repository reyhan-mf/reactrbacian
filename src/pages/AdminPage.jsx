import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Context from "../context/context";
import {
  createProduct,
  deleteProduct,
  fetchProducts,
  getLocalProducts,
  saveProductsLocally,
  updateProduct,
} from "../services/ProductServices";
function AdminPage() {
  const { role, logout } = useContext(Context);
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [newAttribute, setNewAttribute] = useState({ key: "", value: "" });
  const [newProduct, setNewProduct] = useState({ name: "", data: {} });
  const [editingProduct, setEditingProduct] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      const localData = getLocalProducts();

      try {
        console.log("Loading products from API");
        const apiData = await fetchProducts();

        if (localData && localData.length > 0) {
          console.log("Merging with existing local data");
          const mergedData = mergeApiWithLocal(apiData, localData);
          setProducts(mergedData);
          saveProductsLocally(mergedData);
        } else {
          console.log("Using fresh API data");
          setProducts(apiData);
          saveProductsLocally(apiData);
        }
      } catch (error) {
        console.error("Failed to fetch from API:", error);
        if (localData && localData.length > 0) {
          console.log("Using local data as fallback");
          setProducts(localData);
        }
      }
    };

    loadData();
  }, []);

  const handleDelete = async (id) => {
    if (
      window.confirm(`Are you sure you want to delete product with ID: ${id}?`)
    ) {
      try {
        const updatedProducts = products.filter((product) => product.id !== id);
        setProducts(updatedProducts);
        saveProductsLocally(updatedProducts);

        await deleteProduct(id);
      } catch (error) {
        console.error("Error deleting product:", error);
      }
    }
  };

  const mergeApiWithLocal = (apiData, localData) => {
    const locallyCreatedProducts = localData.filter(
      (product) => !product.isCloned
    );

    const locallyModifiedProducts = localData.filter(
      (product) =>
        product.isCloned && (product.isLocallyModified || product.updatedAt)
    );

    const freshApiProducts = apiData.map((apiProduct) => ({
      ...apiProduct,
      isCloned: true,
      originalApiData: { ...apiProduct },
    }));

    const productMap = new Map();

    freshApiProducts.forEach((product) => {
      productMap.set(product.id, product);
    });

    locallyModifiedProducts.forEach((product) => {
      productMap.set(product.id, product);
    });

    locallyCreatedProducts.forEach((product) => {
      productMap.set(product.id, product);
    });

    return Array.from(productMap.values());
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
      saveProductsLocally(updatedProducts);
      
      // Reset form and close modal
      setNewProduct({ name: "", data: {} });
      setNewAttribute({ key: "", value: "" });
      setShowCreateModal(false);
      
      console.log("Product created:", createdProduct);
    } catch (error) {
      console.error("Error creating product:", error);
      alert("Failed to create product. Please try again.");
    }
  };

  const handleCancelCreate = () => {
    setNewProduct({ name: "", data: {} });
    setNewAttribute({ key: "", value: "" });
    setShowCreateModal(false);
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
  };


  const handleUpdateProduct = async () => {
    if (!editingProduct.name) {
      alert("Product name is required!");
      return;
    }

    try {
      const updatedProductFromService = await updateProduct(editingProduct);

      const updatedProducts = products.map((product) =>
        product.id === editingProduct.id ? updatedProductFromService : product
      );

      setProducts(updatedProducts);
      saveProductsLocally(updatedProducts);
      setEditingProduct(null);

      if (updatedProductFromService.isLocallyModified) {
        console.log(
          "Product updated locally (API doesn't support updates for this item)"
        );
      } else {
        console.log("Product updated via API");
      }
    } catch (error) {
      console.error("Error updating product:", error);
      alert("Failed to update product. Please try again.");
    }
  };

  const handleRefreshSession = async () => {
    try {
      console.log("Refreshing session - resetting to original API state");
      const freshApiData = await fetchProducts();

      setProducts(freshApiData);
      saveProductsLocally(freshApiData);

      console.log(
        "Session refreshed - localStorage reset to original API state"
      );
    } catch (error) {
      console.error("Error refreshing session:", error);
      alert(
        "Failed to refresh session. Please check your internet connection."
      );
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
      <br />
      <br />
      <button onClick={() => setShowCreateModal(true)}>Create Product</button>
      
      {/* Create Product Modal */}
      {showCreateModal && (
        <div className="modal">
          <div>
            <h2>Create Product</h2>
            <div>
              <label>
                Name:
                <input
                  type="text"
                  value={newProduct.name}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, name: e.target.value })
                  }
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
                  onChange={(e) =>
                    setNewAttribute({ ...newAttribute, key: e.target.value })
                  }
                />
                <input
                  type="text"
                  placeholder="Value"
                  value={newAttribute.value}
                  onChange={(e) =>
                    setNewAttribute({ ...newAttribute, value: e.target.value })
                  }
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
            <button onClick={handleCancelCreate}>Cancel</button>
          </div>
        </div>
      )}

      {/* Edit Product Modal */}
      {editingProduct && (
        <div className="modal">
          <div>
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
                onChange={(e) =>
                  setNewAttribute({ ...newAttribute, key: e.target.value })
                }
              />
              <input
                type="text"
                placeholder="New Attribute Value"
                value={newAttribute.value}
                onChange={(e) =>
                  setNewAttribute({ ...newAttribute, value: e.target.value })
                }
              />
              <button
                onClick={() => {
                  if (newAttribute.key && newAttribute.value) {
                    setEditingProduct((prev) => ({
                      ...prev,
                      data: {
                        ...prev.data,
                        [newAttribute.key]: newAttribute.value,
                      },
                    }));
                    setNewAttribute({ key: "", value: "" });
                  } else {
                    alert(
                      "Both key and value are required to add an attribute."
                    );
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
              <td>{product.id_counter}</td>
              <td>
                {product.createdAt
                  ? `Created At: ${new Date(
                      product.createdAt
                    ).toLocaleDateString()} ${new Date(
                      product.createdAt
                    ).toLocaleTimeString()}`
                  : "Created At: N/A"}
                <br />
                {product.updatedAt
                  ? `Updated At: ${new Date(
                      product.updatedAt
                    ).toLocaleDateString()} ${new Date(
                      product.updatedAt
                    ).toLocaleTimeString()}`
                  : ""}
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
