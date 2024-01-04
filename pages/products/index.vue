<template>
    <!-- FOOD MENU SECTION -->
    <section class="align-items-center bg-img bg-img-fixed" id="food-menu-section"
        style="background-image: url(/broilers.jpg);">
        <div class="container">
            <div class="food-menu">
                <h1 class="font-weight-bold text-h4 m-0 p-0 mb-5">
                    {{ $t('products') }}
                </h1>
                <div class="mt-md-10 mt-xs-10 mt-sm-0">
                    <div class=" d-flex ga-md-3 ga-xs-0 justify-center align-center p-10">

                        <v-menu v-model="isMenuOpen">
                            <template v-slot:activator="{ props }">
                                <v-btn color="#0F9D58" class="button-menu d-md-flex d-none align-items-center py-5 "
                                    v-bind="props">
                                    {{ activFilter.content[$i18n.locale].title }}
                                    <v-icon small right>mdi-menu-down</v-icon>
                                </v-btn>
                            </template>
                            <v-list class="d-md-flex flex-column  d-xs-flex d-none">
                                <v-list-item v-for="{ id, content } in store.category" :key="id" @click="changeLocale(id)">
                                    <v-list-item-title>{{ content[$i18n.locale].title }}</v-list-item-title>
                                </v-list-item>
                            </v-list>
                        </v-menu>
                        <v-menu v-model="isMenuManufacture">
                            <template v-slot:activator="{ props }">
                                <v-btn color="#0F9D58" class="button-menu d-md-flex d-none align-center py-5"
                                    v-bind="props">

                                    {{ defaultManufactue.content[$i18n.locale].title }}
                                    <v-icon small right>mdi-menu-down</v-icon>
                                </v-btn>
                            </template>
                            <v-list class="d-md-flex flex-column  d-xs-flex d-none">
                                <v-list-item v-for="{ id, content } in store.manufacturer" :key="id"
                                    @click="changeManufacturer(id)">
                                    <v-list-item-title>{{ content[$i18n.locale].title }}</v-list-item-title>
                                </v-list-item>
                            </v-list>
                        </v-menu>
                        <v-menu v-model="isMenustock">
                            <template v-slot:activator="{ props }">
                                <v-btn color="#0F9D58" class="button-menu d-md-flex d-none  align-center py-5"
                                    v-bind="props">

                                    {{ activStock.content[$i18n.locale].title }}
                                    <v-icon small right>mdi-menu-down</v-icon>
                                </v-btn>
                            </template>

                            <v-list>
                                <v-list-item @click="selectOption(true)">
                                    <v-list-item-title>{{ $t('yes') }}</v-list-item-title>
                                </v-list-item>
                                <v-list-item @click="selectOption(false)">
                                    <v-list-item-title>{{ $t('no') }}</v-list-item-title>
                                </v-list-item>
                                <v-list-item @click="selectOption('')">
                                    <v-list-item-title>{{ $t('other') }}</v-list-item-title>
                                </v-list-item>
                            </v-list>

                        </v-menu>


                        <v-sheet class="ml-auto my-search">
                            <form @submit.prevent="onClick">
                                <div class="d-flex my-search">
                                    <input class="input-inset" type="text" v-model="store.search"
                                        :placeholder="$t('search')">
                                    <v-btn icon="mdi-magnify" class="button-menu mx-1" color="#0F9D58" width="48"
                                        type="submit" height="48" />

                                </div>
                            </form>
                        </v-sheet>
                        <v-dialog width="500">
                            <template v-slot:activator="{ props }">
                                <v-btn icon="mdi-filter" v-bind="props"
                                    class="d-flex d-md-none align-center justify-center button-menu  mt-md-0 mr-5  mx-0"
                                    color="#0F9D58"></v-btn>
                            </template>

                            <template v-slot:default="{ isActive }">
                                <v-card title="Фильтрация" class="d-flex justify-center align-center py-10 ga-5"
                                    style="border-radius: 30px;">
                                    <v-card-text>
                                        <v-menu v-model="isMenuOpen">
                                            <template v-slot:activator="{ props }">
                                                <v-btn color="#0F9D58" width="100%"
                                                    class="button-menu d-flex align-items-center my-5" v-bind="props">
                                                    {{ activFilter.content[$i18n.locale].title }}
                                                    <v-icon small right>mdi-menu-down</v-icon>
                                                </v-btn>
                                            </template>
                                            <v-list>
                                                <v-list-item v-for="{ id, content } in store.category" :key="id"
                                                    @click="changeLocale(id)">
                                                    <v-list-item-title>{{ content[$i18n.locale].title }}</v-list-item-title>
                                                </v-list-item>
                                            </v-list>
                                        </v-menu>
                                        <v-menu v-model="isMenuManufacture">
                                            <template v-slot:activator="{ props }">
                                                <v-btn color="#0F9D58" width="100%"
                                                    class="button-menu d-flex  align-center my-5" v-bind="props">

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
                                                <v-btn color="#0F9D58" width="100%"
                                                    class="button-menu d-flex  align-center my-5" v-bind="props">

                                                    {{ activStock.content[$i18n.locale].title }}
                                                    <v-icon small right>mdi-menu-down</v-icon>
                                                </v-btn>
                                            </template>

                                            <v-list>
                                                <v-list-item @click="selectOption(true)">
                                                    <v-list-item-title>{{ $t('yes') }}</v-list-item-title>
                                                </v-list-item>
                                                <v-list-item @click="selectOption(false)">
                                                    <v-list-item-title>{{ $t('no') }}</v-list-item-title>
                                                </v-list-item>
                                                <v-list-item @click="selectOption('')">
                                                    <v-list-item-title>{{ $t('other') }}</v-list-item-title>
                                                </v-list-item>
                                            </v-list>

                                        </v-menu>

                                    </v-card-text>
                                </v-card>
                            </template>
                        </v-dialog>

                    </div>
                </div>

                <div class="food-item-wrap all">

                    <div class="food-item" v-for="{ id, content, price, old_price, sale, image, active } in store.products"
                        :key="id" v-if="store.products.length > 0">
                        <div class="item-wrap play-on-scroll">
                            <div class="item-img">
                                <nuxt-link :to="'/products/' + id">
                                    <img class="img-holder bg-img" :src="image != null ? image : '/noimage.png'" alt="" />
                                </nuxt-link>
                            </div>
                            <div class="item-info">

                                <h3>{{ truncateString(content[$i18n.locale].title, 14) }}</h3>

                                <div class="item-info-body">
                                    <h4>
                                        {{ price }} {{ $t('price') }}
                                        <s v-if="sale === true" class="my-style"> {{ old_price }} {{ $t('price') }}</s>
                                    </h4>
                                    <v-snackbar color="#0F9D58" location="top" :timeout="2000">
                                        <template v-slot:activator="{ props }">
                                            <v-btn :disabled="!active" v-bind="props" class="cart-btn"
                                                :icon="active ? 'mdi-cart' : 'mdi-cart-off'"
                                                :color="active ? '#0F9D58' : '#FF0000'" @click="addToCart(id)">

                                            </v-btn>
                                        </template>
                                        <div class="d-flex ga-3 align-center justify-center">

                                            <h4>Добавлено в Корзину</h4>
                                        <v-btn prepend-icon="mdi-cart"  color="#FFF" class="btn-add-snack">
                                            <nuxt-link to="/basket">Перейти</nuxt-link>
                                        </v-btn>
                                        </div>
                               
                                    </v-snackbar>

                                </div>


                            </div>
                        </div>
                    </div>

                    <div v-else class="centered-container">
                        <img src="/nodataimage.jpg" alt="No Products Available" class="centered-image" />
                    </div>
                </div>

                <div>
                    <v-pagination v-model="store.pageAPI" :length="store.pageCount" :total-visible="5"
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

useHead({
    title: "Продукты Вет-аптеки",
    meta: [
        { name: 'VetApteka', content: 'Добро пожаловать в нашу Ветеринарную Аптеку - SAMVETSERVIS! Основанный в 2004 году, наш Центр Птицеводства является надежным и опытным партнером в обеспечении заботы и поддержки вашего птицеводства.' }
    ]
})
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
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
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
    border-radius: 15px;
    box-shadow: none !important;
}

.search-button {
    border-radius: 15px;
    box-shadow: none;
}



.input-inset {
    font-size: 16px;
    line-height: 1.5;
    background: #0f9d581a;
    background-size: 20px 20px;
    border: none;
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
}

.my-style {
    color: red;
    font-size: 14px;
    font-weight: 400;
    margin-left: 10px;
}

@media(max-width: 600px) {
    .my-style {
        font-size: 12px;
        margin-left: 0px;

    }

    .my-search {
        display: flex;
        justify-content: center;
        align-items: center;
    }
}

</style>
