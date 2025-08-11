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
            <h5 className="modal-title">Create Product</h5>
            <button
              type="button"
              className="close"
              onClick={handleCancelCreate}
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
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
            <div>
              <h3>Attributes</h3>
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
              <ul>
                {Object.entries(newProduct.data).map(([key, value]) => (
                  <li key={key}>
                    <strong>{key}:</strong> {value}
                  </li>
                ))}
              </ul>
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