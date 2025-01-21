export const API_BASE_URL = "http://localhost:3000/";


export const apiCall = async ({
    url,
    method,
    body = null,
    headers = {},
    credentials = 'include',
    catchError = () => { }
}) => {
    try {
        const options = {
            method,
            headers: {
                'Content-Type': 'application/json',
                ...headers,
            },
            credentials,
        };
        if (body) {
    
            options.body = JSON.stringify(body);
        }
        const response = await fetch(url, options);
        const data = await response.json();
        
        return {status : response.status, data};
    } catch (error) {
        catchError(error); 
    }
};


