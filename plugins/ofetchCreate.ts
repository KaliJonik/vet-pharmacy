import { ofetch } from 'ofetch'
export default defineNuxtPlugin(async (nuxtApp) => {
    globalThis.$fetch = await ofetch.create({
        onRequest({ request, options }) {
            const config = useRuntimeConfig();

            if (!request.toString().startsWith('/_')) {
                options.baseURL = config.public.baseUrl;

            } else {
                options.baseURL = '';
            }
        }
    });
    
});