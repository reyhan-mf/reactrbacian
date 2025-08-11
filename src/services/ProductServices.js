let fallbackIdCounter = 14;

// Fetch Product
export async function fetchProducts() {
  const response = await fetch("https://api.restful-api.dev/objects");
  if (!response.ok) throw new Error("Failed to fetch products");
  const products = await response.json();
  
  // Transform API products and mark them as cloned for local management
  return products.map((product) => ({
    ...product,
    id_counter: isNaN(Number(product.id)) ? fallbackIdCounter++ : Number(product.id), 
    // Only add createdAt/updatedAt if they exist in the original API response
    ...(product.createdAt && { createdAt: product.createdAt }),
    ...(product.updatedAt && { updatedAt: product.updatedAt }),
    isCloned: true,
    originalApiData: { ...product }, 
  }));
}

// Create product
export async function createProduct(product) {
  try {
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
      id_counter: isNaN(Number(createdProduct.id)) ? fallbackIdCounter++ : Number(createdProduct.id),
      createdAt: new Date().toISOString(),
      updatedAt: null,
      isCloned: false, 
      originalApiData: { ...product },
    };
  } catch (error) {
    console.error("API creation failed:", error);
    throw error;
  }
}

// Update Product - Hybrid approach
export async function updateProduct(product) {
  // If this is a cloned product (from original API fetch), update locally only
  if (product.isCloned) {
    console.log("Updating cloned product locally:", product.id);
    return {
      ...product,
      updatedAt: new Date().toISOString(),
      isLocallyModified: true, 
    };
  }
  
  // If this is a newly created product, try API update first
  if (product.canUpdateViaAPI) {
    try {
      const response = await fetch(`https://api.restful-api.dev/objects/${product.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: product.name,
          data: product.data,
        }),
      });
      
      if (!response.ok) throw new Error("Failed to update product via API");
      const updatedProduct = await response.json();
      
      return {
        ...updatedProduct,
        id_counter: product.id_counter,
        createdAt: product.createdAt,
        updatedAt: new Date().toISOString(),
        canUpdateViaAPI: true,
      };
    } catch (error) {
      console.warn("API update failed, falling back to local:", error);
      // Fall back to local update
      return {
        ...product,
        updatedAt: new Date().toISOString(),
        canUpdateViaAPI: false, 
        isLocallyModified: true,
      };
    }
  }
  
  // Default: local update only
  return {
    ...product,
    updatedAt: new Date().toISOString(),
    isLocallyModified: true,
  };
}

// Delete Product - Try API first, then local
export async function deleteProduct(id) {
  try {
    const response = await fetch(`https://api.restful-api.dev/objects/${id}`, {
      method: "DELETE",
    });
    
    if (!response.ok) throw new Error("Failed to delete product via API");
    return { success: true, deletedViaAPI: true };
  } catch (error) {
    console.warn("API deletion failed, removing locally only:", error);
    return { success: true, deletedViaAPI: false, localOnly: true };
  }
}

// Helper function to get locally stored products
export function getLocalProducts() {
  const localData = localStorage.getItem("products");
  return localData ? JSON.parse(localData) : [];
}

// Helper function to save products to local storage
export function saveProductsLocally(products) {
  localStorage.setItem("products", JSON.stringify(products));
}