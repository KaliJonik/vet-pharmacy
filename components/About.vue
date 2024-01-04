<template>
    <section class="about fullheight align-items-center" id="about">
        <div class="container mt-10">
            <div class="d-flex  justify-center">
                <div class="image-about">
                    <img src="/Propere.webp" alt="" class="fullwidth left-to-right play-on-scroll">
                </div>
                <div class="col-12 col-xs-12 align-items-center" v-for="{id , content } in store.about" :key="id">
                    <div class="about-slogan right-to-left play-on-scroll">
                        <h1 class="about-title">
                            <span class="primary-color">{{ content[$i18n.locale].title }}</span>
                        </h1>
                        <div class="text-start" v-html="content[$i18n.locale].description"></div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import { animation } from '@/composables/mainjs/on_scroll_animation';
import { productStore } from '@/stores/product';

const store = productStore();



onMounted(() => {
  animation();
})
</script>

<style scoped>

.about-title{
    font-size: 24px;
    margin-bottom: 0rem;
}
.image-about{
    width: 300px;
    height: 300px;
}
</style>