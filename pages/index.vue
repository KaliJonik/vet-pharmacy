<template>
  <Home />
  <!-- END SECION ABOUT -->
  <About />
  
  <!-- TESTIMONIAL SECTION -->
<section id="testimonial">
  <div class="container">
    <Carousel  id="activeClasses"  :items-to-show="numberOfSlides" :wrap-around="true" :autoplay="2000">
        <Slide v-for="{id, content, image} in manufacture" :key="id" class="col-4 col-xs-12">
          <div class="row">
            <div class="zoom play-on-scroll review-wrap">
              <div class="active">
                <div class="review-content">
                  <p>{{ content[$i18n.locale].description }}</p>
                  <div class="review-img bg-img" :style="{ 'background-image': 'url(' + image + ')' }"></div>
                </div>
                <div class="review-info">
                  <h3>{{ content[$i18n.locale].title }}</h3>
                  <div class="rating">
                    <i class='bx bxs-star'></i>
                    <i class='bx bxs-star'></i>
                    <i class='bx bxs-star'></i>
                    <i class='bx bxs-star'></i>
                    <i class='bx bxs-star'></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Slide>
     </Carousel>
  </div>
</section>

</template>




<script setup>
import { animation } from '@/composables/mainjs/on_scroll_animation';
import { ref } from 'vue';
import { Carousel, Slide } from 'vue3-carousel';


const { data:manufacture } = await useAsyncData('manufacture', ()=> $fetch('/manufacturer/'), { lazy:true,
  transform:(manufacture)=>{
    return manufacture.map((doc)=>({
      id:doc.id,
      image:doc.image,
      content:{
        ru:{ title:doc.title_ru, description:doc.description_ru },
        uz:{ title:doc.title_uz, description:doc.description_uz }
      }
    }))
  }
});

let numberOfSlides = ref(5);

const setNumberOfSlides = () => {
  if (window.innerWidth < 768) {
    numberOfSlides.value = 1; 
  } else if (window.innerWidth < 1024) {
    numberOfSlides.value = 2; 
  } else {
    numberOfSlides.value = 3; 
  }
};


onMounted(() => {
  animation();
  setNumberOfSlides();
  window.addEventListener('resize', setNumberOfSlides);
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', setNumberOfSlides);
});


</script>

<style scoped>
#testimonial {
  color: black;
}

#about {
  color: black;
}

#activeClasses {
  .carousel__slide {
    padding:5rem;
  }

  .carousel__viewport {
    perspective: 2000px;
  }

  .carousel__track {
    transform-style: preserve-3d;
  }

  .carousel__slide--sliding {
    transition: 0.5s;
  }

  .carousel__slide {
    width: 400px;
    opacity: 0.9;
    transform: rotateY(-20deg) scale(0.9);
  }

  .carousel__slide--active ~ .carousel__slide {
    transform: rotateY(20deg) scale(0.9);
  }

  .carousel__slide--prev {
    opacity: 1;
    transform: rotateY(-10deg) scale(0.70);
  }

  .carousel__slide.carousel__slide--next {
    opacity: 1;
    transform: rotateY(10deg) scale(0.70);
  }

  .carousel__slide--active {
    opacity: 1;
    transform: rotateY(0) scale(1.1);
  }
}

</style>


