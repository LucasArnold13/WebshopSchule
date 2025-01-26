

export const apiCall = async ({
    url,
    method,
    body = null,
    headers = {},
    showSnackbar = false,
    credentials = 'include',
    catchError = () => { },
    ignoreHttpStatus = false
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

        if (ignoreHttpStatus) {
            return { status: response.status, data };
        }
  
        if (response.status === 401) // Unauthorized
        {
            window.dispatchEvent(
                new CustomEvent("snackbar", {
                    detail: { message: data.message, severity: "error" },
                })
            );
            if (window.location.pathname !== "/backend/login") {
                window.location.href = "/backend/login";
            }

            return {status : response.status};
        }
        else if (response.status === 403) // Forbidden
        {
            window.location.href = "/backend/";
        }
        else if (response.status === 404) // not found
        {
            if (window.location.pathname !== "/backend") {
                window.location.href = "/backend/404";
            }
        }
        else if (response.status === 500) // internal server error
        {
        }
        else if (response.status === 400) // bad request
        {
            if(showSnackbar){
                window.dispatchEvent(
                    new CustomEvent("snackbar", {
                        detail: { message: data.message, severity: "error" },
                    })
                );
            }
            return {status : response.status, data};
        }
        else if (response.ok) // success
        {
            if(showSnackbar){
                window.dispatchEvent(
                    new CustomEvent("snackbar", {
                        detail: { message: data.message, severity: "success" },
                    })
                );
            }
            return {status : response.status, data};
        }

    } catch (error) {
        catchError(error);
    }
};

export const API_BASE_URL = "http://localhost:3000/";


