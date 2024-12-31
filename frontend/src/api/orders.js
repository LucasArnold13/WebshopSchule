import { BASE_API_IMAGES_URL, apiCall } from ".";

export const fetchOrders = async () => {
    return await apiCall({
        url: `${BASE_API_IMAGES_URL}api/backend/orders`,
        method: 'GET',
    });
};

export const fetchOrder = async (id) => {
    return await apiCall({
        url: `${BASE_API_IMAGES_URL}api/backend/orders/${id}`,
        method: 'GET',
    });
};
