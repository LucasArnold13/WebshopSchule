export const API_BASE_URL = "http://localhost:3000/";


export const apiCall = async ({
    url,
    method,
    body = null,
    headers = {},
    credentials = 'include',
    responseOkay = () => { },
    responseNotOkay = () => { },
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

        if (response.ok) {
            responseOkay(data.message); 
        } else {
            responseNotOkay(data.message);
        }

        return data;
    } catch (error) {
        catchError(error); 
    }
};


