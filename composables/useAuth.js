import { useAuthToken, useUser } from "~/composables/useAuthData";

export const useAuth = () => {
    const token = useAuthToken();
    const refresh = useAuthData();
    const setToken = (t) => {
        token.value = t;
    };
    const setTokenRefresh = (t) => {
        refresh.value = t
    }


    const login = async (phone_number, password) => {
        const { data: token } = await useAsyncData(() => $fetch('/token/', {
            method: 'POST',
            body: { phone_number, password }
        }));

        setToken(token.value.access);
        setTokenRefresh(token.value.refresh)
    }

    const registrations = async (phone_number, password1, password2) => {
        const { data: user, status } = await useAsyncData(() => $fetch('/user/', {
            method: 'POST',
            body: { phone_number, password1, password2 }
        }));
        
        return { user, status };
    };
    const change_password = async (old_password, new_password) => {
        const { data: reset } = await useAsyncData(() => $fetch('/user/change-password/', {
            method: 'POST',
            body: { old_password, new_password }
        }))
        return reset;
    };
    const reset_password = async (phone_number) => {
        const { data: reset } = await useAsyncData(() => $fetch('/user/reset-password/', {
            method: 'PATCH',
            body: { phone_number }
        }))
        return reset
    }

    const my_order  = async (full_name, phone, address, is_delivery ) => {
        try {
            const cards = JSON.parse(localStorage.getItem('cards'));
            const details = cards.map(({ id, quantity }) => ({
                value: quantity,
                product: id
              }));
            const { data: orders } = await useAsyncData(() => $fetch('/order/', {
                method: 'POST',
                body: { details, full_name, phone, address, is_delivery }

            }))
            return orders;

        } catch (error) {
            console.error('Error:', error);
        }
    };

    const feedback = async(contact, title, message)=>{
        try{

            const { data:resp } = await useAsyncData(()=>$fetch('/feedback/', {
                method:'POST',
                body:{contact, title, message}
            }))
            return resp;
            
        } catch(error){
            console.error(error)
        }
    }


    const logout = () => {
        setToken(null);
        localStorage.removeItem('user')
        setTokenRefresh(null);
        window.location.reload();
    };
    return {
        login,
        logout,
        registrations,
        change_password,
        reset_password,
        my_order,
        feedback

    };
};