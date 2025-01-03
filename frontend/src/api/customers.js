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

export const updateCustomer = async (customer) => {
    return await apiCall({
        url: `${API_BASE_URL}api/backend/customers/${customer.id}`,
        method: 'PUT',
        body : customer
    });
};

export const createCustomer = async (customer) => {
    return await apiCall({
        url: `${API_BASE_URL}api/backend/customers`,
        method: 'POST',
        body : customer
    });
};