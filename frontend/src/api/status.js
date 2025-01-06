import {API_BASE_URL, apiCall} from ".";


export const fetchStatus = async () => {
    return await apiCall({
        url: `${API_BASE_URL}api/backend/status`,
        method: 'GET',
    });
    }