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
import CollapsibleNavbar from "../components/NavBar";
import CreateModal from "../components/Modals/CreateModals";
import EditModal from "../components/Modals/EditModal";
import DeleteModal from "../components/Modals/DeleteModal";

function AdminPage() {
  const { role, logout } = useContext(Context);
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [newAttribute, setNewAttribute] = useState({ key: "", value: "" });
  const [newProduct, setNewProduct] = useState({ name: "", data: {} });
  const [editingProduct, setEditingProduct] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
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

  const handleDeleteModal = (product) => {
    setProductToDelete(product);
    setShowDeleteModal(true);
  };

const handleCancelDelete = () => {
  setProductToDelete(null);
  setShowDeleteModal(false);
};

const handleConfirmDelete = async (id) => {
  try {
    setShowDeleteModal(false);
    setProductToDelete(null);

    const updatedProducts = products.filter((product) => product.id !== id);
    setProducts(updatedProducts);
    saveProductsLocally(updatedProducts);

    await deleteProduct(id);

  } catch (error) {
    console.error("Error deleting product:", error);
    alert("Failed to delete product. Please try again.");
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
      <CollapsibleNavbar role={role} logout={handleLogout} />
      <br />
      <h1>Welcome, {role}</h1>
      <button onClick={handleRefreshSession}>Refresh Session</button>
      <br />
      <br />
      <button onClick={() => setShowCreateModal(true)}>Create Product</button>

      {/* Create Product Modal */}
      <CreateModal
        showCreateModal={showCreateModal}
        handleCancelCreate={handleCancelCreate}
        handleCreateProduct={handleCreateProduct}
        newProduct={newProduct}
        setNewProduct={setNewProduct}
        newAttribute={newAttribute}
        setNewAttribute={setNewAttribute}
        handleAddAttribute={handleAddAttribute}
      />
      {/* END Create Product Modal */}

      {/* Edit Product Modal */}
      <EditModal
        editingProduct={editingProduct}
        setEditingProduct={setEditingProduct}
        newAttribute={newAttribute}
        setNewAttribute={setNewAttribute}
        handleUpdateProduct={handleUpdateProduct}
        handleCancelEdit={() => setEditingProduct(null)}
      />
      {/* END Edit Product Modal */}

      <DeleteModal
        showDeleteModal={showDeleteModal}
        handleCancelDelete={handleCancelDelete}
        handleConfirmDelete={handleConfirmDelete}
        productToDelete={productToDelete}
      />

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
                <button onClick={() => handleDeleteModal(product)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminPage;
