<template>
 <section id="home" class="fullheight align-items-center bg-img bg-img-fixed"
        style="background-image: url(/dall-e-cat.png); color:black;">
        <div class="container">
            <div class="row">
                <div class="col-6 col-xs-12">
                    <div class="slogan">
                        <h1 class="left-to-right play-on-scroll">
                            SVS
                        </h1>
                        <p class="left-to-right play-on-scroll delay-2">
                            {{ $t('welcome') }}
                        </p>
                        <div class="left-to-right play-on-scroll delay-4">
                            <button>
                                {{ $t('order') }}
                            </button>
                        </div>
                    </div>
                </div>
              
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">


</script>

<style scoped>
/* #home{
    position: relative;
}
 #home::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(0deg, rgba(161, 61, 61, 0.8)) 0, rgba(39, 39, 39, 0) 100%;
    opacity: 1;
    z-index: -1;
  } */

</style>
