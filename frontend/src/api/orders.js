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

export const updateOrder = async (order) => {
    return await apiCall({
        url: `${API_BASE_URL}api/orders/${order.id}`,
        method: 'PUT',
        body : order
    });
};

export const createOrder = async (order) => {
    return await apiCall({
        url: `${API_BASE_URL}api/orders`,
        method: 'POST',
        body : order
    });
};
