<template>
    <!-- MOBILE NAV -->
    <div class="mb-nav">
        <div class="mb-move-item"></div>
        <div class="mb-nav-item active">
            <nuxt-link :to="{ path: '/', hash: '#home' }">
                <i class="bx bxs-home"></i>
            </nuxt-link>
        </div>
        <div class="mb-nav-item">
            <nuxt-link :to="{ path: '/', hash: '#about' }">
                <i class='bx bxs-wink-smile'></i>
            </nuxt-link>
        </div>
        <div class="mb-nav-item">
            <nuxt-link to="/products">
                <i class='bx bxs-food-menu'></i>
            </nuxt-link>
        </div>
        <div class="mb-nav-item">
            <nuxt-link :to="{ path: '/', hash: '#testimonial' }">
                <i class='bx bxs-comment-detail'></i>
            </nuxt-link>
        </div>
    </div>
    <!-- END MOBILE NAV -->
    <!-- BACK TO TOP BTN -->
    <button class="back-to-top" @click="scrollToTop">
        <i class="bx bxs-to-top"></i>
    </button>
    <!-- END BACK TO TOP BTN -->
    <!-- TOP NAVIGATION -->
    <div class="nav">
        <div class="menu-wrap">
            <a href="#home">
                <div class="logo">
                    SVS
                </div>
            </a>

            <div class="menu h-xs">

                <nuxt-link :to="{ path: '/', hash: '#home' }">
                    <div class="menu-item active">
                        {{ $t("home") }}
                    </div>
                </nuxt-link>

                <nuxt-link :to="{ path: '/', hash: '#about' }">
                    <div class="menu-item">
                        {{ $t("about") }}
                    </div>
                </nuxt-link>

                <nuxt-link :to="{ path: '/products', hash: '' }">
                    <div class="menu-item">
                        {{ $t("products") }}
                    </div>
                </nuxt-link>

                <nuxt-link :to="{ path: '/', hash: '#testimonial' }">
                    <div class="menu-item">
                        {{ $t("manufacture") }}
                    </div>
                </nuxt-link>

            </div>
            <div class="right-menu">

                <div class="d-flex mx-3">

                    <v-menu v-model="isMenuOpen">
                    <template v-slot:activator="{ props }">
                        <v-btn color="#0F9D58" class="mx-3 px-0 align-self-center button-lang" v-bind="props">
                            <v-icon left>mdi-translate</v-icon>
                        
                            <v-icon small right>mdi-menu-down</v-icon>
                        </v-btn>
                    </template>
                    <v-list>
                        <v-list-item  v-for="(item, index) in locales" :key="index" @click="changeLocale(item.code)">
                            <v-list-item-title>{{ item.code }}</v-list-item-title>
                        </v-list-item>
                    </v-list>
                </v-menu>

                <v-badge :content="store.cardLenght">
                    <nuxt-link to="/basket" class="cart-btn">
                        <i class='bx bx-cart-alt'></i>
                    </nuxt-link>
                </v-badge>



                </div>


            </div>

        </div>
    </div>
    <!-- END TOP NAVIGATION -->
</template>

<script setup>
import { mobilenav } from '@/composables/mainjs/mobilenav';
import { topnavmenu } from '@/composables/mainjs/top_NavMenu';
import { useBackToTop } from '@/composables/mainjs/back_tot_top';
import { productStore } from "@/stores/product";

const store = productStore();
const isMenuOpen = ref(false);
let activLang = ref('ru')
const { locales, locale } = useI18n();


const scrollToTop = () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
};

const changeLocale = (selectedLocale) => {
    activLang.value = selectedLocale;
    locale.value = selectedLocale;
    isMenuOpen.value = false;
  }
onMounted(() => {
    mobilenav();
    topnavmenu();
    useBackToTop();
});

</script>

<style scoped>
.button-lang{
    height: 48px!important; 
    width: 48px!important; 
    border-radius: 15px!important;
    box-shadow: none!important;
}

</style>