let fallbackIdCounter = 14;
// Fetch Product
export async function fetchProducts() {
  const response = await fetch("https://api.restful-api.dev/objects");
  if (!response.ok) throw new Error("Failed to fetch products");
  const products = await response.json();
  return products.map((product) => ({
    ...product,
    id_counter: isNaN(Number(product.id)) ? fallbackIdCounter++ : Number(product.id), // Add id_counter
  }));
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
  const createdProduct = await response.json();
  return {
    ...createdProduct,
    id_counter: isNaN(Number(createdProduct.id)) ? fallbackIdCounter++ : Number(createdProduct.id), // Add id_counter
  };
}

// update Product
export async function updateProduct(product) {
  const response = await fetch(`https://api.restful-api.dev/objects/${product.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(product),
  });
  if (!response.ok) throw new Error("Failed to update product");
  const updatedProduct = await response.json();
  return {
    ...updatedProduct,
    id_counter: product.id_counter, 
  };
}

// Delete Product
export async function deleteProduct(id) {
  const response = await fetch(`https://api.restful-api.dev/objects/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) throw new Error("Failed to delete product");
  return response.json();
}