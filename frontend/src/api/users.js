import { apiCall, API_BASE_URL } from ".";



export const fetchUsers = async () => {
    return await apiCall({
        url: `${API_BASE_URL}api/users`,
        method: 'GET',
    });
    }

export const fetchUser = async (id) => {
    const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    // Verzögerung von z.B. 2 Sekunden
    //await delay(2000);
    return await apiCall({
        url: `${API_BASE_URL}api/users/${id}`,
        method: 'GET',
    });
    }

export const updateUser = async (user) => {
    return await apiCall({
        url: `${API_BASE_URL}api/users/${user.id}`,
        method: 'PUT',
        body: user, 
        showSnackbar : true
    });
    }

    export const updateUserPassword = async (password, id) => {
        return await apiCall({
            url: `${API_BASE_URL}api/users/${id}/password`,
            method: 'POST',
            body: {password}, 
            showSnackbar : true
        });
        }

export const createUser = async (user) => {
    return await apiCall({
        url: `${API_BASE_URL}api/users`,
        method: 'POST',
        body: user, 
        showSnackbar : true
    });
    }

export const loginUser = async (data) => {
    return await apiCall({
        url: `${API_BASE_URL}api/users/login`,
        method: 'POST',
        body: data, 
    });
    }

export const logoutUser = async () => {
    return await apiCall({
        url: `${API_BASE_URL}api/users/logout`,
        method: 'DELETE',
    });
    }

export const authUser = async () => {
    return await apiCall({
        url: `${API_BASE_URL}api/users/auth/refresh`,
        method: 'GET',
        //showSnackbar : true
    });
    }