<template>
  <section class="align-items-center bg-img bg-img-fixed" id="food-menu-section" style="background-image: url(/fix.png);">
    <div class="container">
      <div class="food-menu" v-for="{ id, content, price, old_price, sale, photos } in store.one_products" :key="id">
        <div class="card">
          <div class="card-item-left">
            <section class="slider">
              <div class="slider__flex">
                <div class="slider__col">
                  <div class="slider__thumbs">
                    <div class="swiper-container">
                      <swiper @swiper="setThumbsSwiper" :loop="true" :spaceBetween="24" :slidesPerView="4"
                        :freeMode="true" direction="vertical" :watchSlidesProgress="true"
                        :modules="[FreeMode, Navigation, Thumbs]" class="mySwiper">

                        <swiper-slide v-if="photos.length === 0">
                          <div class="slider__image">
                            <img src="/noimage.png" alt="No Image" />
                          </div>
                        </swiper-slide>

                        <swiper-slide v-for="ph in photos" :key="ph">
                          <div class="slider__image">
                            <img  :src="ph.image" alt="" />
                          </div>
                        </swiper-slide>
                      </swiper>

                    </div>
                  </div>
                </div>
                <div class="slider__images">
                  <div class="swiper-container">
                    <swiper :style="{
                      '--swiper-navigation-color': '#fff',
                      '--swiper-pagination-color': '#fff',

                    }" :loop="true" :spaceBetween="32" :navigation="true" :thumbs="{ swiper: thumbsSwiper }"
                      direction="horizontal" :modules="[FreeMode, Navigation, Thumbs]" class="mySwiper2">


                      <swiper-slide v-if="photos.length === 0">
                        <div class="slider__image">
                          <img src="/noimage.png" alt="No Image" />
                        </div>
                      </swiper-slide>


                      <swiper-slide v-for="ph in photos" :key="ph">
                        <div class="slider__image">
                          <img :src="ph.image" alt="" />
                        </div>
                      </swiper-slide>
                    </swiper>

                  </div>
                </div>

              </div>
            </section>

          </div>

          <div class="card-item-right">

            <v-card-item class="mt-9">

              <v-card-text class="text-start my-0  py-0 mb-2">
                <h2 class="text-h4">
                  {{ content[$i18n.locale].title }}
                </h2>
                <h3 class="my-3 my-font">
                  Производитель: {{ content[$i18n.locale].manufacturer_title }}
                </h3>
                <h2 class="py-0 my-0 my-font">
                  Цена: от {{ price }} {{ $t('price') }}
                  <s v-if="sale === true" class="text-caption ml-2 text-red"> {{ old_price }} {{ $t('price') }}</s>
                </h2>


              </v-card-text>


              <v-card-text class="text-start text-h6 mb-0">

                <v-row class="display-flex align-center mb-0 my-0">
                  <v-col cols="auto" class="px-2 mx-1">
                    Объем:
                    <v-btn @click="store.DecrementQuantity(id)" color="#0F9D58" class="v-btn--dense"
                      style="min-width: 10px; height: 24px; font-size: 12px;">
                      -
                    </v-btn>
                  </v-col>
                  <v-col v-for="(product, index) in store.one_products" :key="index" cols="auto" class="px-0"
                    style="padding: 0;">
                    <v-text-field v-model="product.quantity" :rules="[numberRule]"
                      :label="product.content[$i18n.locale].unit" variant="underlined"
                      style="width: 90px; font-size: 12px;"></v-text-field>
                  </v-col>
                  <v-col cols="auto" class="px-1">
                    <v-btn @click="store.incrementQuantity(id)" color="#0F9D58" class="v-btn--dense"
                      style="min-width: 20px; height: 24px; font-size: 12px;">
                      +
                    </v-btn>
                  </v-col>
                </v-row>
                <v-row class="display-flex align-center my-0 py-0 mb-0 pb-0">
                  <v-col cols="auto" class="px-2 mx-1">
                    Сумма:
                    <v-btn @click="store.decrementCost(id)" color="#0F9D58" class="v-btn--dense"
                      style="min-width: 10px; height: 24px; font-size: 12px;">
                      -
                    </v-btn>
                  </v-col>
                  <v-col v-for="(product, index) in store.one_products" :key="index" cols="auto" class="px-0"
                    style="padding: 0;">
                    <v-text-field v-model="product.cost" :rules="[numberRule]" label="сум" variant="underlined"
                      style="width: 90px; font-size: 12px;"></v-text-field>
                  </v-col>
                  <v-col cols="auto" class="px-1">
                    <v-btn @click="store.incrementCost(id)" color="#0F9D58" class="v-btn--dense"
                      style="min-width: 10px; height: 24px; font-size: 12px;">
                      +
                    </v-btn>
                  </v-col>
                </v-row>

              </v-card-text>

              <v-btn class="mb-0" color="#0F9D58" style="width: 90%;" @click="addToCart(id)"><i
                  class='bx bx-cart-alt text-white'></i>Добавить вкорзину</v-btn>

            </v-card-item>

          </div>

        </div>

        <ClientOnly>

          <v-tabs v-model="tab" bg-color="#0F9D58" align-tabs="center" style="border-radius: 10px;">
            <v-tab value="one">Описание</v-tab>
            <v-tab value="two">Характеристика</v-tab>
          </v-tabs>
          <div class="centred-container">
            <v-card-text>
              <v-window v-model="tab">
                <v-window-item value="one">
                  <div class="text-start" ref="descriptionContainer">
                    {{ content[$i18n.locale].description }}
                  </div>
                </v-window-item>

                <v-window-item value="two">
                  <div class="text-start">
                    {{ content[$i18n.locale].characteristic }}
                  </div>
                </v-window-item>

              </v-window>

            </v-card-text>
          </div>

        </ClientOnly>

      </div>
    </div>

  </section>
</template>

<script setup>
import { ref } from 'vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';
import { productStore } from '@/stores/product';

const store = productStore();
const tab = ref(null);
const thumbsSwiper = ref(null);



const setThumbsSwiper = (swiper) => {
  thumbsSwiper.value = swiper;
};

const addToCart = (productId) => {
  const store = productStore();
  const alreadyInCart = store.cards.some((item) => item.id === productId);
  if (!alreadyInCart) {
    const selectedProduct = store.one_products.find((item) => item.id === productId);
    if (selectedProduct) {
      store.addCards(selectedProduct);
    }
  }
};
await store.FetchOneProduct();


const numberRule = val => {
  if (val < 0) return 'Please enter a positive number'
  return true
}

</script>


<style scoped>
.centred-container {
  width: 70%;
  margin: 0 auto;
}

.my-font {
  font-weight: 500;
  color: black !important;
}

.swiper {
  height: 400px;
  width: 400px;

}

.slider {
  padding: 32px;
  color: #fff;

}

.slider .swiper-container {
  width: 100%;
  height: 100%;

}

.slider__flex {
  display: flex;
  align-items: flex-start;

}

.slider__col {
  display: flex;
  flex-direction: column;
  width: 150px;
  margin-right: -32px;


}

.slider__thumbs {
  height: calc(400px - 96px);
  border-radius: 10%;


}

.mySwiper2 {
  border-radius: 10%;
  background: #e0e0e0;
  box-shadow: 5px 5px 11px #8f8f8f,
    -5px -5px 11px #ffffff;
}

.slider__thumbs .slider__image {

  width: 6rem;
  transition: 0.25s;
  -webkit-filter: grayscale(100%);
  filter: grayscale(100%);
  opacity: 0.5;

}

.slider__thumbs .slider__image:hover {
  opacity: 1;

}

.slider__thumbs .swiper-slide-thumb-active .slider__image {
  -webkit-filter: grayscale(0%);

  filter: grayscale(0%);
  opacity: 1;
}

.slider__images {
  height: 400px;

}

.slider__images .slider__image img {
  transition: 3s;
}

.slider__images .slider__image:hover img {
  transform: scale(1.1);
}

.slider__image {
  width: 100%;
  height: 100%;
  border-radius: 10%;
  overflow: hidden;
  background: #e0e0e0;
  box-shadow: 5px 5px 11px #8f8f8f,
    -5px -5px 11px #ffffff;

}

.slider__image img {
  display: block;
  width: 100%;
  height: 100%;
  -o-object-fit: cover;
  object-fit: cover;

}

@media (max-width: 767.98px) {
  .slider__flex {
    flex-direction: column-reverse;
  }

  .slider__col {
    flex-direction: row;
    align-items: center;
    margin-right: 0;
    margin-top: 24px;
    width: 100%;
  }

  .slider__images {
    width: 100%;

  }

  .slider__thumbs {

    height: 100px;
    width: calc(100% - 96px);
    margin: 0 16px;
  }

  .slider__prev,
  .slider__next {
    height: auto;
    width: 32px;
  }
}

.card {
  display: flex;
  margin-bottom: 100px;
  border-radius: 30px 30px 0 0;
}

.character {
  max-height: 100px;
  overflow-y: scroll;
}

.card-item-left {
  flex: 1;
  margin-right: 20px;
  border-radius: 30px;
  border-bottom: 0;

}

.card-item-right {
  flex: 1;
  width: 100%;

}

.carousel__item-left img {
  max-width: 100%;
  max-height: 100%;
  border-radius: 30px 30px 0 0;

  width: 609px;
  height: 406px;
}

.carousel__item-bottom {
  padding: 0;
  margin: 0;
  margin-right: 5px;
  margin-left: 5px;



}

.carousel__item-bottom img {
  max-width: 100%;
  max-height: 100%;
  border-radius: 25px;
}

#gallery {
  padding: 0;
}

#thumbnails {
  padding: 0;
}

@media (max-width: 768px) {
  .v-row {
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
    margin: 0 80px 0 0;
    padding: 0;
  }

  .food-menu {
    flex-direction: column;
    padding-top: 10px;

  }

  .card {
    flex-direction: column;
    margin: 10px 10px 0 10px;
  }

  .card-item-left,
  .card-item-right {
    width: 100%;
    margin: 0;
  }

  .carousel__item-left img {
    width: 100%;
    height: auto;
  }

  .carousel__item-bottom img {
    width: 100%;
    height: auto;
  }

  .v-btn--dense {
    min-width: auto;
    height: auto;
    font-size: 12px;
  }

  .v-text-field {
    width: 100%;
  }

  .v-card-item {
    margin-bottom: 20px;
  }
}</style>
