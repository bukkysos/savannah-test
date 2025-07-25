import axios from "axios";

interface ApiResponseSuccess {
    showing: boolean;
    type: "success";
    data: any;
    message: string | undefined;
}

interface ApiResponseError {
    showing: boolean;
    type: "error";
    data: null;
    message: string | undefined;
}

type ApiResponse = ApiResponseSuccess | ApiResponseError;

const apiRequest = async (method: string, url: string, payload?: any): Promise<ApiResponse> => {
    try {
        const response = await axios({
            method: method,
            url: url,
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            data: payload
        });
        return {
            showing: true,
            type: "success",
            data: response?.data,
            message: response?.data?.msg ??
                response?.data?.message ??
                response?.data?.data?.msg ??
                response?.data?.data?.message
        };
    } catch (error: any) {
        return {
            showing: true,
            type: "error",
            data: null,
            message:
                error.response?.data?.msg ??
                error.response?.data?.errors?.[0]?.message ??
                error.response?.data?.errors?.details[0]?.message ??
                error.response?.data?.message ??
                error?.message ??
                error.response?.data?.err?.message
        }
    }
};

export const handleFetchUsers = async (url: string) => {
    const response = await apiRequest('get', url);
    if (response.type === "error") {
        throw new Error(response.message || "Unknown error");
    }
    return response;
};

export const handleFetchAllPostsByUser = async (userId: string) => {
    const response = await apiRequest(
        'get',
        `https://savannah-backend-production.up.railway.app/users/${userId}/posts`
    )
    if (response.type === "error") {
        throw new Error(response.message || "Unknown error");
    }
    return response;
};

export const handleUserPostAction = async (userId: string, payload: any) => {
    const response = await apiRequest(
        'post',
        `https://savannah-backend-production.up.railway.app/users/posts/add/${userId}`,
        payload
    )
    if (response.type === "error") {
        throw new Error(response.message || "Unknown error");
    }
    return response;
};