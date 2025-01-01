import { API_BASE_URL, apiCall } from ".";


export const fetchCustomers = async () => {
    return await apiCall({
        url: `${API_BASE_URL}api/backend/customers`,
        method: 'GET',
    });
};

export const fetchCustomer = async (id) => {
    return await apiCall({
        url: `${API_BASE_URL}api/backend/customers/${id}`,
        method: 'GET',
    });
};

export const updateCustomer = async (id, data) => {
    return await apiCall({
        url: `${API_BASE_URL}api/backend/customers/${id}`,
        method: 'PUT',
        data
    });
};

export const createCustomer = async (data) => {
    return await apiCall({
        url: `${API_BASE_URL}api/backend/customers`,
        method: 'POST',
        data
    });
};