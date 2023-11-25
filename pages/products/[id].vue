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
                            <img :src="ph.image" alt="" />
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

              <v-card-text class="text-start font-weight-bold text-h5 my-0  py-0 mb-2">

                {{ content[$i18n.locale].title }}
              </v-card-text>

              <v-card-text class="font-weight-light text-start py-0">
                <p class="my-0 font-weight-bold">
                  Производитель:
                </p>
                <div class="mb-2">
                  {{ content[$i18n.locale].manufacturer_title }}
                </div>
                <p class="my-0 font-weight-bold">
                  Характеристика:
                </p>
                <div>
                  {{ content[$i18n.locale].characteristic }}
                </div>
              </v-card-text>

              <v-card-text class="text-start text-h6 mb-0">

                <p class="py-0 my-0">
                  Цена: от {{ price }} сум
                  <s v-if="sale === true" class="text-caption ml-2 text-red"> {{ old_price }} сум</s>
                </p>


                <v-row class="display-flex align-center mb-0 my-0">
                  <v-col cols="auto" class="px-2 mx-1">
                    Объем:
                    <v-btn @click="decrement" color="#0F9D58" class="v-btn--dense"
                      style="min-width: 10px; height: 24px; font-size: 12px;">
                      -
                    </v-btn>
                  </v-col>
                  <v-col cols="auto" class="px-0" style="padding: 0;">
                    <v-text-field v-model="quantity" :rules="[numberRule]" :label="content[$i18n.locale].unit"
                      variant="underlined" style="width: 50px; font-size: 12px;"></v-text-field>
                  </v-col>
                  <v-col cols="auto" class="px-1">
                    <v-btn @click="increment" color="#0F9D58" class="v-btn--dense"
                      style="min-width: 10px; height: 24px; font-size: 12px;">
                      +
                    </v-btn>
                  </v-col>
                </v-row>
                <v-row class="display-flex align-center my-0 py-0 mb-0 pb-0">
                  <v-col cols="auto" class="px-2 mx-1">
                    Сумма:
                    <v-btn @click="decrementCost" color="#0F9D58" class="v-btn--dense"
                      style="min-width: 10px; height: 24px; font-size: 12px;">
                      -
                    </v-btn>
                  </v-col>
                  <v-col cols="auto" class="px-0" style="padding: 0;">
                    <v-text-field v-model="cost" :rules="[numberRule]" label="сум" variant="underlined"
                      style="width: 90px; font-size: 12px;"></v-text-field>
                  </v-col>
                  <v-col cols="auto" class="px-1">
                    <v-btn @click="inctementCost" color="#0F9D58" class="v-btn--dense"
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
          <div>
            <div :class="{ 'clip': !isExpanded }" @click="toggleExpansion" ref="descriptionContainer">
              {{ content[$i18n.locale].description }}
            </div>
            <button @click="toggleExpansion" id="show-more-button" v-if="!isExpanded">
              Показать полностью
            </button>
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
import { addToCart } from '@/composables/AddtoCard';


const thumbsSwiper = ref(null);

const setThumbsSwiper = (swiper) => {
  thumbsSwiper.value = swiper;
};

const store = productStore();

await store.FetchOneProduct();
const quantity = ref(0);

const cost = ref(0);

const decrement = () => {
  if (quantity.value > 0) {
    quantity.value--;
  }
};

const decrementCost = () => {
  if (cost.value > 0) {
    cost.value -= 1000;
  }
}
const inctementCost = () => {
  const currentValue = parseInt(cost.value);
  if (!isNaN(currentValue)) {
    cost.value = currentValue + 1000;
  } else {
    cost.value = 1000;
  }
}
const increment = () => {
  quantity.value++;
};


const numberRule = val => {
  if (val < 0) return 'Please enter a positive number'
  return true
}

const isExpanded = ref(false);

const toggleExpansion = () => {
  isExpanded.value = !isExpanded.value;
};

</script>


<style scoped>
.clip {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
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

}

.mySwiper2 {
  border-radius: 10%;
  box-shadow: rgba(17, 17, 26, 0.1) 0px 8px 24px,
    rgba(0, 0, 0, 0.1) 0px 16px 56px,
    rgba(17, 17, 26, 0.1) 0px 24px 80px;
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

/* .card-item-left:hover {
  box-shadow: rgba(14, 37, 15, 0.12) 0px 2px 4px 0px,
    rgba(14, 30, 37, 0.32) 0px 2px 16px 0px;
  transition: 3s;
} */

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
}
</style>
