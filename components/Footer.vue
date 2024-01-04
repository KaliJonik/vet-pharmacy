<template>
    <!-- FOOTER SECTION -->
    <section class="footer">
        <div class="container">
            <div class="row d-flex justify-center align-start"
                v-for="{ id, phone_number1, phone_number2, site_name, email } in store.about" :key="id">
                <div class="col-4 col-xs-12">
                    <h1>
                        {{ site_name }}
                    </h1>
                    <br>
                    <ul class="d-flex flex-row ga-5">
                        <li v-for="items in store.Social" :key="items.id"><a :href="items.link"><v-icon>mdi-{{ items.slug
                        }}</v-icon></a></li>
                    </ul>

                    <br>
                    <p>{{ $t('email') }}: &ensp;{{ email }}</p>
                    <div class="phone-container">
                        <div class="d-flex mr-2">
                            <span>{{ $t('phone') }}: </span> 
                        </div>
                       
                       <div class="d-flex flex-column">
                        <span> {{ phone_number1 }}</span>
                       <span>{{ phone_number2 }}</span>
                       </div>
                      
                    </div>
                </div>
                <div class="col-4 col-xs-12">
                    <h1>
                        {{ $t('about') }}
                    </h1>
                    <br>
                    <p>
                        <nuxt-link :to="{ path: '/', hash: '#home' }">

                            {{ $t("home") }}

                        </nuxt-link>
                    </p>
                    <p>
                        <nuxt-link :to="{ path: '/', hash: '#about' }">

                            {{ $t("about") }}

                        </nuxt-link>
                    </p>
                    <p>
                        <nuxt-link :to="{ path: '/', hash: '#delivery' }">

                   {{ $t('delivery') }}

                        </nuxt-link>
                    </p>
                    <p>
                        <nuxt-link :to="{ path: '/products', hash: '' }">
                            {{ $t("products") }}
                        </nuxt-link>
                    </p>
                    <p>
                        <nuxt-link :to="{ path: '/', hash: '#testimonial' }">

                            {{ $t("manufacture") }}

                        </nuxt-link>
                    </p>
                </div>
                <div class="col-4 col-xs-12">
                    <h1>
                       {{ $t('feedback') }}
                    </h1>
                    <br>
                    <form @submit.prevent="FeedBaak">
                        <div class="input-group">
                            <input type="text" v-model="form.contact" :placeholder="$t('email_phone')">
                            
                        </div>
                        <div class="input-group" >
                            <input type="text" v-model="form.title" :placeholder="$t('theme')">
                        </div>
                        <div class="input-group pt-7 pb-7">
                            <input type="text" v-model="form.message" :placeholder="$t('text')">
                        </div>
                        <v-col class="pl-0"> 
                            <v-btn type="submit" class="submit-form" color="#0F9D58">{{ $t('send') }}</v-btn>
                        </v-col>

                    </form>

                </div>
            </div>
        </div>
    </section>
    <!-- END FOOTER SECTION -->
</template>

<script setup>
import { productStore } from '@/stores/product';

const store = productStore();

const { feedback } = useAuth();
const form = ref({
    contact:'',
    title:'',
    message:''
})
async function FeedBaak() {
        try {
            await feedback(form.value.contact, form.value.title, form.value.message);
            form.value.contact = ''
            form.value.title = ''
            form.value.message = ''
    
        } catch (error) {
            console.error(error);
        }
}

</script>

<style scoped>
::placeholder {
    color: #ffff;
}

ul li {
    list-style: none;
}
.phone-container {
    display: flex;
    text-align: start;
  }
  .submit-form{
    box-shadow: none;
    border-radius: 15px;
  }
</style>