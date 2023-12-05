import { useAuthToken } from "~/composables/useAuthData";

export const useAuth = () => {
    const token = useAuthToken();
    // const authUser = useAuthData();

    const setToken = (t) => {
        token.value = t;
    };
    // const setUser = (user) => {
    //     authUser.value = user;
    // };

    const login = async (phone_number, password) => {
        const { data: token } = await useAsyncData(() => $fetch('/token/', {
            method: 'POST',
            body: { phone_number, password }
        }));
        console.log(token.value.access)
        setToken(token.value.access);
        
       
    }

    const registrations = async (phone_number, password1, password2) => {
        const { data: user, status } = await useAsyncData(() => $fetch('/user/', {
            method: 'POST',
            body: { phone_number, password1, password2 }
        }));

        return { user, status };
    };
    const change_password = async(old_password, new_password) =>{
        const { data:reset } = await useAsyncData(()=>$fetch('/user/change-password/', {
            method:'POST',
            body:{ old_password, new_password}
        }))
        return reset;
    }
    // const my_profile = async () => {
        
    //     const { data: me } = await useAsyncData(() => $fetch('/auth/users/me/'))
    //     console.log(me.value)
    //     return me;

    // }


    const logout = async () => {
        setUser(null);
        // setToken(null);
    };
    return {
        login,
        logout,
        registrations,
        change_password
    };
};