export async function fetchProducts() {
  const response = await fetch("https://api.restful-api.dev/objects");
  if (!response.ok) throw new Error("Failed to fetch products");
  return response.json();
}