<template>
  <section class="bg-img bg-img-fixed" id="food-menu-section" style="background-image: url(/fix.png);">
    <div class="container">
      <div class="basket-list">
        <h1 class="mx-2">Корзина</h1>
        <div class="buttons-cheks">
          <!-- <v-checkbox v-model="store.selectAll" @change="selectAllItems" label="Выбрать все" color="green"></v-checkbox>
          <nuxt-link class="px-5 mx-10 py-0 my-0 mb-0 pb-0" to="#">История Заказов</nuxt-link>
          <v-btn color="red" @click="deleteSelectedItems">Очистить</v-btn> -->

        </div>
        <div class="basket-list-item mb-5 p-0" v-for="{id, content, image , price } in store.cards" :key="id">
          
          <div class="image-basket">
            <nuxt-link :to="'/products/' + id">
            <img :src="image != null ? image : ('/noimage.png')"
              style="border-radius: 20px; width: 200px; height: 200px; object-fit: cover;" />
              </nuxt-link>
          </div>
          <div class="data-basket">

            <h2>{{ content[$i18n.locale].title }}</h2>
            <h3>Цена: {{ price }} {{ $t('price') }}</h3>

            <v-row class="display-flex align-center mb-0 my-0">
              <v-col cols="auto" class="px-2 mx-1">
                Объем:
                <v-btn @click="decrement" color="#0F9D58" class="v-btn--dense"
                  style="min-width: 10px; height: 24px; font-size: 12px;">
                  -
                </v-btn>
              </v-col>
              <v-col cols="auto" class="px-0" style="padding: 0;">
                <v-text-field v-model="quantity" :rules="[numberRule]" label="шт" variant="underlined"
                  style="width: 50px; font-size: 12px;"></v-text-field>
              </v-col>
              <v-col cols="auto" class="px-1">
                <v-btn @click="increment" color="#0F9D58" class="v-btn--dense"
                  style="min-width: 10px; height: 24px; font-size: 12px;">
                  +
                </v-btn>
              </v-col>

            </v-row>
          </div>
          <div class="chekbox">
            <!-- <v-checkbox v-model="selectedItems[index]" color="green"></v-checkbox> -->
            <v-btn @click="store.deleteCards(id)" size="small" class="mt-3" color="red"><v-icon>mdi-delete</v-icon></v-btn>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { productStore } from "@/stores/product";

const store = productStore();

onMounted(() => {
  store.loadCards();
})


const quantity = ref(0);
const decrement = () => {
  if (quantity.value > 0) {
    quantity.value--;
  }
};

const increment = () => {
  quantity.value++;
};

const numberRule = (val) => {
  if (val < 0) return 'Please enter a positive number';
  return true;
};

</script>

<style scoped>
#food-menu-section{
  height: 100%;
}
.basket-list {
  padding: 5rem;
  background-color: var(--white);
  border-radius: 2rem;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
}

.basket-list-item {
  display: flex;

  align-items: center;

  padding: 1rem 1rem;
  position: relative;
  box-shadow: rgba(63, 63, 63, 0.301) 0px 7px 29px 0px;
  border-radius: 30px;
}

.image-basket {

  margin-right: 20px;
  padding: 0;
  /* Добавил отступ справа */

}

.image-basket img {
  display: flex;
  margin: 0;
}

.data-basket {
  display: block;
}

.chekbox {
  position: absolute;
  display: flex;
  top: 0;
  right: 0;
  margin: 20px 30px 0 0;
}

.buttons-cheks {
  display: flex;
  justify-content: space-between;
}
</style>


