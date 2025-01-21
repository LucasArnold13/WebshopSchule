import {API_BASE_URL, apiCall} from "."; 

export const fetchCategories = async () => {
    return await apiCall({
        url: `${API_BASE_URL}api/categories`,
        method: 'GET',
    });
};  

export const fetchCategory = async (id) => {
    return await apiCall({
        url: `${API_BASE_URL}api/categories/${id}`,
        method: 'GET',
    });
};

export const createCategory = async (category) => {
    return await apiCall({
        url: `${API_BASE_URL}api/categories`,
        method: 'POST',
        body: category
    });
};

export const updateCategory = async (category) => {
    return await apiCall({
        url: `${API_BASE_URL}api/categories/${category.id}`,
        method: 'PUT',
        body: category
    });
};