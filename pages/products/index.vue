<template>
    <!-- FOOD MENU SECTION -->
    <section class="align-items-center bg-img bg-img-fixed" id="food-menu-section" style="background-image: url(/fix.png);">
        <div class="container">
            <div class="food-menu">
                <h1 class="font-weight-bold text-h3 m-0 p-0">
                    {{ $t('products') }}
                </h1>
                <div class="mt-10">
                    <div class=" my-items d-flex flex-wrap align-center ga-3">
                        <v-menu v-model="isMenuOpen">
                            <template v-slot:activator="{ props }">
                                <v-btn color="#0F9D58" class="button-menu d-flex align-items-center py-5 "
                                    v-bind="props">
                                    {{ activFilter.content[$i18n.locale].title }}
                                    <v-icon small right>mdi-menu-down</v-icon>
                                </v-btn>
                            </template>
                            <v-list>
                                <v-list-item v-for="{ id, content } in store.category" :key="id" @click="changeLocale(id)">
                                    <v-list-item-title>{{ content[$i18n.locale].title }}</v-list-item-title>
                                </v-list-item>
                            </v-list>
                        </v-menu>
                        <v-menu v-model="isMenuManufacture">
                            <template v-slot:activator="{ props }">
                                <v-btn color="#0F9D58" class="button-menu d-flex align-center py-5"
                                    v-bind="props">

                                    {{ defaultManufactue.content[$i18n.locale].title }}
                                    <v-icon small right>mdi-menu-down</v-icon>
                                </v-btn>
                            </template>
                            <v-list>
                                <v-list-item v-for="{ id, content } in store.manufacturer" :key="id"
                                    @click="changeManufacturer(id)">
                                    <v-list-item-title>{{ content[$i18n.locale].title }}</v-list-item-title>
                                </v-list-item>
                            </v-list>
                        </v-menu>
                        <v-menu v-model="isMenustock">
                            <template v-slot:activator="{ props }">
                                <v-btn color="#0F9D58" class="button-menu d-flex align-center py-5"
                                    v-bind="props">

                                    {{ activStock.content[$i18n.locale].title }}
                                    <v-icon small right>mdi-menu-down</v-icon>
                                </v-btn>
                            </template>

                            <v-list>
                                <v-list-item @click="selectOption(true)">
                                    <v-list-item-title>Да</v-list-item-title>
                                </v-list-item>
                                <v-list-item @click="selectOption(false)">
                                    <v-list-item-title>Нет</v-list-item-title>
                                </v-list-item>
                                <v-list-item @click="selectOption('')">
                                    <v-list-item-title>Неизвестно</v-list-item-title>
                                </v-list-item>
                            </v-list>

                        </v-menu>

                        <v-sheet class="ml-auto search-form mx-5 search">
                            <form @submit.prevent="onClick">
                                <div class="d-flex">
                                    <input class="input-inset" type="text" v-model="store.search" placeholder="Search">
                                    <v-btn icon="mdi-magnify" class="search-button mx-3" color="#0F9D58" width="48" height="48"/>
                              
                                </div>

                            </form>

                        </v-sheet>

                    </div>
                </div>

                <div class="food-item-wrap all">
                    <div class="food-item " v-for="{ id, content, price, old_price, sale, image } in store.products "
                        :key="id">

                        <div class="item-wrap  play-on-scroll">
                            <div class="item-img">
                                <nuxt-link :to="'/products/' + id">
                                    <img class="img-holder bg-img" :src="image != null ? image : '/noimage.png'" />
                                </nuxt-link>
                            </div>
                            <div class="item-info">
                                <h3>
                                        {{ truncateString(content[$i18n.locale].title, 14) }}
                                    </h3>
                                <div class="item-info-body">
                                    <h4>
                                        {{ price }} {{ $t('price') }}
                                        <s v-if="sale === true" class="text-caption ml-2 text-red"> {{ old_price }} {{
                                            $t('price') }}</s>
                                    </h4>
                                    <button class="cart-btn" @click="addToCart(id)">
                                    <i class="bx bx-cart-alt"></i>
                                </button>
                                </div>
                     
                               
                            </div>
                        </div>



                    </div>
                </div>
                <div>
                    <v-pagination  v-model="store.pageAPI" :length="store.pageCount" :total-visible="5"
                    @click="handlePaginationClick"></v-pagination>
                </div>
                

            </div>
        </div>
    </section>
    <!-- END FOOD MENU SECTION -->
</template>

<script setup>
import { animation } from '@/composables/mainjs/on_scroll_animation';
import { productStore } from '@/stores/product';
import { addToCart } from '@/composables/AddtoCard';

const isMenuOpen = ref(false);
const isMenustock = ref(false);
const isMenuManufacture = ref(false);


const store = productStore();


const activFilter = ref({
    content: {
        ru: { title: 'Категории' },
        uz: { title: 'Kategoriyalar' },
    }
});
const defaultManufactue = ref({
    content: {
        ru: { title: 'Производство' },
        uz: { title: 'Mahsulotlar' },
    }
});
const activStock = ref({
    content: {
        ru: { title: 'Скидки' },
        uz: { title: 'Chegirmalar' }
    }
})


const handlePaginationClick = async () => {
    try {
        await store.fetchProduct(activFilter.value.categoryId, defaultManufactue.value.manufacturerId);
        animation();
    } catch (error) {
        console.error('Error fetching products:', error);
    }
};



const changeLocale = async (selectedId) => {
    activFilter.value.categoryId = selectedId === '' ? '' : store.category.find(cat => cat.id === selectedId).id;
    isMenuOpen.value = false;
    try {
        store.pageAPI = 1;
        await store.fetchProduct(activFilter.value.categoryId, defaultManufactue.value.manufacturerId);
        animation();
    } catch (error) {
        console.error('Error fetching products:', error);
    }
};

const changeManufacturer = async (selectedId) => {
    defaultManufactue.value.manufacturerId = selectedId === '' ? '' : store.manufacturer.find(man => man.id === selectedId).id;
    isMenuManufacture.value = false;
    try {
        store.pageAPI = 1;
        await store.fetchProduct(activFilter.value.categoryId, defaultManufactue.value.manufacturerId);
        animation();
    } catch (error) {
        console.error('Error fetching products:', error);
    }
};

const selectOption = async (isSale) => {
    store.sale = isSale;
    await store.fetchProduct(activFilter.value.categoryId, defaultManufactue.value.manufacturerId);
    animation();
};
const truncateString = (text, maxLength) => {
    if (text && text.length > maxLength) {
        return text.substring(0, maxLength) + '...';
    }
    return text;
};



const onClick = async () => {

    try {
        store.pageAPI = 1;
        await store.fetchProduct(activFilter.value.categoryId, defaultManufactue.value.manufacturerId);
        animation();
    } catch (error) {
        console.error('Error fetching products:', error);
    }

}
await store.fetchProduct();
await store.fethCategory();
await store.fethManufacture();
onMounted(() => {
    animation();


})



</script>

<style scoped>
#food-menu-section {
    color: rgba(0, 0, 0, 0.815);
}



.button-menu {
    text-transform: capitalize;
    font-size: 16px;
    margin: 0 0 0 16px;
    border-radius: 15px;
    box-shadow: none!important;
}
.search-button{
    border-radius: 15px;
    box-shadow: none;
}



.input-inset {
    font-size: 16px;
    line-height: 1.5;
    background: #0f9d581a;
    /* background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='19' height='19' viewBox='0 0 19 19'><path fill='%23838D99' d='M13.98 12.57a2 2 0 0 1 1.93.52l2.5 2.5a2 2 0 0 1-2.82 2.82l-2.5-2.5a2 2 0 0 1-.52-1.93l-1.38-1.37a7 7 0 1 1 1.42-1.42l1.37 1.38zm-3.37-2.03a5 5 0 1 0-7.08-7.08 5 5 0 0 0 7.08 7.08z'></path></svg>");
    background-repeat: no-repeat;
    background-position: right 10px top 10px;; */
    background-size: 20px 20px;
    /* border: 1px solid #0F9D58; */
    border: none;
    /* box-shadow: inset 0 1px 4px 0 rgba(0, 0, 0, 0.20); */
    border-radius: 1rem;
    width: 240px;
    padding: .5em 1em .5em 1em;
}

.input-inset::placeholder {
    color: #838D99;
    padding: 0;
}

.input-inset:focus {
    outline: none;
    border: none;
    /* border: 1px solid #0F9D58; */
}


</style>
