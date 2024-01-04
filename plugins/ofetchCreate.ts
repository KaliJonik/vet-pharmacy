import { ofetch } from 'ofetch'
export default defineNuxtPlugin(async (nuxtApp) => {
  interface DataValueType {
    access: string;
  }
  globalThis.$fetch = await ofetch.create({

    onRequest({ request, options }) {
      const config = useRuntimeConfig();
      const token = useAuthToken();

      if (!request.toString().startsWith('/_')) {

        options.baseURL = config.public.baseUrl;

        options.headers = {
          ...options.headers,
          Authorization: token.value !== undefined ? `Bearer ${token.value}` : '',
        };

      } else {
        options.baseURL = '';
      }
    },
    onResponseError({ response }) {
    
        let tokenRef = useAuthData();
        let authToken = useAuthToken();
        if (response.status === 401 || response.status === 419) {
          useAsyncData(() =>

            $fetch('/token/refresh/', {
              method: 'POST',
              body: {
                refresh: tokenRef.value,
              },
            })
          ).then(({ data }) => {
            const typeofdata = data.value as DataValueType
            authToken.value = typeofdata.access
          }).catch((error) => {
            console.error(error)
            const { logout } = useAuth();
            logout();
          })
        }
     
    }
  })
})


