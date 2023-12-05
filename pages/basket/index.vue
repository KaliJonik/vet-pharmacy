<template>
  <section class="bg-img bg-img-fixed" id="food-menu-section" style="background-image: url(/fix.png);">
    <div class="container">
      <div class="basket-list">
        <h1 class="mx-2">Корзина</h1>
        <div class="buttons-cheks">
          <!-- <v-checkbox v-model="store.selectAll" @change="selectAllItems" label="Выбрать все" color="#0F9D58"></v-checkbox>
          <nuxt-link class="px-5 mx-10 py-0 my-0 mb-0 pb-0" to="#">История Заказов</nuxt-link>
          <v-btn color="red" @click="deleteSelectedItems">Очистить</v-btn> -->

        </div>
        <div class="basket-list-item mb-5 p-0" v-for="(item, index) in store.cards" :key="item.id">
          <div class="image-basket">
            <nuxt-link :to="'/products/' + item.id">
              <img
                :src="(item && item.image) || (item && item.photos && item.photos[0] && item.photos[0].image) || '/noimage.png'"
                style="border-radius: 20px; width: 200px; height: 200px; object-fit: cover;" />
            </nuxt-link>
          </div>
          <div class="d-flex">
            <div class="d-block">
              <h2>{{ item.content[$i18n.locale].title }}</h2>
              <h3>Цена: {{ item.price }} {{ $t('price') }}</h3>
            </div>


            <v-row class="display-flex align-center mb-0 my-0">
              <v-col cols="auto" class="px-2 mx-1">
                Объем:
                <v-btn @click="store.DecrementQuantityCards(item.id)" color="#0F9D58" class="v-btn--dense"
                  style="min-width: 10px; height: 24px; font-size: 12px;">
                  -
                </v-btn>
              </v-col>
              <v-col cols="auto" class="px-0" style="padding: 0;">
                <v-text-field v-model="item.quantity" :label="item.content[$i18n.locale].unit" :rules="[numberRule]"
                  variant="underlined" style="width: 50px; font-size: 12px;"></v-text-field>
              </v-col>
              <v-col cols="auto" class="px-1">
                <v-btn @click="store.incrementQuantityCards(item.id)" color="#0F9D58" class="v-btn--dense"
                  style="min-width: 10px; height: 24px; font-size: 12px;">
                  +
                </v-btn>
              </v-col>
            </v-row>
          </div>
          <div class="chekbox">
            <v-btn @click="store.deleteCards(item.id)" size="small" class="mt-3"
              color="red"><v-icon>mdi-delete</v-icon></v-btn>
          </div>
        </div>
        <v-row justify="end" class="mt-10">
          <v-dialog v-model="dialog" scroll-strategy="close" width="1024">
            <template v-slot:activator="{ props }">
              <v-btn color="#0F9D58" v-bind="props">
                Купить
              </v-btn>
            </template>
            <v-stepper v-model="e1" hide-actions>
              <template v-slot:default="{ props }">
                <v-stepper-header>
                  <v-divider></v-divider>
                  <v-stepper-item :complete="!!token" :title="`Вход`" :value="1" editable complete :disabled="!!token"
                    color="#0F9D58"></v-stepper-item>
                  <v-divider></v-divider>
                  <v-divider></v-divider>
                  <v-stepper-item :complete="e1 > 2" :title="`Step 2`" :value="2" editable complete
                    :disabled="!!store.cards" color="#0F9D58"></v-stepper-item>
                  <v-divider></v-divider>
                </v-stepper-header>

                <v-stepper-window>
                  <v-stepper-window-item :value="1">
                    <div class="grey lighten-4 py-12 ">
                      <v-row class="d-flex align-items-center justify-content-center">
                        <v-col cols="12" lg="6" md="8" sm="12">
                          <v-card flat outlined>
                            <v-tabs v-model="tab" active-class="white" height="40" fixed-tabs hide-slider>
                              <v-btn color="#0F9D58" min-width="140px" class="button-menu" @click="handleTabClick(0)"
                                flat>
                                Вход
                              </v-btn>
                              <v-btn color="#0F9D58" class="button-menu" @click="handleTabClick(1)" flat>
                                Регистрация
                              </v-btn>

                            </v-tabs>

                            <v-window v-model="tab">

                              <v-window-item :value="0">

                                <h1 class="mt-4">Вход</h1>

                                <v-card-text class="p-0 my-7">
                                  <v-form v-model="valid" @submit.prevent="onLogin" ref="form" lazy-validation>
                                    <v-text-field prepend-icon="mdi-phone" validate-on-blur clearable dense outlined
                                      v-model="user.phonenumber" :rules="[rules.phoneRequired, rules.phonenumber]"
                                      label="Please enter your phone" type="tel" required />

                                    <v-text-field :append-inner-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                                      :rules="[rules.passwordRequired, rules.min]" :type="show1 ? 'text' : 'password'"
                                      counter @click:append-inner="togglePasswordVisibility" prepend-icon="mdi-lock" dense
                                      outlined v-model="user.password" label="Please enter your password" required />


                                    <div class="text-center">
                                      <v-btn type="submit" color="#0F9D58" class="mb-4 button-menu " min-width="200px">
                                        Войти
                                      </v-btn>
                                    </div>
                                    <div  @click="handleTabClick(2)" class="text-body-2 font-weight-regular" style="cursor: pointer;">Забыли пароль?</div>

                                    <div class="text-red">
                                      {{ errorMessage }}
                                    </div>

                                  </v-form>

                                </v-card-text>
                              </v-window-item>


                              <v-window-item :value="1">
                                <h1 class="mt-4">Регистрация</h1>
                                <v-card-text class="p-0 my-7">
                                  <v-form v-model="valid" @submit.prevent="onRegistrations" ref="form" lazy-validation>

                                    <v-text-field prepend-icon="mdi-phone" validate-on-blur clearable dense outlined
                                      v-model="createUser.phone" :rules="[rules.phoneRequired, rules.phonenumber]"
                                      label="Please enter your phone" type="tel" required />

                                    <v-text-field :append-inner-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                                      v-model="createUser.password1" :rules="[rules.passwordRequired, rules.min]"
                                      :type="show1 ? 'text' : 'password'" counter
                                      @click:append-inner="togglePasswordVisibility" prepend-icon="mdi-lock" dense
                                      outlined label="Please enter your password" required />

                                    <v-text-field :append-inner-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                                      v-model="createUser.password2"
                                      :rules="[rules.passwordRequired, rules.min, rules.passwordMatch]"
                                      :type="show1 ? 'text' : 'password'" counter
                                      @click:append-inner="togglePasswordVisibility" prepend-icon="mdi-lock" dense
                                      outlined label="Please confirm your password" required />

                                    <div class="text-center">
                                      <v-btn type="submit" color="#0F9D58" class="mb-4 button-menu " min-width="300px">
                                        Зарегистрироваться
                                      </v-btn>
                                      <div class="text-red">
                                        {{ errorStatus }}
                                      </div>
                                    </div>
                                  </v-form>
                                </v-card-text>
                              </v-window-item>

                              <v-window-item :value="2">

                                <h1 class="mt-4">Сброс пароля</h1>

                                <v-card-text class="p-0 my-7">
                                  <v-form v-model="valid" @submit.prevent="onLogin" ref="form" lazy-validation>
      
                                    <v-text-field prepend-icon="mdi-phone" validate-on-blur clearable dense outlined
                                      v-model="user.phonenumber" :rules="[rules.phoneRequired, rules.phonenumber]"
                                      label="Please enter your phone" type="tel" required />

                                    <div class="text-center">
                                      <v-btn type="submit" color="#0F9D58" class="mb-4 button-menu " min-width="200px">
                                        Отправить
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

                  <v-stepper-window-item :value="2" v-if="store.cards && store.cards.length !== 0">
                    <v-card flat>
                      <v-card-title>
                        <span class="text-h5">Оформление</span>
                      </v-card-title>

                      <v-card-text>
                        <v-container>
                          <v-row>
                            <v-col cols="12" sm="6" md="4">
                              <v-text-field label="Legal first name*" required></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="4">
                              <v-text-field label="Legal middle name"
                                hint="example of helper text only on focus"></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="4">
                              <v-text-field label="Legal last name*" hint="example of persistent helper text"
                                persistent-hint required></v-text-field>
                            </v-col>
                            <v-col cols="12">
                              <v-text-field label="Email*" required></v-text-field>
                            </v-col>
                            <v-col cols="12">
                              <v-text-field label="Password*" type="password" required></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6">
                              <v-select :items="['0-17', '18-29', '30-54', '54+']" label="Age*" required></v-select>
                            </v-col>
                            <v-col cols="12" sm="6">
                              <v-autocomplete
                                :items="['Skiing', 'Ice hockey', 'Soccer', 'Basketball', 'Hockey', 'Reading', 'Writing', 'Coding', 'Basejump']"
                                label="Interests" multiple></v-autocomplete>
                            </v-col>
                          </v-row>
                        </v-container>

                      </v-card-text>
                    </v-card>
                  </v-stepper-window-item>
                  <v-stepper-window-item :value="2" v-else>
                    <h1>Ничего нету в корзине</h1>
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
  </section>
</template>

<script setup>
import { productStore } from "@/stores/product";

const store = productStore();

const user = ref({
  phonenumber: "",
  password: "",
});

const createUser = ref({
  phone: "+998974083121",
  password1: "123jaxa123",
  password2: "123jaxa123",
})

const dialog = ref(false);

const e1 = ref(1);


const { login, registrations } = useAuth();
const token = useAuthToken();

if (token.value) {
  e1.value++;
}
let tab = ref(0);

const handleTabClick = (index) => {
  tab.value = index;
}

const show1 = ref(false);
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

  min: (v) => v.length >= 4 || "Your password must be at least 8 characters",
};


const togglePasswordVisibility = () => {
  show1.value = !show1.value;
};



async function onLogin() {
  if (valid.value) {
    try {
      await login(user.value.phonenumber, user.value.password);

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
        e1.value++;
      } else {
        errorStatus.value = 'Пользователь уже существует';
      }
    }
  } catch (error) {
    console.error('Unexpected error during registration:', error);
  }
}

onMounted(() => {
  store.loadCards();
})

const numberRule = (val) => {
  if (val < 0) return 'Please enter a positive number';
  return true;
};

</script>

<style scoped>
#food-menu-section {
  height: 100%;
}

.button-menu {
  text-transform: capitalize;
  font-size: 16px;
  margin: 0 0 0 16px;
  border-radius: 10px;
}

.v-card-text {
  padding: 0 !important;
}

.btn-stepper {
  color: #fff;
  background-color: #0F9D58;
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
}

.image-basket img {
  display: flex;
  margin: 0;
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

@media only screen and (max-width: 600px) {
  h1 {
    font-size: 2rem !important;
  }
}
</style>



