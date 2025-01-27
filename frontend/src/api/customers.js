import { API_BASE_URL, apiCall } from ".";


export const fetchCustomers = async () => {
    return await apiCall({
        url: `${API_BASE_URL}api/customers`,
        method: 'GET',
    });
};

export const fetchCustomer = async (id) => {
    return await apiCall({
        url: `${API_BASE_URL}api/customers/${id}`,
        method: 'GET',
    });
};

export const fetchCustomerFrontend = async () => {
    return await apiCall({
        url: `${API_BASE_URL}api/customers/frontend/me`,
        method: 'GET',
    });
};

export const updateCustomer = async (customer) => {
    return await apiCall({
        url: `${API_BASE_URL}api/customers/${customer.id}`,
        method: 'PUT',
        body : customer,
        showSnackbar : true
    });
};

export const updateCustomerPassword = async (password, id) => {
    return await apiCall({
        url: `${API_BASE_URL}api/customers/${id}/password`,
        method: 'POST',
        body : {password},
        showSnackbar : true
    });
};

export const createCustomer = async (customer) => {
    return await apiCall({
        url: `${API_BASE_URL}api/customers`,
        method: 'POST',
        body : customer,
        showSnackbar : true
    });
};

export const searchCustomers = async (query) => {
    return await apiCall({
        url: `${API_BASE_URL}api/customers/search/query?q=${query}`,
        method: 'GET',
    });
};

export const loginCustomer = async (data) => {
    return await apiCall({
        url: `${API_BASE_URL}api/customers/login`,
        method: 'POST',
        body: data,
    });
};

export const authCustomer = async () => {
    return await apiCall({
        url: `${API_BASE_URL}api/customers/auth/refresh`,
        method: 'GET',
        ignoreHttpStatus: true,
    });
};

export const logoutCustomer = async () => {
    return await apiCall({
        url: `${API_BASE_URL}api/customers/logout`,
        method: 'DELETE',
        ignoreHttpStatus: true,
    });
};