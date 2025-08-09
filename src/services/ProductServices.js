// Create Product
export async function fetchProducts() {
  const response = await fetch("https://api.restful-api.dev/objects");
  if (!response.ok) throw new Error("Failed to fetch products");
  return response.json();
}

// Delete Product
export async function deleteProduct(id) {
  const response = await fetch(`https://api.restful-api.dev/objects/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) throw new Error("Failed to delete product");
  return response.json();
}