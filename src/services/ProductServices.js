// Create Product
export async function fetchProducts() {
  const response = await fetch("https://api.restful-api.dev/objects");
  if (!response.ok) throw new Error("Failed to fetch products");
  return response.json();
}

// Create product
export async function createProduct(product) {
  const response = await fetch("https://api.restful-api.dev/objects", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(product),
  });
  if (!response.ok) throw new Error("Failed to create product");
  const responseData = await response.json();
  console.log("🚀 ~ createProduct ~ response.json():", responseData);
  return responseData;
}

// Delete Product
export async function deleteProduct(id) {
  const response = await fetch(`https://api.restful-api.dev/objects/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) throw new Error("Failed to delete product");
  return response.json();
}