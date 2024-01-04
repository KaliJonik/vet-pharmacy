<template>
    <!-- /dall-e-cat.png -->
 <section id="home" class="fullheight align-items-center bg-img bg-img-fixed"
        style="background-image: url(/БелаяКурка1.webp); color:black;">
        <div class="container">
            <div class="row">
                <div class="col-6 col-xs-12">
                    <div class="slogan">
                        <h1 class="left-to-right play-on-scroll">
                            <img v-for="{id, logo} in store.about" :key="id" :src="logo" alt="" width="300" height="300">
                        </h1>
                        <p class="left-to-right play-on-scroll delay-1 font-home">
                            Добро пожаловать в ветеринарную аптеку<span style="margin-left: 3px ; font-weight: 600;" class="text-black">SAMVETSERVIS</span>. Наш Центр Птицеводства предлагает широкий ассортимент высококачественной продукции для здоровья и благополучия вашей домашней птицы и других домашних питомцев.
                        </p>
                        <div class="left-to-right play-on-scroll delay-4">
                            <nuxt-link to="/products">
                            <button>
                                {{ $t('order') }}
                            </button>
                        </nuxt-link>
                        </div>
                    </div>
                </div>
              
            </div>
        </div>
    </section>
</template>

<script setup>
import { productStore } from '@/stores/product';

const store = productStore();
</script>

<style scoped>
.font-home{
    color: rgb(255, 255, 255);
    font-size: 22px; 
    font-weight:500;
}
</style>
