export const useAuthToken = () => {
    return useCookie("auth_token");
};

export const useAuthData = () => {
    return useCookie("user");
};