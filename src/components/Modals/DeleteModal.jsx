function DeleteModal({ showDeleteModal, handleCancelDelete, handleConfirmDelete, productToDelete }) {
  if (!showDeleteModal) return null;

  return (
    <div
      className={`modal fade ${showDeleteModal ? "show" : ""}`}
      style={{ display: showDeleteModal ? "block" : "none" }}
      tabIndex="-1"
      role="dialog"
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Delete Product</h5>
            <button
              type="button"
              className="close"
              onClick={handleCancelDelete}
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <p>
              Are you sure you want to delete the product{" "}
              <strong>{productToDelete?.name}</strong>?
            </p>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-danger"
              onClick={() => handleConfirmDelete(productToDelete?.id)}
            >
              Delete
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={handleCancelDelete}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DeleteModal;