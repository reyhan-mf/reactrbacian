import DeleteIcon from "../Icons/DeleteIcon";
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
            <h5 className="modal-title">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" style={{ marginRight: '0.5rem', color: 'var(--danger)' }}>
                <circle cx="12" cy="12" r="10"/>
                <path d="M15 9l-6 6M9 9l6 6" stroke="white" strokeWidth="2"/>
              </svg>
              Delete Product
            </h5>
            <button
              type="button"
              className="close-btn"
              onClick={handleCancelDelete}
              aria-label="Close"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18 6L6 18M6 6l12 12"/>
              </svg>
            </button>
          </div>
          <div className="modal-body">
            <div style={{ textAlign: 'center', padding: '1rem 0' }}>
              <svg width="100" height="100" viewBox="0 0 24 24" fill="var(--danger)" style={{ marginBottom: '1rem' }}>
                <path d="M3 6h18" stroke="currentColor" strokeWidth="2" fill="none"/>
                <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" stroke="currentColor" strokeWidth="2" fill="none"/>
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0v14m4-14v14" stroke="currentColor" strokeWidth="2" fill="none"/>
              </svg>
              <p style={{ fontSize: '1.1rem', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>
                Are you sure you want to delete this product?
              </p>
              <p style={{ fontSize: '1rem', fontWeight: '600', color: 'var(--primary-light)' }}>
                "{productToDelete?.name}"
              </p>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginTop: '1rem' }}>
                This action cannot be undone.
              </p>
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-danger"
              onClick={() => handleConfirmDelete(productToDelete?.id)}
            >
              <DeleteIcon size={4} color="currentColor" style={{ marginRight: '0.5rem' }} />
              Delete Product
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