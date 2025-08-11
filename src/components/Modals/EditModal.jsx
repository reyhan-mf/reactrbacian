function EditModal({
  editingProduct,
  setEditingProduct,
  newAttribute,
  setNewAttribute,
  handleUpdateProduct,
  handleCancelEdit,
}) {
  if (!editingProduct) return null;

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
              className="close"
              onClick={handleCancelEdit}
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <div>
              <label>
                Name:
                <input
                  type="text"
                  value={editingProduct?.name || ""}
                  onChange={(e) =>
                    setEditingProduct({
                      ...editingProduct,
                      name: e.target.value,
                    })
                  }
                />
              </label>
            </div>
            <div>
              <h3>Attributes</h3>
              <ul>
                {Object.entries(editingProduct?.data || {}).map(
                  ([key, value]) => (
                    <li key={key}>
                      <input
                        type="text"
                        value={key}
                        onChange={(e) => {
                          const newKey = e.target.value;
                          const { [key]: oldValue, ...rest } =
                            editingProduct.data;
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
                            data: {
                              ...editingProduct.data,
                              [key]: e.target.value,
                            },
                          })
                        }
                      />
                    </li>
                  )
                )}
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
                    setNewAttribute({
                      ...newAttribute,
                      value: e.target.value,
                    })
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