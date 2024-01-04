<template>
    <!-- MOBILE NAV -->
    <div class="mb-nav">
        <div class="mb-move-item"></div>
        <div class="mb-nav-item active">
            <nuxt-link :to="{ path: '/', hash: '#home' }">
                <v-icon icon="mdi-home" color="grey" />
            </nuxt-link>
        </div>
        <div class="mb-nav-item">
            <nuxt-link :to="{ path: '/', hash: '#about' }">
                <v-icon icon="mdi-information-outline" color="grey" />
            </nuxt-link>
        </div>
        <div class="mb-nav-item">
            <nuxt-link :to="{ path: '/', hash: '#delivery' }">
                <v-icon icon="mdi-truck" color="grey" />
            </nuxt-link>
        </div>
        <div class="mb-nav-item">
            <nuxt-link :to="{ path: '/', hash: '#manufacture' }">

                <v-icon icon="mdi-handshake" color="grey" />

            </nuxt-link>
        </div>
        <div class="mb-nav-item">
            <nuxt-link to="/products">
                <v-icon icon="mdi-medical-bag" color="grey" />
            </nuxt-link>
        </div>


    </div>
    <!-- END MOBILE NAV -->

    <!-- BACK TO TOP BTN -->
    <button class="back-to-top" @click="scrollToTop">
        <v-icon icon="mdi-arrow-up" color="#fff" size="small" />
    </button>


    <div class="nav">
        <div class="menu-wrap">
            <nuxt-link :to="{ path: '/', hash: '#home' }">
                <div class="logo">
                    SVS
                </div>
            </nuxt-link>

            <div class="menu h-xs">

                <nuxt-link :to="{ path: '/', hash: '#home' }">
                    <div class="menu-item active" data-target="home">
                        {{ $t("home") }}
                    </div>
                </nuxt-link>

                <nuxt-link :to="{ path: '/', hash: '#about' }">
                    <div class="menu-item" data-target="about">
                        {{ $t("about") }}
                    </div>
                </nuxt-link>
                <nuxt-link :to="{ path: '/', hash: '#delivery' }">
                    <div class="menu-item" data-target="delivery">
                        {{ $t('delivery') }}
                    </div>
                </nuxt-link>
                <nuxt-link :to="{ path: '/', hash: '#manufacture' }">
                    <div class="menu-item" data-target="manufacture">
                        {{ $t("manufacture") }}
                    </div>
                </nuxt-link>
                <nuxt-link :to="{ path: '/products', hash: '' }">
                    <div class="menu-item">
                        {{ $t("products") }}
                    </div>
                </nuxt-link>
            </div>
            <div class="right-menu">

                <div class="d-flex mx-3">

                    <v-menu v-model="isMenuOpen">
                        <template v-slot:activator="{ props }">
                            <v-btn color="#0F9D58" width="48px" class="mx-3 px-0 align-self-center button-lang"
                                v-bind="props">
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
                        <nuxt-link to="/basket" class="basket-btn">
                            <v-icon icon="mdi-cart" color="#fff" />
                        </nuxt-link>
                    </v-badge>


                    <v-menu v-model="menu" :close-on-content-click="false" location="left" transition="slide-y-transition">
                        <template v-slot:activator="{ props }">
                            <v-btn class="mx-3 profile-button" color="#0F9D58" :icon="token ? 'mdi-account':'mdi-login'" v-bind="props" />
                        </template>
                        <v-stepper v-model="e1" hide-actions>
                            <template v-slot:default="{ props }">
                                <v-stepper-header class="d-none">
                                    <v-divider></v-divider>
                                    <v-stepper-item :complete="e1 > 1" :title="`Вход`" :value="1" editable complete
                                        :disabled="!!token" color="#0F9D58"></v-stepper-item>
                                    <v-divider></v-divider>
                                    <v-divider></v-divider>
                                    <v-stepper-item :complete="e1 > 2" :title="`Step 2`" :value="2" editable complete
                                        :disabled="!token" color="#0F9D58"></v-stepper-item>
                                    <v-divider></v-divider>
                                </v-stepper-header>
                                <v-stepper-window>
                                    <v-stepper-window-item :value="!token ? 1 : null">

                                        <div class="grey lighten-4 ">
                                            <v-row class="d-flex align-items-center justify-content-center">
                                                <v-col cols="12">
                                                    <v-card flat outlined min-width="300" class="mx-auto">
                                                        <v-tabs v-model="tab" active-class="white" height="40" fixed-tabs
                                                            hide-slider>

                                                            <v-btn color="#0F9D58" min-width="100" class="button-menu"
                                                                @click="handleTabClick(0)" flat>
                                                                {{ $t('login') }}
                                                            </v-btn>

                                                            <v-btn color="#0F9D58" min-width="100" class="button-menu"
                                                                @click="handleTabClick(1)" flat>
                                                                {{ $t('reg') }}
                                                            </v-btn>

                                                        </v-tabs>

                                                        <v-window v-model="tab">

                                                            <v-window-item :value="0">

                                                                <h1
                                                                    class="mt-4 xs:body-1 sm:body-1 md:headline-6 lg:headline-5 xl:headline-4">
                                                                    {{ $t('login') }}</h1>

                                                                <v-card-text class="my-7 my-auth">
                                                                    <v-form v-model="valid" @submit.prevent="onLogin"
                                                                        ref="form" lazy-validation>
                                                                        <v-col cols="auto">
                                                                            <v-text-field v-model="user.phonenumber"
                                                                                class="mb-4" prepend-inner-icon="mdi-phone"
                                                                                density="compact" :placeholder="$t('phone')"
                                                                                variant="outlined" single-line hide-details
                                                                                :rules="[rules.phoneRequired, rules.phonenumber]"
                                                                                type="tel" />

                                                                            <v-text-field v-model="user.password"
                                                                                :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
                                                                                :type="visible ? 'text' : 'password'"
                                                                                :rules="[rules.passwordRequired, rules.min]"
                                                                                density="compact"
                                                                                :placeholder="$t('password')" single-line
                                                                                hide-details
                                                                                prepend-inner-icon="mdi-lock-outline"
                                                                                variant="outlined"
                                                                                @click:append-inner="visible = !visible"></v-text-field>
                                                                        </v-col>

                                                                        <div class="text-center">
                                                                            <v-btn type="submit" color="#0F9D58"
                                                                                class="mb-4 button-menu " min-width="200px">
                                                                                {{ $t('login') }}
                                                                            </v-btn>
                                                                        </div>
                                                                        <div @click="handleTabClick(2)"
                                                                            class="text-body-2 font-weight-regular"
                                                                            style="cursor: pointer;">{{ $t('reset_pass') }}
                                                                        </div>

                                                                        <div class="text-red">
                                                                            {{ errorMessage }}
                                                                        </div>

                                                                    </v-form>

                                                                </v-card-text>
                                                            </v-window-item>


                                                            <v-window-item :value="1">

                                                                <h1 class="mt-4 auth">{{ $t('reg') }}</h1>

                                                                <v-card-text class="my-7">

                                                                    <v-form v-model="valid"
                                                                        @submit.prevent="onRegistrations" ref="form"
                                                                        lazy-validation>

                                                                        <v-col cols="auto">
                                                                            <v-text-field v-model="createUser.phone"
                                                                                prepend-inner-icon="mdi-phone"
                                                                                density="compact" :placeholder="$t('phone')"
                                                                                variant="outlined"
                                                                                :rules="[rules.phoneRequired, rules.phonenumber]"
                                                                                type="tel"></v-text-field>

                                                                            <v-text-field v-model="createUser.password1"
                                                                                :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
                                                                                :type="visible ? 'text' : 'password'"
                                                                                :rules="[rules.passwordRequired, rules.min]"
                                                                                density="compact"
                                                                                :placeholder="$t('password')"
                                                                                prepend-inner-icon="mdi-lock-outline"
                                                                                variant="outlined"
                                                                                @click:append-inner="visible = !visible"></v-text-field>

                                                                            <v-text-field v-model="createUser.password2"
                                                                                :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
                                                                                :type="visible ? 'text' : 'password'"
                                                                                :rules="[rules.passwordRequired, rules.min]"
                                                                                density="compact"
                                                                                :placeholder="$t('password')"
                                                                                prepend-inner-icon="mdi-lock-outline"
                                                                                variant="outlined"
                                                                                @click:append-inner="visible = !visible"></v-text-field>

                                                                        </v-col>

                                                                        <div class="text-center">

                                                                            <v-btn type="submit" color="#0F9D58"
                                                                                class="mb-4 button-menu " min-width="200">
                                                                                {{ $t('reg') }}
                                                                            </v-btn>

                                                                            <div class="text-red">
                                                                                {{ errorStatus }}
                                                                            </div>

                                                                        </div>

                                                                    </v-form>

                                                                </v-card-text>
                                                            </v-window-item>

                                                            <v-window-item :value="2">

                                                                <h1 class="mt-4 auth">{{ $t('restore') }}</h1>

                                                                <v-card-text class=" my-7">
                                                                    <v-form v-model="valid" @submit.prevent="Reset_Password"
                                                                        ref="form" lazy-validation>

                                                                        <v-text-field v-model="reset.phone_number"
                                                                            prepend-inner-icon="mdi-phone" density="compact"
                                                                            :placeholder="$t('phone')" variant="outlined"
                                                                            :rules="[rules.phoneRequired, rules.phonenumber]"
                                                                            type="tel"></v-text-field>

                                                                        <div class="text-center">
                                                                            <v-btn type="submit" color="#0F9D58"
                                                                                class="mb-4 button-menu " min-width="200px">
                                                                                {{ $t('send') }}
                                                                            </v-btn>
                                                                        </div>
                                                                        <div class="text-red">
                                                                            {{ errorMessage }}
                                                                        </div>

                                                                    </v-form>

                                                                </v-card-text>
                                                            </v-window-item>

                                                        </v-window>
                                                    </v-card>
                                                </v-col>
                                            </v-row>

                                        </div>

                                    </v-stepper-window-item>

                                    <v-stepper-window-item :value="token ? 2 : null">
                                        <v-card min-width="300">
                                            <v-card-title class="text-center my-3">{{$t('profile')}}</v-card-title>
                                            <v-card-text>
                                                <div class="d-flex align-center justify-center">
                                                    <span class="text-h6">{{ store.user.phone_number ?
                                                        store.user.phone_number : 'Пустой' }}</span>
                                                    <v-btn @click="logout" class="mx-3 close-button" width="35px"
                                                        height="35px" color="#0F9D58" icon="mdi-logout-variant" />
                                                </div>
                                            </v-card-text>
                                            <v-card-text>
                                                <h5 class="text-center my-3">{{ $t('change_pass') }}</h5>
                                                <v-form v-model="valid" @submit.prevent="Change_password" ref="form"
                                                    lazy-validation>

                                                    <v-text-field v-model="Update.old_password"
                                                        :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
                                                        :type="visible ? 'text' : 'password'"
                                                        :rules="[rules.passwordRequired, rules.min]" density="compact"
                                                        :placeholder="$t('password')" prepend-inner-icon="mdi-lock-outline"
                                                        variant="outlined"
                                                        @click:append-inner="visible = !visible"></v-text-field>

                                                    <v-text-field v-model="Update.new_password"
                                                        :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
                                                        :type="visible ? 'text' : 'password'"
                                                        :rules="[rules.passwordRequired, rules.min]" density="compact"
                                                        :placeholder="$t('password')" prepend-inner-icon="mdi-lock-outline"
                                                        variant="outlined"
                                                        @click:append-inner="visible = !visible"></v-text-field>
                                                    <v-card-actions class="text-end">
                                                        <v-btn variant="text" color="#0F9D58" @click="menu = false">
                                                            {{ $t('cancel') }}
                                                        </v-btn>
                                                        <v-btn variant="text" color="#0F9D58" type="submit">
                                                            {{ $t('reset') }}
                                                        </v-btn>
                                                    </v-card-actions>

                                                </v-form>
                                            </v-card-text>


                                        </v-card>

                                    </v-stepper-window-item>

                                </v-stepper-window>

                            </template>
                        </v-stepper>

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
const { login, registrations, logout, change_password, reset_password } = useAuth();

const menu = ref(false);
const valid = ref(false);
const visible = ref(false);
const token = useAuthToken();


const errorMessage = ref('');
const errorStatus = ref('');
const tab = ref(0);
const e1 = ref(1);

let activLang = ref('ru');

const { locales, locale } = useI18n();

const user = ref({
    phonenumber: "",
    password: "",
});


const createUser = ref({
    phone: "",
    password1: "",
    password2: "",
})

const Update = ref({
    old_password: '',
    new_password: ''
})

const reset = ref({
    phone_number: ''
})

const scrollToTop = () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
};



const rules = {
    phonenumber: (value) => {
    const pattern = /^(\+\d{9}|\d{9}|\+\d{12}|\d{12})$/;
    return pattern.test(value) || "Пример: +998974083121 или 974083121"},
    phoneRequired: (value) => !!value || "You must enter your phone",
    passwordRequired: (value) => !!value || "Your password is required",
    min: (v) => v.length >= 6 || "Минимум 6 символов",
};


const changeLocale = (selectedLocale) => {
    activLang.value = selectedLocale;
    locale.value = selectedLocale;
    isMenuOpen.value = false;
}

const handleTabClick = (index) => {
    tab.value = index;
}


async function Change_password() {
    if (valid.value) {
        try {
            await change_password(Update.value.old_password, Update.value.new_password);
            menu.value = false;
        } catch (error) {
            console.error(error);
        }
    }
}

async function Reset_Password() {
    if (valid.value) {
        try {
            await reset_password(reset.value.phone_number);
            tab.value = 0;
        } catch (error) {
            console.error(error)
            errorMessage.value = 'Не верный номер!';
        }

    }
}

async function onLogin() {
    if (valid.value) {
        try {
            await login(user.value.phonenumber, user.value.password);
            await store.getUser();

            e1.value++;
            menu.value = false;
        } catch (error) {
            console.error(error);
            errorMessage.value = 'Не правильный номер или пароль!!';

        }
    }
}
async function onRegistrations() {
    try {
        if (valid.value) {
            const { user, status } = await registrations(createUser.value.phone, createUser.value.password1, createUser.value.password2);
            if (user.value !== null && status !== 'error') {
                await login(createUser.value.phone, createUser.value.password1);

                await store.getUser();


                e1.value++;
                menu.value = false;
            } else {
                errorStatus.value = 'Пользователь уже существует';
            }
        }
    } catch (error) {
        console.error('Unexpected error during registration:', error);
    }
}


onMounted(() => {
    mobilenav();
    topnavmenu();
    useBackToTop();
    store.loadCards();
    store.loadUser();

});




</script>

<style scoped>
.button-lang {
    height: 48px !important;
    width: 48px !important;
    border-radius: 15px !important;
    box-shadow: none !important;
}

.button-menu {
    text-transform: capitalize;
    font-size: 12px;
    margin: 0 0 0 16px;
    border-radius: 10px;
}

.close-button {
    border-radius: 10px;
    box-shadow: none;
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

.basket-btn {
    width: 3rem;
    height: 3rem;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    font-size: 20px;
    cursor: pointer;
    transition: .5s ease-in-out;
    border-radius: 1rem;
    background-color: #0F9D58;

}

@media screen and (max-width: 600px) {
    .my-auth {
        /* Add your styles for smaller screens here */
        max-width: 300px;
        /* Adjust the max-width as needed */
        margin: 0 auto;
        /* Center the form */
    }


}</style>