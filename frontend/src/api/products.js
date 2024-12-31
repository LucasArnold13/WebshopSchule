import { apiCall, API_BASE_URL } from ".";



export const fetchProducts = async () => {
    return await apiCall({
        url: `${API_BASE_URL}api/backend/products`,
        method: 'GET',
    });
};

export const fetchProduct = async (id) => {
    return await apiCall({
        url: `${API_BASE_URL}api/backend/products/${id}`,
        method: 'GET',
    });
}; 