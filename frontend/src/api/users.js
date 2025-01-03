import { apiCall, API_BASE_URL } from ".";



export const fetchUsers = async () => {
    return await apiCall({
        url: `${API_BASE_URL}api/backend/users`,
        method: 'GET',
    });
    }

export const fetchUser = async (id) => {
    const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    // Verzögerung von z.B. 2 Sekunden
    //await delay(2000);
    return await apiCall({
        url: `${API_BASE_URL}api/backend/users/${id}`,
        method: 'GET',
    });
    }

export const updateUser = async (user) => {
    return await apiCall({
        url: `${API_BASE_URL}api/backend/users/${user.id}`,
        method: 'PUT',
        body: user, 
    });
    }

export const createUser = async (user) => {
    return await apiCall({
        url: `${API_BASE_URL}api/backend/users`,
        method: 'POST',
        body: user, 
    });
    }