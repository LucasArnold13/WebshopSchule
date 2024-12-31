import {API_BASE_URL, apiCall} from "."; 

export const fetchCategories = async () => {
    return await apiCall({
        url: `${API_BASE_URL}api/backend/categories`,
        method: 'GET',
    });
};  

export const fetchCategory = async (id) => {
    return await apiCall({
        url: `${API_BASE_URL}api/backend/categories/${id}`,
        method: 'GET',
    });
};