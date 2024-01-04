<template>
    <!-- /dall-e-cat.png -->
 <section id="home" class="fullheight align-items-center bg-img bg-img-fixed"
        style="background-image: url(/БелаяКурка.webp); color:black;">
        <div class="container">
            <div class="row">
                <div class="col-6 col-xs-12">
                    <div class="slogan">
                        <h1 class="left-to-right play-on-scroll">
                            <img v-for="{id, logo} in store.about" :key="id" :src="logo" alt="" width="300" height="300">
                        </h1>
                        <p class="left-to-right play-on-scroll delay-2" style="color: black;">
                            {{ $t('welcome') }}
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

</style>
