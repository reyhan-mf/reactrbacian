import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ErrorBoundary from "../components/ErrorBoundary";
import CreateIcon from "../components/Icons/CreateIcon";
import CreateModal from "../components/Modals/CreateModals";
import DeleteModal from "../components/Modals/DeleteModal";
import EditModal from "../components/Modals/EditModal";
import CollapsibleNavbar from "../components/NavBar";
import CustomTable from "../components/Tables";
import Context from "../context/context";
import {
  createProduct,
  deleteProduct,
  fetchProducts,
  getLocalProducts,
  saveProductsLocally,
  updateProduct,
} from "../services/ProductServices";

function EditorPage() {
  const { role, logout } = useContext(Context);
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [newAttribute, setNewAttribute] = useState({ key: "", value: "" });
  const [editAttribute, setEditAttribute] = useState({ key: "", value: "" });
  const [newProduct, setNewProduct] = useState({ name: "", data: {} });
  const [editingProduct, setEditingProduct] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      const localData = getLocalProducts();
      if (localData && localData.length > 0) {
        console.log("Loading products from Local Storage");
        setProducts(localData);
        return;
      }

      try {
        console.log("Loading products from API");
        let apiData = []; 
        if (!localData || localData.length === 0) {
          apiData = await fetchProducts();
        }
        if (localData && localData.length > 0) {
          console.log("Merging with existing local data");
          const mergedData = mergeApiWithLocal(apiData, localData);
          setProducts(mergedData);
          saveProductsLocally(mergedData);
        } else if (apiData.length > 0) {
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
    console.log("➕ [AdminPage] handleAddAttribute called");
    console.log("➕ [AdminPage] newAttribute:", newAttribute);
    console.log("➕ [AdminPage] newProduct before add:", newProduct);
    
    if (newAttribute.key && newAttribute.value) {
      // Check if key already exists
      const keyExists = newAttribute.key in newProduct.data;
      
      if (keyExists) {
        // Show info message for duplicate key
        const userConfirmed = confirm(
          `Key "${newAttribute.key}" already exists with value "${newProduct.data[newAttribute.key]}". Do you want to update it to "${newAttribute.value}"?`
        );
        
        if (!userConfirmed) {
          return; 
        }
      }
      
      const updatedData = { ...newProduct.data };
      
      if (keyExists) {
        delete updatedData[newAttribute.key];
      }
      
      // Add the new/updated attribute at the end
      updatedData[newAttribute.key] = newAttribute.value;
      
      const updatedProduct = {
        ...newProduct,
        data: updatedData,
      };
      
      console.log("➕ [AdminPage] updatedProduct:", updatedProduct);
      
      setNewProduct(updatedProduct);
      setNewAttribute({ key: "", value: "" });
      
      console.log("➕ [AdminPage] State updated successfully");
    } else {
      console.log("❌ [AdminPage] Attribute addition failed - missing key or value");
      alert("Both key and value are required to add an attribute.");
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
    setEditAttribute({ key: "", value: "" }); // Reset edit attribute state
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
      setEditAttribute({ key: "", value: "" }); // Reset edit attribute state

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
      {/* Modals */}
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
        newAttribute={editAttribute}
        setNewAttribute={setEditAttribute}
        handleUpdateProduct={handleUpdateProduct}
        handleCancelEdit={() => {
          setEditingProduct(null);
          setEditAttribute({ key: "", value: "" });
        }}
      />
      {/* END Edit Product Modal */}
      {/* Modals End */}

      <DeleteModal
        showDeleteModal={showDeleteModal}
        handleCancelDelete={handleCancelDelete}
        handleConfirmDelete={handleConfirmDelete}
        productToDelete={productToDelete}
      />

      <CollapsibleNavbar role={role} logout={handleLogout} />
      <br />
      <br />

      <h1>
        Welcome, <span style={{ fontWeight: "bold" }}>{role}</span>
      </h1>
      <button onClick={handleRefreshSession}>Refresh Session</button>

      <div className="table-header-actions">
        <h2 className="table-title">Products</h2>
        <button
          className="icon-btn icon-btn-create"
          onClick={() => setShowCreateModal(true)}
          title="Create Product"
        >
          <CreateIcon />
        </button>
      </div>

      {/* Product Table */}
      <ErrorBoundary>
      <CustomTable role={role} products={products} handleEdit={handleEdit} handleDeleteModal={handleDeleteModal} />
      </ErrorBoundary>
    </div>
  );
}

export default EditorPage;
