<script setup>
import { productStore } from '@/stores/product';

const store = productStore();
const props = defineProps({
    error: Object
})
await store.getAbout();


const handleError = () => clearError({ redirect: '/' })
</script>

<template>

    <div class="error-page">
        <nuxt-link :to="{ path: '/', hash: '#home' }">
                <div class="logo text-white text-h2" style="font-weight: 600;">
                    SVS
                </div>
            </nuxt-link>
        <h2 class="font-email">{{ $t('not_found') }}</h2>
        
        <div v-for="{id, phone_number1, phone_number2, email} in store.about" :key="id">
            <p class="font-email text-h4">{{ $t('email') }}: &ensp;{{ email }}</p>
            
        <div class="phone-container">
            <div class="d-flex mr-2">
                <span>{{ $t('phone') }}: </span>
            </div>
            <div class="d-flex flex-column">
                <span> <a :href="'tel:' + phone_number1">{{ phone_number1 }}</a></span>
                <span> <a :href="'tel:' + phone_number2">{{ phone_number2 }}</a></span>
            </div>

        </div>
        </div>
       
        <h1 class="text-h1 font-404">{{ props.error.statusCode }}</h1>
        <v-btn class="mt-3" color="#0F9D58" @click="handleError">Назад</v-btn>
    </div>
</template>


<style scoped>
.error-page {
    background-size: cover;
    background-repeat: no-repeat;
    background-image: url('/БелаяКурка.webp');
    width: 100dvw;
    height: 100dvh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}
.phone-container {
    display: flex;
    font-size: 30px;
  }

  @media (max-width:600px){
 
    .font-email{
        font-size: 20px!important;
        color: white;
    }
    .phone-container {
        color: #fff;
  }
  .font-404{
    color:#fff;
  }
  }
</style>