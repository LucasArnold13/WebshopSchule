import { apiCall, API_BASE_URL } from ".";



export const fetchProducts = async () => {
    return await apiCall({
        url: `${API_BASE_URL}api/products`,
        method: 'GET',
    });
};

export const fetchProduct = async (id) => {
    return await apiCall({
        url: `${API_BASE_URL}api/products/${id}`,
        method: 'GET',
    });
};

export const fetchProductWithName = async (name) => {
    return await apiCall({
        url: `${API_BASE_URL}api/products/name/${name}`,
        method: 'GET',
    });
};

export const searchProducts = async (query) => {
    return await apiCall({
        url: `${API_BASE_URL}api/products/search/query?q=${query}`,
        method: 'GET',
    });
};

export const createProduct = async (product) => {
    return await apiCall({
        url: `${API_BASE_URL}api/products`,
        method: 'POST',
        body: product,
    });
};

export const updateProduct = async (product) => {
    return await apiCall({
        url: `${API_BASE_URL}api/products/${product.id}`,
        method: 'PUT',
        body: product,
    });
}