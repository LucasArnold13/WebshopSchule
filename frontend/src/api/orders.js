import { API_BASE_URL, apiCall } from ".";

export const fetchOrders = async () => {
    return await apiCall({
        url: `${API_BASE_URL}api/backend/orders`,
        method: 'GET',
    });
};

export const fetchOrder = async (id) => {
    return await apiCall({
        url: `${API_BASE_URL}api/backend/orders/${id}`,
        method: 'GET',
    });
};

export const updateOrder = async (order) => {
    return await apiCall({
        url: `${API_BASE_URL}api/backend/orders/${order.id}`,
        method: 'PUT',
        body : order
    });
};
