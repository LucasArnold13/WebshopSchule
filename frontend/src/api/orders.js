import { API_BASE_URL, apiCall } from ".";

export const fetchOrders = async () => {
    return await apiCall({
        url: `${API_BASE_URL}api/orders`,
        method: 'GET',
    });
};

export const fetchOrder = async (id) => {
    return await apiCall({
        url: `${API_BASE_URL}api/orders/${id}`,
        method: 'GET',
    });
};

export const fetchOrderFrontend = async (id) => {
    return await apiCall({
        url: `${API_BASE_URL}api/orders/${id}/frontend`,
        method: 'GET',
        ignoreHttpStatus : true
    });
};

export const fetchOrderForEdit = async (id) => {
    return await apiCall({
        url: `${API_BASE_URL}api/orders/${id}/edit`,
        method: 'GET',
    });
};


export const updateOrder = async (order) => {
    return await apiCall({
        url: `${API_BASE_URL}api/orders/${order.id}`,
        method: 'PUT',
        body : order,
        showSnackbar : true
    });
};

export const createOrder = async (order) => {
    return await apiCall({
        url: `${API_BASE_URL}api/orders`,
        method: 'POST',
        body : order,
        showSnackbar : true
    });
};

export const createOrderFrontend = async (order) => {
    return await apiCall({
        url: `${API_BASE_URL}api/orders/frontend`,
        method: 'POST',
        body : order,
        showSnackbar : true
    });
};

export const fetchOrderFromCustomer = async () => {
    return await apiCall({
        url: `${API_BASE_URL}api/orders/customer`,
        method: 'GET',
    });
};