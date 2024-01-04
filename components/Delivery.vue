<template>
  <section class="delivery align-items-center" id="delivery">
    <div v-for="{ id, content } in store.about" :key="id">
      <h1 class="mt-10">{{ content[$i18n.locale].title_d }}</h1>
      <br>
      <div class="delivery-desc text-start" v-html="content[$i18n.locale].description_d"></div>
      <span class="scroll-icon">
        <span class="scroll-icon__dot"></span>
      </span>
    </div>
  </section>
</template>
  
<script setup>
import { productStore } from '@/stores/product';

const store = productStore();

</script>
  
<style scoped>
#delivery {
  color: #fff;
  position: relative;
  background-image: url('/Jasur.webp');
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  z-index: 1;
  height: 100dvh;
}

.delivery h1 {
  font-size: 24px !important;
  color: var(--primary-color);
}

.delivery::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100dvh;
  background: -webkit-linear-gradient(0deg, rgba(5, 5, 5, 0.856) 0, rgba(39, 39, 39, 0.856) 100%);
  opacity: 1;
  z-index: -1;
}

.delivery-desc {
  padding: 0 300px;
  overflow-y: scroll;
  height: 400px;
}

.delivery-desc {
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.delivery-desc::-webkit-scrollbar {
  display: none;
}

@media(max-width:600px) {
  .delivery-desc {
    padding: 0;
  }
}

@keyframes scroll_2 {
  0% {
    transform: translateY(0);
    opacity: 1;
  }

  25% {
    opacity: 1;
  }

  75% {
    transform: translateY(.75em);
    opacity: 0;
  }

  100% {
    transform: translateY(0);
    opacity: 0;
  }
}

.scroll-icon__dot {
  display: block;
  position: absolute;
  left: 50%;
  background: #fff;
  height: .5em;
  width: .5em;
  top: .6em;
  margin-left: -.25em;
  border-radius: 50%;
  transform-origin: top center;
  backface-visibility: hidden;
  animation: scroll_2 2s ease-out infinite;
}


.scroll-icon {
  display: block;
  position: relative;
  margin: 10px auto;
  height: 3em;
  width: 1.5em;
  border: .25em solid #fff;
  border-radius: 1em;
}

</style>
  