import CreateIcon from "../Icons/CreateIcon";
import DeleteIcon from "../Icons/DeleteIcon";
import { IoClose } from "react-icons/io5";
function CreateModal({
  showCreateModal,
  handleCancelCreate,
  handleCreateProduct,
  newProduct,
  setNewProduct,
  newAttribute,
  setNewAttribute,
  handleAddAttribute,
}) {
  if (!showCreateModal) return null;

  const handleRemoveAttribute = (keyToRemove) => {
    const { [keyToRemove]: _, ...rest } = newProduct.data;
    setNewProduct({ ...newProduct, data: rest });
  };

  return (
    <div
      className={`modal fade ${showCreateModal ? "show" : ""}`}
      style={{ display: showCreateModal ? "block" : "none" }}
      tabIndex="-1"
      role="dialog"
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Create New Product</h5>
            <button
              type="button"
              className="close-btn"
              onClick={handleCancelCreate}
              aria-label="Close"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18 6L6 18M6 6l12 12"/>
              </svg>
            </button>
          </div>
          <div className="modal-body">
            <div className="form-group">
              <label className="form-label">Product Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter product name"
                value={newProduct.name}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, name: e.target.value })
                }
              />
            </div>

            <div className="attributes-section">
              <h6 className="attributes-title">Product Attributes</h6>
              
              {/* Add New Attribute */}
              <div className="form-row">
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Attribute key"
                    value={newAttribute.key}
                    onChange={(e) =>
                      setNewAttribute({ ...newAttribute, key: e.target.value })
                    }
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Attribute value"
                    value={newAttribute.value}
                    onChange={(e) =>
                      setNewAttribute({ ...newAttribute, value: e.target.value })
                    }
                  />
                </div>
                <button 
                  type="button"
                  className="btn-add-attribute" 
                  onClick={handleAddAttribute}
                  title="Add Attribute"
                >
                  <CreateIcon />
                </button>
              </div>

              {/* Display Existing Attributes */}
              {Object.entries(newProduct.data).length > 0 && (
                <div style={{ marginTop: '1rem' }}>
                  {Object.entries(newProduct.data).map(([key, value]) => (
                    <div key={key} className="attribute-item">
                      <span className="attribute-key">{key}:</span>
                      <span className="attribute-value">{value}</span>
                      <button
                        type="button"
                        className="icon-btn icon-btn-delete"
                        onClick={() => handleRemoveAttribute(key)}
                        title="Remove Attribute"
                        style={{ width: '2.5rem', height: '2.5rem', padding: '0.25rem' }}
                      >
                    <IoClose style={{ width: "1.8rem", height: "2.5rem", color: "#ffffff" }} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleCreateProduct}
            >
              
              Create Product
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={handleCancelCreate}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateModal;