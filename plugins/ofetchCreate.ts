import { ofetch } from 'ofetch'
export default defineNuxtPlugin(async (nuxtApp) => {
    globalThis.$fetch = await ofetch.create({
        
        onRequest({ request, options }) {
            const config = useRuntimeConfig();
            const token = useAuthToken();
            if (!request.toString().startsWith('/_')) {
                options.baseURL = config.public.baseUrl;
                options.headers = {
                    ...options.headers,
                    Authorization: token.value !== undefined ? `Bearer ${token.value}`:'',
                };

            } else {
                options.baseURL = '';
            }
        },
        onResponseError({ response }){
            if(response.status === 401 || response.status === 419 ){
                const token = useAuthToken();
                token.value = null;
            }
        }
    });

    
});