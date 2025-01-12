import { API_BASE_URL, apiCall } from ".";


export const getDashboardData = async () => {
    return await apiCall({
        url: `${API_BASE_URL}api/backend/dashboard`,
        method: 'GET',
    });
};