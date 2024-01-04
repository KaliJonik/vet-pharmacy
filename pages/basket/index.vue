<template>
  <section class="bg-img bg-img-fixed" id="food-menu-section" style="background-image: url(/chicken.jpg);">
    <div class="container">
      <div class="basket-list">
        <div class="container">

          <div class="title">
            <h1 class="title-basket order-hist mx-2">{{ $t('basket') }}</h1>
            <nuxt-link to="/order-history" class="my-orders">
              <h3>{{ $t('order_history') }}</h3>
            </nuxt-link>
          </div>
          <div class="cart" v-if="store.cards.length > 0">

            <div class="products">

              <div class="product" v-for="(item, index) in store.cards" :key="item.id">

                <nuxt-link :to="'/products/' + item.id">
                  <img class="img-produtc"
                    :src="(item && item.image) || (item && item.photos && item.photos[0] && item.photos[0].image) || '/noimage.png'" />
                </nuxt-link>
                <div class="product-info">

                  <h2 class="product-name">{{ truncateString(item.content[$i18n.locale].title, 18) }}</h2>

                  <h3 class="product-price">{{ addSpacesToNumber(item.price) }} {{ $t('price') }}</h3>



                  <div class="product-quantity">
                    <button class="btn btn--minus" @click="store.decrementBasket(item.id)" type="button" name="button">
                      -
                    </button>
                    <input v-model="item.quantity" @input="CostInput(item)" type="text" style="background-color: #fff;">
                    <button class="btn btn--plus" @click="store.incrementBasket(item.id)" type="button" name="button">
                      +
                    </button>
                    <span class="mx-2">{{ item.content[$i18n.locale].unit }}</span>
                  </div>
                  <div class="product-cost">
                    <button class="btn btn--minus" @click="store.decrementBasketCost(item.id)" type="button"
                      name="button">
                      -
                    </button>
                    <input v-model="item.cost" @input="QtyInput(item)" type="text" style="background-color: #fff;">
                    <button class="btn btn--plus" @click="store.incrementBasketCost(item.id)" type="button" name="button">
                      +
                    </button>
                  </div>


                  <p class="product-remove">
                    <v-icon @click="store.deleteCards(item.id)">mdi-delete</v-icon>
                  </p>

                </div>

              </div>
            </div>

            <div class="cart-total">

              <p>

                <span>{{ $t('total') }}: </span>

                <span>{{ addSpacesToNumber(calcTotal) }} {{ $t('price') }}</span>

              </p>

              <p>

                <span>{{ $t('qty') }}: </span>

                <span>{{ store.cards.length }}</span>

              </p>
              <div class="my-flex">
              </div>



              <v-row justify="end">
                <v-dialog v-model="dialog" width="1024">
                  <template v-slot:activator="{ props }">
                    <v-btn color="#0F9D58" class="mr-3 elevation-0" v-bind="props" style="border-radius: 7px;">
                      {{ $t('buy') }}
                    </v-btn>
                  </template>
                  <v-stepper v-model="e1" hide-actions>
                    <template v-slot:default="{ props }">
                      <v-stepper-header>
                        <v-divider></v-divider>
                        <v-stepper-item :complete="e1 > 1" :title="$t('login')" :value="1" editable complete
                          :disabled="!!token" color="#0F9D58"></v-stepper-item>
                        <v-divider></v-divider>
                        <v-divider></v-divider>
                        <v-stepper-item :complete="e1 > 2" :title="$t('order_item')" :value="2" editable complete
                          :disabled="!token" color="#0F9D58"></v-stepper-item>
                        <v-divider></v-divider>
                      </v-stepper-header>
                      <v-stepper-window>
                        <v-stepper-window-item :value="!token ? 1 : null">

                          <div class="grey lighten-4 py-12 ">
                            <v-row class="d-flex align-items-center justify-content-center">
                              <v-col cols="12" lg="6" md="8" sm="12">
                                <v-card flat outlined width="auto" class="mx-auto">
                                  <v-tabs v-model="tab" active-class="white" height="40" fixed-tabs hide-slider>

                                    <v-btn color="#0F9D58" min-width="140px" class="button-menu"
                                      @click="handleTabClick(0)" flat>
                                      {{ $t('login') }}
                                    </v-btn>

                                    <v-btn color="#0F9D58" class="button-menu" @click="handleTabClick(1)" flat>
                                      {{ $t('reg') }}
                                    </v-btn>

                                  </v-tabs>

                                  <v-window v-model="tab">

                                    <v-window-item :value="0">

                                      <h1 class="mt-4"> {{ $t('login') }}</h1>

                                      <v-card-text class="p-0 my-7">
                                        <v-form v-model="valid" @submit.prevent="onLogin" ref="form" lazy-validation>


                                          <v-text-field v-model="user.phonenumber" prepend-inner-icon="mdi-phone"
                                            density="compact" :placeholder="$t('phone')" variant="outlined"
                                            :rules="[rules.phoneRequired, rules.phonenumber]" type="tel" />

                                          <v-text-field v-model="user.password"
                                            :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
                                            :type="visible ? 'text' : 'password'"
                                            :rules="[rules.passwordRequired, rules.min]" density="compact"
                                            :placeholder="$t('password')" prepend-inner-icon="mdi-lock-outline"
                                            variant="outlined" @click:append-inner="visible = !visible"></v-text-field>


                                          <div class="text-center">
                                            <v-btn type="submit" color="#0F9D58" class="mb-4 button-menu "
                                              min-width="200px">
                                              {{ $t('login') }}
                                            </v-btn>
                                          </div>
                                          <div @click="handleTabClick(2)" class="text-body-2 font-weight-regular"
                                            style="cursor: pointer;">{{ $t('reset_pass') }}</div>

                                          <div class="text-red">
                                            {{ errorMessage }}
                                          </div>

                                        </v-form>

                                      </v-card-text>
                                    </v-window-item>


                                    <v-window-item :value="1">
                                      <h1 class="mt-4"> {{ $t('reg') }}</h1>
                                      <v-card-text class="p-0 my-7">
                                        <v-form v-model="valid" @submit.prevent="onRegistrations" ref="form"
                                          lazy-validation>
                                          <v-col cols="auto">
                                            <v-text-field v-model="createUser.phone" prepend-inner-icon="mdi-phone"
                                              density="compact" :placeholder="$t('phone')" variant="outlined"
                                              :rules="[rules.phoneRequired, rules.phonenumber]" type="tel"></v-text-field>

                                            <v-text-field v-model="createUser.password1"
                                              :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
                                              :type="visible ? 'text' : 'password'"
                                              :rules="[rules.passwordRequired, rules.min]" density="compact"
                                              :placeholder="$t('password')" prepend-inner-icon="mdi-lock-outline"
                                              variant="outlined" @click:append-inner="visible = !visible"></v-text-field>

                                            <v-text-field v-model="createUser.password2"
                                              :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
                                              :type="visible ? 'text' : 'password'"
                                              :rules="[rules.passwordRequired, rules.min]" density="compact"
                                              :placeholder="$t('password')" prepend-inner-icon="mdi-lock-outline"
                                              variant="outlined" @click:append-inner="visible = !visible"></v-text-field>

                                          </v-col>
                                          <div class="text-center">
                                            <v-btn type="submit" color="#0F9D58" class="mb-4 button-menu "
                                              min-width="300px">
                                              {{ $t('reg') }}
                                            </v-btn>
                                            <div class="text-red">
                                              {{ errorStatus }}
                                            </div>
                                          </div>
                                        </v-form>
                                      </v-card-text>
                                    </v-window-item>

                                    <v-window-item :value="2">

                                      <h1 class="mt-4">{{ $t('restore') }}</h1>

                                      <v-card-text class="p-0 my-7">
                                        <v-form v-model="valid" @submit.prevent="onLogin" ref="form" lazy-validation>

                                          <v-text-field v-model="user.phonenumber" prepend-inner-icon="mdi-phone"
                                            density="compact" :placeholder="$t('phone')" variant="outlined"
                                            :rules="[rules.phoneRequired, rules.phonenumber]" type="tel"></v-text-field>
                                          <div class="text-center">
                                            <v-btn type="submit" color="#0F9D58" class="mb-4 button-menu "
                                              min-width="200px">
                                              {{ $t('send') }}
                                            </v-btn>
                                          </div>
                                          <div class="text-red">
                                            {{ errorMessage }}
                                          </div>

                                        </v-form>

                                      </v-card-text>
                                    </v-window-item>

                                  </v-window>
                                </v-card>
                              </v-col>
                            </v-row>

                          </div>

                        </v-stepper-window-item>

                        <v-stepper-window-item :value="token ? 2 : null">
                          <v-card flat>

                            <h2 class="text-h5 text-center mt-5 mb-5">{{ $t('order') }}</h2>


                            <v-card-text>
                              <v-container>
                                <v-form v-model="valid" @submit.prevent="onMyorders">
                                  <v-row>
                                    <v-col cols="12">
                                      <v-text-field v-model="order.full_name" :rules="[rules.fullName]" :label="$t('f')"
                                        hide-details variant="outlined" density="compact" required></v-text-field>
                                    </v-col>
                                    <v-col cols="12">
                                      <v-text-field v-model="order.phone" :label="$t('phone')"
                                        :rules="[rules.phoneRequired, rules.phonenumber]" hide-details variant="outlined"
                                        density="compact" required></v-text-field>
                                    </v-col>
                                    <v-col cols="12">
                                      <v-text-field v-model="order.address" :disabled="!order.is_delivery"
                                      :rules="getAddressRules" :label="$t('addres')" hide-details
                                        variant="outlined" density="compact" required></v-text-field>
                                    </v-col>
                                    <v-col cols="12">
                                      <v-checkbox color="#0F9D58" v-model="order.is_delivery"
                                        label="Доставка"></v-checkbox>
                                    </v-col>
                                    <v-col class="text-end">
                                      <v-btn color="#0F9D58" type="submit">{{ $t('send') }}</v-btn>
                                    </v-col>

                                  </v-row>



                                </v-form>

                              </v-container>

                            </v-card-text>
                          </v-card>
                        </v-stepper-window-item>

                      </v-stepper-window>
                    </template>
                  </v-stepper>

                  <v-btn text="Закрыть" class="mt-3" color="#0F9D58" @click="dialog = false"></v-btn>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                  </v-card-actions>

                </v-dialog>
              </v-row>

            </div>

          </div>
          <div v-else class="centered-container">
            <img src="/nodataimage.jpg" alt="No Products Available" class="centered-image" />
          </div>

        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { productStore } from "@/stores/product";

const store = productStore();


const dialog = ref(false);
const visible = ref(false)

const e1 = ref(1);
const token = useAuthToken();
const addSpacesToNumber = (number) => {
  return String(number).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}

const user = ref({
  phonenumber: "",
  password: "",
});

const createUser = ref({
  phone: "",
  password1: "",
  password2: "",
})

const order = ref({
  full_name: '',
  phone: '',
  address: null,
  is_delivery: false,
})

const calcTotal = computed(() => {
  let total = 0;
  store.cards.forEach((item) => {
    total += item.price * item.quantity;
  });
  return total;
});

const { login, registrations, my_order } = useAuth();


if (token.value) {
  e1.value++;
}
let tab = ref(0);

const handleTabClick = (index) => {
  tab.value = index;
}

const valid = ref(false);
const errorMessage = ref('');
const errorStatus = ref('');

const rules = {
  phonenumber: (value) => {
    const pattern = /^\+?\d{12}$/;
    return pattern.test(value) || "Your phone number should look like +998993332211";
  },
  phoneRequired: (value) => !!value || "You must enter your phone",
  passwordRequired: (value) => !!value || "Your password is required",

  passwordMatch: (value) => value === createUser.value.password1 || "Your passwords don't match",

  min: (v) => v.length >= 6 || "Your password must be at least 8 characters",
  fullName: (value) => {
    const pattern = /^[a-zA-Zа-яА-ЯёЁ\s]+$/;
    return pattern.test(value) || "Please enter a valid full name";
  },
  addres: (value) => {
  const pattern = /^[a-zA-Zа-яА-ЯёЁ\s,0-9]+$/;
  return pattern.test(value) || "Please enter a valid full name";
},

};
const getAddressRules = computed(() => {
  return order.value.is_delivery ? [rules.addres] : [];
});



async function onLogin() {
  if (valid.value) {
    try {
      await login(user.value.phonenumber, user.value.password);

      await store.getUser();
      e1.value++;
    } catch (error) {
      console.error(error);
      errorMessage.value = 'Не правильный логин или пароль!!';

    }
  }
}
async function onRegistrations() {
  try {
    if (valid.value) {
      const { user, status } = await registrations(createUser.value.phone, createUser.value.password1, createUser.value.password2);
      if (user.value !== null && status !== 'error') {
        await login(createUser.value.phone, createUser.value.password1);

        await store.getUser();
        e1.value++;
      } else {
        errorStatus.value = 'Пользователь уже существует';
      }
    }
  } catch (error) {
    console.error('Unexpected error during registration:', error);
  }
}
async function onMyorders() {
  try {
    if (valid.value) {
      if (order.value.is_delivery && !order.value.address) {
        // Handle the case where address is required for delivery but not provided
        console.log('Address is required for delivery but not provided.');
        return;
      }
      await my_order(order.value.full_name, order.value.phone, order.value.address, order.value.is_delivery);
      order.value.full_name = ''
      order.value.phone = ''
      order.value.address = ''
      order.value.is_delivery = ''
      localStorage.removeItem('cards')
      setTimeout(() => {
        window.location.reload();
      }, 2000);
      
    }
  } catch (error) {
    console.error(error)
  }
}
onMounted(() => {
  store.loadCards();

});


// const numberRule = (val) => {
//   if (isNaN(val) || val <= 0) {
//     return 'Ошибка';
//   }
//   return true;
// };
const CostInput = (product) => {
  product.cost = product.price * product.quantity;
  if (product.cost < 0) {
    product.cost = 0;
  }

}
const QtyInput = (product) => {
  product.quantity = product.cost / product.price;
  if (product.quantity < 0) {
    product.quantity = 0;
  }
}
const truncateString = (text, maxLength) => {
  if (text && text.length > maxLength) {
    return text.substring(0, maxLength) + '...';
  }
  return text;
};

</script>

<style scoped>
#food-menu-section {
  height: 100%;
}

.order-hist {
  color: #0F9D58;
}

.my-flex {
  display: flex;
  flex: 1 1 0;
  margin-bottom: 100px;
}

.v-card-text {
  padding: 0 !important;
}


.basket-list {
  padding: 5rem;
  background-color: var(--white);
  border-radius: 2rem;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
}




.title {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  line-height: normal;
}

.title h3 {
  margin-left: 100px;

}

.title h3:hover {
  color: #0F9D58;

}




.button-menu {
  text-transform: capitalize;
  font-size: 16px;
  margin: 0 0 0 16px;
  border-radius: 10px;
}




.btn {
  border: 1px solid #0F9D58;
  ;
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

.container {

  max-width: 1200px;

  margin: 0 auto;

}

.container>h1 {

  padding: 20px 0;

}

.cart {

  display: flex;

}

.products {

  flex: 1 1 0;

}

.product {

  display: flex;

  width: 100%;

  height: 220px;

  overflow: hidden;
  background-color: #f0f3f7;

  /* border: 1px solid silver; */
  border-radius: 15px;

  margin-bottom: 20px;

}




.img-produtc {
  width: 200px;
  height: 200px;
  object-fit: cover;
  border-radius: 15px;
  /* border: 0.1rem solid silver; */
  background-color: #fff;
  margin: 10px;
}


.product-info {

  padding: 20px;

  width: 100%;

  position: relative;

}

.product-name {
  margin-bottom: 5px;
}

.product-price {
  margin-bottom: 20px;
}

.product-remove {

  position: absolute;

  bottom: 20px;

  right: 20px;

  padding: 7px 10px;

  background-color: red;

  color: white;

  cursor: pointer;

  border-radius: 7px;

}

.product-remove:hover {

  background-color: white;

  color: red;

  font-weight: 600;

  border: 1px solid red;

}

.product-quantity>input {
  -webkit-appearance: none;
  border: none;
  text-align: center;
  width: 100px;
  font-size: 16px;
  color: #0F9D58;
  font-weight: 300;
  border: 1px solid #0F9D58;

}

.product-cost>input {
  -webkit-appearance: none;
  border: none;
  text-align: center;
  width: 100px;
  font-size: 16px;
  color: #0F9D58;
  font-weight: 300;
  border: 1px solid #0F9D58;
  margin-top: 10px;
}

.cart-total {

  flex: 0.25;

  margin-left: 20px;

  padding: 20px;

  height: 220px;

  border: 1px solid silver;

  border-radius: 15px;

}

.cart-total p {

  display: flex;

  justify-content: space-between;


  font-size: 18px;

}


@media screen and (max-width: 700px) {

  .title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    /* Add this line */
    margin-bottom: 10px;
    line-height: normal;
  }

  .title h1 {
    font-size: 16px !important;
    margin: 30px 0 15px auto;
  }

  .title h3 {
    font-size: 16px !important;
    margin: 30px auto 15px 0;
  }


  .basket-list {
    padding: 0;
  }

  .product {
    position: relative;
    height: 140px;
    margin-bottom: 10px;
    /* display: flex;
    flex-direction: column;
    height: 400px; */
  }

  .product-info {
    padding: 15px 20px 20px 10px;
  }

  .product-name {
    font-size: 14px;
  }

  .product-price {
    font-size: 12px;
    margin-bottom: 10px;
  }

  .img-produtc {
    width: 120px;
    height: 120px;
    border-radius: 12px;
  }

  .product-quantity {
    display: flex;
    align-items: center;
  }

  .product-cost {
    display: flex;
    align-items: center;
    margin-top: 5px;
  }

  .product-cost>input {
    margin-top: 0;
  }

  .product-quantity>input,
  .product-cost>input {
    width: 50%;
    height: 25px;
  }

  .btn--minus,
  .btn--plus {
    height: 25px;
    width: 25px;
    line-height: normal;
  }

  .product-remove {
    position: absolute;
    color: red;
    top: 5%;
    bottom: 186px;
    padding: 0;
    right: 5%;

  }



}

@media screen and (max-width: 900px) {
  .basket-list {
    padding: 0;
  }

  .cart {

    flex-direction: column;

  }

  .cart-total {

    margin-left: 0;

    margin-bottom: 20px;

  }

}

@media screen and (max-width: 1220px) {

  .container {

    max-width: 95%;

  }

}
</style>



