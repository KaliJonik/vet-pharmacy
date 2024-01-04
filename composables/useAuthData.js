export const useAuthToken = () => {
    return useCookie("auth_token");
};

export const useAuthData = () => {
    return useCookie("refresh_token");
};

export const useUser = () =>{
    return useCookie("user_data")
}