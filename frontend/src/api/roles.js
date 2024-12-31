import {API_BASE_URL, apiCall} from ".";


export const fetchRoles = async () => {
    return await apiCall({
        url: `${API_BASE_URL}api/backend/roles`,
        method: 'GET',
    });
    }