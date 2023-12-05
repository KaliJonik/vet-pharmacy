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

                    <v-menu v-model="isMenuOpen" >
                        <template v-slot:activator="{ props }">
                            <v-btn color="#0F9D58" class="mx-3 px-0 align-self-center button-lang" v-bind="props">
                                <v-icon left>mdi-translate</v-icon>

                                <v-icon small right>mdi-menu-down</v-icon>
                            </v-btn>
                        </template>
                        <v-list>
                            <v-list-item v-for="(item, index) in locales" :key="index" @click="changeLocale(item.code)">
                                <v-list-item-title>{{ item.code }}</v-list-item-title>
                            </v-list-item>
                        </v-list>
                    </v-menu>

                    <v-badge :content="store.cards.length">
                        <nuxt-link to="/basket" class="cart-btn">
                            <i class='bx bx-cart-alt'></i>
                        </nuxt-link>
                    </v-badge>
  
                
                    <v-menu v-model="menu" :close-on-content-click="false">
                        <template v-slot:activator="{ props }">
                            <v-btn class="mx-3 profile-button" color="#0F9D58" icon="mdi-account" v-bind="props" />
                        </template>
                        <v-card width="370px">
                            <v-card-title class="text-center my-3">Профиль</v-card-title>
                            <v-card-text>
                                <div class="d-flex align-center justify-center">
                                    <span class="text-h6">+998974083121</span>  <v-btn class="mx-3 close-button" width="35px" height="35px" color="#0F9D58" icon="mdi-close-octagon-outline"/>
                                </div>
                            </v-card-text>
                            <v-card-text>
                                <v-form v-model="valid" @submit.prevent="Change_password" ref="form" lazy-validation>
                                    <v-text-field :append-inner-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                                        v-model="Update.password1" :rules="[rules.passwordRequired, rules.min]"
                                        :type="show1 ? 'text' : 'password'" counter
                                        @click:append-inner="togglePasswordVisibility" prepend-icon="mdi-lock" dense
                                        outlined label="Please enter your password" required />

                                    <v-text-field :append-inner-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                                        v-model="Update.password2"
                                        :rules="[rules.passwordRequired, rules.min]"
                                        :type="show1 ? 'text' : 'password'" counter
                                        @click:append-inner="togglePasswordVisibility" prepend-icon="mdi-lock" dense
                                        outlined label="Please confirm your password" required />
                                        <v-card-actions class="text-end">
                                <v-btn variant="text" @click="menu = false">
                                    Отмена
                                </v-btn>
                                <v-btn color="#" variant="text" type="submit" @click="menu = false">
                                    Сбросить
                                </v-btn>
                            </v-card-actions>
                                </v-form>
                            </v-card-text>
                           

                        </v-card>
                    </v-menu>




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
const { change_password } = useAuth();


const menu = ref(false);
const show1 = ref(false);
const togglePasswordVisibility = () => {
    show1.value = !show1.value;
};
let activLang = ref('ru')
const { locales, locale } = useI18n();

const Update = ref({
    password1: '',
    password2: ''
})


const scrollToTop = () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
};
const valid = ref(false);


const rules = {
    phonenumber: (value) => {
        const pattern = /^\+?\d{12}$/;
        return pattern.test(value) || "Your phone number should look like +998993332211";
    },
    phoneRequired: (value) => !!value || "You must enter your phone",
    passwordRequired: (value) => !!value || "Your password is required",
    min: (v) => v.length >= 4 || "Your password must be at least 8 characters",
};
const changeLocale = (selectedLocale) => {
    activLang.value = selectedLocale;
    locale.value = selectedLocale;
    isMenuOpen.value = false;
}


async function Change_password() {
  if (valid.value) {
    try {
      await change_password(Update.value.password1, Update.value.password2);
    } catch (error) {
      console.error(error);

    }
  }
}


onMounted(() => {
    mobilenav();
    topnavmenu();
    useBackToTop();
    store.loadCards();

});






</script>

<style scoped>
.button-lang {
    height: 48px !important;
    width: 48px !important;
    border-radius: 15px !important;
    box-shadow: none !important;
}
.close-button{
    border-radius: 10px;
}
.profile-button {
    box-shadow: none !important;
    border-radius: 15px !important;
}

.custom-menu {
  max-width: 400px; 
  min-width: 100px; 

  position: absolute;
  top: 0;
  right: 0;
}


</style>