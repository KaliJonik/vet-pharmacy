<template>
  <Home />
  <About />
  <Delivery />
  <section id="manufacture">
    <div class="container">
      <h2 class="text-center  title-caruosel">
        {{ $t('swiper1') }}
      </h2>
      <carousel :settings="settings" :breakpoints="breakpoints" :wrap-around="true" :autoplay="3000" class="myCarousel">
        <slide v-for="{ id, image, content, url } in store.manufact.distribute" :key="id">
          <div class="carousel__item">
            <div class="carousel__image">
              <img :src="image" alt="">
            </div>
            <div class="carousel__info">
              <h3>{{ content[$i18n.locale].title }}</h3>
              <p>{{ content[$i18n.locale].description }}</p>
              <p v-if="url !== null">
                <a :href="url">Подробнее...</a>
              </p>
            </div>
          </div>
        </slide>
      </carousel>

      <h2 class="text-center  title-caruosel">
        {{ $t('swiper2') }}
      </h2>
      <carousel :settings="settings" :breakpoints="breakpoints" :wrap-around="true" :autoplay="3000" class="myCarousel2">
        <slide v-for="{ id, image, content, url } in store.manufact.own" :key="id">
          <div class="carousel__item">
            <div class="carousel__image">
              <img :src="image" alt="">
            </div>
            <div class="carousel__info">
              <h3>{{ content[$i18n.locale].title }}</h3>
              <p>{{ content[$i18n.locale].description }}</p>
              <p v-if="url !== null">
                <a :href="url">Подробнее...</a>
              </p>
            </div>
          </div>
        </slide>
      </carousel>

    </div>
  </section>
</template>


<script setup>
import { animation } from '@/composables/mainjs/on_scroll_animation';
import { ref } from 'vue';
import { Carousel, Slide } from 'vue3-carousel';
import { productStore } from '@/stores/product';

const store = productStore();
await store.getSwiperManufact();

onMounted(async () => {
  await store.getSwiperManufact();

})
const settings = ref({
  itemsToShow: 1,
  snapAlign: "center"
})

const breakpoints = ref({

  700: {
    itemsToShow: 2,
    snapAlign: "start",

  },
  800: {
    itemsToShow: 2,
    snapAlign: "start"
  },
  900: {
    itemsToShow: 2,
    snapAlign: "start"
  },

  1024: {
    itemsToShow: 3,
    snapAlign: "start"
  }
})


onMounted(() => {
  animation();
});




</script>

<style scoped>
#testimonial {
  color: black;
}



#about {
  color: black;
}

.title-caruosel {
  font-size: 18px;
  font-weight: 500;
  color: #098d4d;
}

.carousel__item {
  min-height: 200px;
  width: 100%;
  height: 200px;
  display: flex;
  background-color: #f0f3f7;
  color: black;
  font-size: 20px;
  border-radius: 1rem;
  border: 1px solid rgba(66, 66, 66, 0.897);
}

.carousel__image {
  flex: 0 0 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}


.carousel__image img {
  width: 8em;
  height: 8em;
  border-radius: 100%;
  object-fit: cover;
  padding: 1em;
  -webkit-box-shadow: inset 0px 0px 17px 0px rgba(0, 0, 0, 0.3);
  -moz-box-shadow: inset 0px 0px 17px 0px rgba(0, 0, 0, 0.3);
  box-shadow: inset 0px 0px 17px 0px rgba(0, 0, 0, 0.3);
}


.carousel__info {
  flex: 0 0 50%;
  padding: 20px;
  font-size: 16px;

  align-self: center;
  text-align: left;
}

.carousel__info h3 {
  margin-bottom: 10px;
}

.carousel__slide {
  padding: 10px;
}

.myCarousel {
  padding: 2rem 0;
}

.myCarousel2 {
  padding: 2rem 0 0 0;
}

@media(max-width: 600px) {
  .title-caruosel {
    font-size: 14px;
  }

  .carousel__image img {
    width: 10em;
    height: 10em;
    object-fit: cover;
  }
}</style>