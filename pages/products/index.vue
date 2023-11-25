<template>
    <!-- FOOD MENU SECTION -->
    <section class="align-items-center bg-img bg-img-fixed" id="food-menu-section" style="background-image: url(/fix.png);">
        <div class="container">
            <div class="food-menu">
                <h1 class="font-weight-bold text-h3 m-0 p-0">
                    {{ $t('products') }}
                </h1>
                <div class="food-category mt-10">
                    <div class="zoom play-on-scroll d-flex justify-content-center">
                        <v-menu v-model="isMenuOpen">
                            <template v-slot:activator="{ props }">
                                <v-btn color="#0F9D58" class="button-menu d-flex align-items-center py-5 px-5"
                                    v-bind="props">
                                    <!-- <v-icon left>mdi-categories</v-icon> -->
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
                                <v-btn color="#0F9D58" class="button-menu d-flex align-items-center py-5 px-5"
                                    v-bind="props">
                                    <!-- <v-icon left>mdi-filter</v-icon> -->
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
                                <v-btn color="#0F9D58" class="button-menu d-flex align-items-center py-5 px-5"
                                    v-bind="props">
                                    <!-- <v-icon left>mdi-filter</v-icon> -->
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
                        
                        <search class=" px-10 mx-10 justify-self-flex-end"/>

                    </div>
                </div>

                <div class="food-item-wrap all">
                    <div class="food-item " v-for="{ id, content, price, old_price, sale, image } in store.products "
                        :key="id">

                        <div class="item-wrap bottom-up play-on-scroll">
                            <div class="item-img">
                                <nuxt-link :to="'/products/' + id">
                                    <div class="img-holder bg-img"
                                        :style="{ 'background-image': image != null ? `url(${image})` : `url('/noimage.png')` }">
                                    </div>
                                </nuxt-link>
                            </div>
                            <div class="item-info">
                                <div>
                                    <h3>
                                        {{ truncateString(content[$i18n.locale].title, 14) }}
                                    </h3>
                                    <h3>
                                        {{ price }} {{ $t('price') }}
                                        <s v-if="sale === true" class="text-caption ml-2 text-red"> {{ old_price }} {{ $t('price') }}</s>
                                    </h3>

                                </div>
                                <button class="cart-btn" @click="addToCart(id)">
                                    <i class="bx bx-cart-alt"></i>
                                </button>

                            </div>
                        </div>



                    </div>
                </div>
                <v-pagination v-model="store.pageAPI" :length="store.pageCount" :total-visible="5"
                    @click="handlePaginationClick"></v-pagination>

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
const store = productStore();
await store.fetchProduct();

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

await store.fethCategory();
await store.fethManufacture();

onMounted(() => {
    animation();
})



</script>

<style scoped>
#food-menu-section {
    color: black;
}

.button-menu {
    text-transform: capitalize;
    font-size: 16px;
    margin: 0 0 0 16px;
}
</style>
