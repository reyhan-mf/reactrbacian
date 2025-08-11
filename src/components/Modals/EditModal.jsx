import { IoClose } from "react-icons/io5";
import CreateIcon from "../Icons/CreateIcon";

function EditModal({
  editingProduct,
  setEditingProduct,
  newAttribute,
  setNewAttribute,
  handleUpdateProduct,
  handleCancelEdit,
}) {
  if (!editingProduct) return null;

  const handleRemoveAttribute = (keyToRemove) => {
    const { [keyToRemove]: _, ...rest } = editingProduct.data || {};
    setEditingProduct({
      ...editingProduct,
      data: rest,
    });
  };

  const handleAddNewAttribute = () => {
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
      alert("Both key and value are required to add an attribute.");
    }
  };

  return (
    <div
      className={`modal fade ${editingProduct ? "show" : ""}`}
      style={{ display: editingProduct ? "block" : "none" }}
      tabIndex="-1"
      role="dialog"
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Edit Product</h5>
            <button
              type="button"
              className="btn close-btn"
              onClick={handleCancelEdit}
              aria-label="Close"
              style={{ fontSize: "1.5rem" }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18 6L6 18M6 6l12 12" />
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
                value={editingProduct?.name || ""}
                onChange={(e) =>
                  setEditingProduct({
                    ...editingProduct,
                    name: e.target.value,
                  })
                }
              />
            </div>

            <div className="attributes-section">
              <h6 className="attributes-title">Product Attributes</h6>

              {/* Display Existing Attributes for Editing */}
              {Object.entries(editingProduct?.data || {}).map(([key, value], index) => (
                <div key={`attribute-${index}`} className="attribute-item">
                  <input
                    type="text"
                    className="form-control"
                    value={key}
                    onChange={(e) => {
                      const newKey = e.target.value;
                      const { [key]: oldValue, ...rest } = editingProduct.data;
                      setEditingProduct({
                        ...editingProduct,
                        data: { ...rest, [newKey]: oldValue },
                      });
                    }}
                    style={{ width: "40%", marginRight: "0.5rem" }}
                  />
                  <input
                    type="text"
                    className="form-control"
                    value={value}
                    onChange={(e) =>
                      setEditingProduct({
                        ...editingProduct,
                        data: {
                          ...editingProduct.data,
                          [key]: e.target.value,
                        },
                      })
                    }
                    style={{ width: "40%", marginRight: "0.5rem" }}
                  />
                  <button
                    type="button"
                    className="icon-btn icon-btn-delete"
                    onClick={() => handleRemoveAttribute(key)}
                    title="Remove Attribute"
                    style={{  width: '2.25rem', height: '2.25rem', padding: '0.25rem' }}
                  >
                    <IoClose style={{ width: "1.5rem", height: "1.5rem", color: "#ffffff" }} />
                  </button>
                </div>
              ))}

              {/* Add New Attribute */}
              <div className="form-row" style={{ marginTop: "1rem" }}>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="New attribute key"
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
                    placeholder="New attribute value"
                    value={newAttribute.value}
                    onChange={(e) =>
                      setNewAttribute({
                        ...newAttribute,
                        value: e.target.value,
                      })
                    }
                  />
                </div>
                <button
                  type="button"
                  className="btn btn-add-attribute"
                  onClick={handleAddNewAttribute}
                  title="Add Attribute"
                  style={{ fontSize: "1.5rem" }}
                >
                  <CreateIcon />
                </button>
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleUpdateProduct}
            >
              Save Changes
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={handleCancelEdit}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditModal;