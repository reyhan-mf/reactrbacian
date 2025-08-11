import Table from "react-bootstrap/Table";
import EditIcon from "../components/Icons/EditIcon";
import TrashIcon from "../components/Icons/DeleteIcon";
8;
function CustomTable({ role, products, handleEdit, handleDeleteModal }) {
  return (
    <Table responsive className="custom-table">
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
              <div style={{ margin: "15px 15px" }} />
              {product.updatedAt
                ? `Updated At: ${new Date(
                    product.updatedAt
                  ).toLocaleDateString()} ${new Date(
                    product.updatedAt
                  ).toLocaleTimeString()}`
                : ""}
              <div style={{ margin: "15px 15px" }} />
            </td>
            <td>{product.name}</td>
            <td>
              {product.data && Object.keys(product.data).length > 0 ? (
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
            {role === "admin" || role === "editor" ? (
              <td>
                <div className="action-buttons">
                  <button
                    className="icon-btn icon-btn-edit"
                    onClick={() => handleEdit(product)}
                    title="Edit Product"
                  >
                    <EditIcon />
                  </button>
                  <button
                    className="icon-btn icon-btn-delete"
                    onClick={() => handleDeleteModal(product)}
                    title="Delete Product"
                  >
                    <TrashIcon />
                  </button>
                </div>
              </td>
            ) : null}

          </tr>
        ))}
      </tbody>
    </Table>
  );
}

export default CustomTable;
