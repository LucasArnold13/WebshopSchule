import { API_BASE_URL, apiCall } from ".";


export const fetchaddressesFrontend = async () => {
    return await apiCall({
        url: `${API_BASE_URL}api/address/frontend`,
        method: 'GET',
    });
};