<template>
  <section class="align-items-center bg-img bg-img-fixed" id="food-menu-section" style="background-image: url(/broilers.jpg);">
    <div class="container">
      <div class="food-menu" v-for="{ id, content, price, old_price, sale, photos, active } in store.one_products" :key="id">
        <div class="card">
          <div class="card-item-left">
            <section class="slider">
              <div class="slider__flex">
                <div class="slider__col">
                  <div class="slider__thumbs">
                      <swiper @swiper="setThumbsSwiper" :loop="true" :spaceBetween="24" :slidesPerView="4"
                        :freeMode="true" direction="vertical" :watchSlidesProgress="true" :breakpoints="{ 0:{ direction:'horizontal', spaceBetween:100 }, 768:{direction:'vertical'} }"
                        :modules="[FreeMode, Navigation, Thumbs]" class="swiper-container">
                        <swiper-slide v-if="photos.length === 0">
                          <div class="slider__image">
                            <img src="/noimage.png" alt="No Image" />
                          </div>
                        </swiper-slide>

                        <swiper-slide v-for="ph in photos" :key="ph" v-else>
                          <div class="slider__image">
                            <img :src="ph.image" alt="" />
                          </div>
                        </swiper-slide>
                      </swiper>
                  </div>
                </div>
                <div class="slider__images">
                    <swiper :style="{
                      '--swiper-navigation-color': '#fff',
                      '--swiper-pagination-color': '#fff',

                    }" :loop="true" :spaceBetween="32" :navigation="true" :thumbs="{ swiper: thumbsSwiper }"
                      direction="horizontal" :modules="[FreeMode, Navigation, Thumbs]" class="swiper-container ">


                      <swiper-slide v-if="photos.length === 0">
                        <div class="slider__image">
                          <img src="/noimage.png" alt="No Image" />
                        </div>
                      </swiper-slide>


                      <swiper-slide v-for="ph in photos" :key="ph" v-else>
                        <div class="slider__image">
                          <img :src="ph.image" alt="" />
                        </div>
                      </swiper-slide>
                    </swiper>

                
                </div>

              </div>
            </section>

          </div>

          <div class="card-item-right">

            <v-card-item class="mt-9">

              <v-card-text class="text-start my-0  py-0 mb-2">
                <h2 class="my-font mb-3 font-weight-bold text-h5">
                  {{ content[$i18n.locale].title }}
                </h2>
                <h3 class="my-font mb-3">
                  {{ $t('manufac') }}: {{ content[$i18n.locale].manufacturer_title }}
                </h3>
                <h2 class="my-font mb-3">
                  {{ $t('price_item') }}:
                </h2>
                <div class="my-0 py-0 mb-0 pb-0">
                  <h1 class="my-font text-h4 my-0">
                     {{ addSpacesToNumber(price) }} {{ $t('price') }}
                    <s v-if="sale === true" class="text-caption ml-2 text-red"> {{ old_price }} {{ $t('price') }}</s>
                  </h1>
                </div>


              </v-card-text>


              <v-card-text class="my-8" style="padding: 0!important;">

                <div class="d-flex  align-center">
                  <div class="d-flex  flex-column ga-2">
                    <div class="wrapper my-5">
                      <div>
                        <span class="mx-3">{{ $t('volume') }}</span>
                      </div>
                      <button class="btn btn--minus" @click="store.decrementQty(id)" type="button" name="button">
                        -
                      </button>
                        <input class="quantity"  v-for="(product, index) in store.one_products" :key="index" v-model="product.quantity"
                         @input="CostInput(product)"  type="text">
                      <button class="btn btn--plus" @click="store.incrementQuantity(id)" type="button" name="button">
                        +
                      </button>
                      <span class="mx-2">{{ content[$i18n.locale].unit }}</span>
                    </div>
                    <div class="wrapper">
                      <div>
                        <span class="mx-3">{{ $t('cost') }}</span>
                      </div>
                      <button class="btn btn--minus" @click="store.decrementCost(id)" type="button" name="button">
                        -
                      </button>
                        <input class="quantity"  v-for="(product, index) in store.one_products" :key="index" v-model="product.cost" 
                        @input="QtyInput(product)"  type="text">
                      <button class="btn btn--plus" @click="store.incrementCost(id)" type="button" name="button">
                        +
                      </button>

                    </div>
                  </div>

                </div>

              </v-card-text>
              <div class="flex">
              </div>

              <v-btn class="my-btn-cart mb-0" :disabled="!active" icon="active ? 'mdi-cart' : 'mdi-close'" 
              :color="active ? '#0F9D58' : '#FF0000'" width="90%" @click="addToCart(id)">  {{ active ? $t('add_cart') : $t('add_not_cart') }}</v-btn>
            </v-card-item>

          </div>

        </div>
          <v-tabs v-model="tab" bg-color="#0F9D58" align-tabs="center" style="border-radius: 10px;">
            <v-tab value="one">{{ $t('desc') }}</v-tab>
          
          </v-tabs>
          <div class="centred-container">
            <v-card-text>
              <v-window v-model="tab">
                <v-window-item value="one">
                  <div class="text-start" ref="descriptionContainer" v-html="content[$i18n.locale].description">
                  </div>
                </v-window-item>


              </v-window>

            </v-card-text>
          </div>


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
const addSpacesToNumber = (number)=> {
    return String(number).replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    }
const CostInput = (product) => {
  product.cost = product.price * product.quantity;

}
const QtyInput = (product) => {
  product.quantity = product.cost / product.price;
  if (product.quantity < 0) {
    product.quantity = 0;
  }
}
const setThumbsSwiper = (swiper) => {
  thumbsSwiper.value = swiper;
};

const addToCart = (productId) => {
  const store = productStore();
  const alreadyInCart = store.cards.some((item) => item.id === productId);
  const router = useRouter();
  if (!alreadyInCart) {
    const selectedProduct = store.one_products.find((item) => item.id === productId);
    if (selectedProduct) {
      store.addCards(selectedProduct);
    }
  }
  else {
    router.push('/basket')
  }

};
await store.FetchOneProduct();

</script>


<style scoped>
.flex {
  display: flex;
  min-height: 10px;
  flex: 1 1 0;
}
.my-btn-cart{
  border-radius: 15px!important;
}
.centred-container {
  width: 80%;
  margin: 0 auto;
}

.my-font {
  font-weight: 400;
  font-size: 16px;
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
  width: 100px;
  margin-right: 15px;


}

.slider__thumbs {
  height:400px;
  border-radius: 10%;


}

.slider__thumbs .slider__image {

  width: 6rem;
  height: 5rem;
  transition: 0.25s;
  -webkit-filter: grayscale(100%);
  filter: grayscale(100%);
  opacity: 0.5;
  border: 0.1rem solid rgb(44, 43, 43);

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
  width: 400px;
  border: 0.1rem solid rgb(44, 43, 43);
  border-radius: 18px;
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
  border-radius: 18px;
  overflow: hidden;
  background: #e0e0e0;
  


}

.slider__image img {
  display: block;
  width: 100%;
  height: 100%;
  -o-object-fit: cover;
  object-fit: cover;

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
  .swiper{
    width: 100%!important;
  }
  .slider__flex {
    flex-direction: column-reverse;
  }

  .slider__col {
    flex-direction: row;
    align-items: center;
    margin: 20px 0 0 ;
    height: 100%;
    width: 100%;
  }

  .slider__images {
    width: 100%;

  }

  .slider__thumbs {

    height: auto;
    width:100%;
    }


  .v-row {
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
    margin: 0 80px 0 0;
    padding: 0;
  }
  .slider {
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
  .slider__images {
  height: 350px;
  width: 100%;


}
}

@media (max-width: 820px){
  .card{
    flex-direction: column;
  }
  .slider__flex {
    display: flex;
    justify-content: center;
    align-items: flex-start;
  }
  .swiper{
    width: 450px;
    height: 420px;
  }

}



.wrapper {
  height: 30px;
  display: flex;
  border-radius: 15px;
}

.quantity {
  -webkit-appearance: none;
  border: none;
  text-align: center;
  width: 100px;
  font-size: 14px;
  color: #0F9D58;
  font-weight: 300;
  border: 1px solid #0F9D58;
  box-shadow: none !important;
}


.btn {
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #0F9D58;
  width: 30px;
  color: #fff;
  background-color: #0F9D58;
  /*   border-radius: 6px; */
  cursor: pointer;


}

.btn--minus {
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
}

.btn--plus {
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
}

button:focus,
input:focus {
  outline: 0;

}


</style>
