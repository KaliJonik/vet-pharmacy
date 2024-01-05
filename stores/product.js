import { defineStore } from "pinia";

export const productStore = defineStore('products', {

  state: () => ({
    products: [],
    user: [],
    one_products: [],
    cards: [],
    category: [],
    manufacturer: [],
    sale: '',
    search: '',
    pageAPI: 1,
    pageCount: 1,
    e1: 1,
    manufact:[],
    about:[],
    order_history:[],
    Social:[],

  }),
  actions: {

    async fetchProduct(selectedId, selectidmanter) {
      try {
        const categoryParam = selectedId ? `category=${selectedId}&` : '';
        const manufacturerParam = selectidmanter ? `manufacturer=${selectidmanter}&` : '';
        const data_sale = this.sale !== '' ? `sale=${this.sale}&` : '';
        const data_search = this.search !== '' ? `search=${this.search}&` : '';

        const { data: response } = await useAsyncData('svs', () => $fetch(`product/?${categoryParam}${manufacturerParam}${data_sale}${data_search}page=${this.pageAPI}`), {
          transform: (response) => {
            this.pageCount = response.page_count;
            return response.results.map((doc) => ({
              id: doc.id,
              price: doc.price,
              sale: doc.sale,
              active:doc.active,
              old_price: doc.old_price,
              quantity: 1,
              cost: 0,
              content: {
                ru: { title: doc.title_ru , unit:doc.unit_ru },
                uz: { title: doc.title_uz , unit:doc.unit_uz},
              },
              image: doc.image,
            }));
          },
        });

        this.products = response.value;
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    },
    async FetchOneProduct() {
      const route = useRoute();
      const { data: response } = await useAsyncData('svs', () => $fetch(`/product/${route.params.id}/`), {
        transform: (response) => {
          return [
            {
              id: response.id,
              photos: response.photos,
              price: response.price,
              sale: response.sale,
              old_price: response.old_price,
              active:response.active,
              quantity: 1,
              cost: 0,
              content: {
                ru: {
                  title: response.title_ru,
                  category_title: response.category_title_ru,
                  manufacturer_title: response.manufacturer_title_ru,
                  description: response.description_ru,
                  unit: response.unit_ru,
                  characteristic: response.characteristic_ru
                },
                uz: {
                  title: response.title_uz,
                  category_title: response.category_title_uz,
                  manufacturer_title: response.manufacturer_title_uz,
                  description: response.description_uz,
                  unit: response.unit_uz,
                  characteristic: response.characteristic_uz
                },
              },

            }
          ]
        }

      });

      this.one_products = response.value;

    },
    async fethCategory() {
      try {

        const { data: category } = await useAsyncData('category', () => $fetch('/category/?active=true'), {
          transform: (category) => {
            const allCategories = {
              id: 0,
              content: {
                ru: { title: 'Все' },
                uz: { title: 'Hammasi' },
              },
            };
            const transformedCategories = category.map((doc) => ({
              id: doc.id,
              content: {
                ru: { title: doc.title_ru },
                uz: { title: doc.title_uz },
              },
            }));
            return [allCategories, ...transformedCategories];
          }
        });
        this.category = category.value;
      } catch (error) {
        console.error(error)
      }
    },
    async fethManufacture() {
      try {
        const { data: manufacturer } = await useAsyncData('manufacturer', () => $fetch('/manufacturer/?active=true'), {
          transform: (manufacturer) => {
            const allmanufacturer = {
              id: 0,
              content: {
                ru: { title: 'Все' },
                uz: { title: 'Hammasi' },
              },
            };
            const transformedmanufacturer = manufacturer.map((doc) => ({
              id: doc.id,
              content: {
                ru: { title: doc.title_ru },
                uz: { title: doc.title_uz },
              },
            }));
            return [allmanufacturer, ...transformedmanufacturer];
          }
        });
        this.manufacturer = manufacturer.value;

      } catch (error) {
        console.error(error)
      }
    },
    addCards(product) {

      this.cards.push(product);
      localStorage.setItem('cards', JSON.stringify(this.cards));

    },
    loadCards() {
      const storedCardsString = localStorage.getItem('cards')
      if (storedCardsString) {
        const storedCards = JSON.parse(storedCardsString)
        this.cards = storedCards;
      }
    },
    deleteCards(cardId) {
      this.cards = this.cards.filter((cards) => cards.id !== cardId);
      localStorage.setItem('cards', JSON.stringify(this.cards));
    },

    // One_product [id].vue   quantity
    incrementQuantity(cardId) {
      const index = this.one_products.findIndex((c) => c.id === cardId);
      if (index !== -1) {
        this.one_products[index].quantity++;
        this.one_products[index].cost = this.one_products[index].price * this.one_products[index].quantity;

      }
    },

    decrementQty(cardID) {
      const index = this.one_products.findIndex((c) => c.id === cardID);
      if (index !== -1) {
        if (this.one_products[index].quantity > 0) {
          this.one_products[index].quantity--;
          this.one_products[index].cost = this.one_products[index].price * this.one_products[index].quantity;
        } else {
          this.one_products[index].quantity = 0;
          this.one_products[index].cost = 0;
        }
      }
    },

    //Basket product index.vue quantity
    incrementBasket(cardID) {
      const index = this.cards.findIndex((c) => c.id === cardID);
      if (index !== -1) {
        this.cards[index].quantity++;
        this.cards[index].cost = this.cards[index].price * this.cards[index].quantity;
      }
      localStorage.setItem('cards', JSON.stringify(this.cards));
    },
    decrementBasket(cardID) {
      const index = this.cards.findIndex((c) => c.id === cardID);
      if (this.cards[index].quantity > 0) {
        this.cards[index].quantity--;
        this.cards[index].cost = this.cards[index].price * this.cards[index].quantity;
      } else {
        this.cards[index].quantity = 0;
        this.cards[index].cost = 0;
      }
      localStorage.setItem('cards', JSON.stringify(this.cards));
    },
    incrementBasketCost(cardID) {
      const index = this.cards.findIndex((c) => c.id === cardID);
      if (index !== -1) {
        if (index !== -1) {
          this.cards[index].cost = ((this.cards[index].cost) || 0) + 1000;
          this.cards[index].quantity = ((this.cards[index].cost / this.cards[index].price))
        }

      }
      localStorage.setItem('cards', JSON.stringify(this.cards));
    
    },

    decrementBasketCost(cardID) {
      const index = this.cards.findIndex((c) => c.id === cardID);
      if (this.cards[index].cost > 0) {
        this.cards[index].cost = ((this.cards[index].cost) || 0) - 1000;
        this.cards[index].quantity = ((this.cards[index].cost / this.cards[index].price))
      }
      localStorage.setItem('cards', JSON.stringify(this.cards));
    },

    // One_product [id].vue   cost

    incrementCost(cardId) {
      const index = this.one_products.findIndex((c) => c.id === cardId);
      if (index !== -1) {
        this.one_products[index].cost = ((this.one_products[index].cost) || 0) + 1000;
        this.one_products[index].quantity = ((this.one_products[index].cost / this.one_products[index].price))
      }
    },

    decrementCost(cardID) {

      const index = this.one_products.findIndex((c) => c.id === cardID);
      if (this.one_products[index].cost > 0) {
        this.one_products[index].cost = ((this.one_products[index].cost) || 0) - 1000;
        this.one_products[index].quantity = ((this.one_products[index].cost / this.one_products[index].price))
      }
    },

   


    async getUser() {

      try {
        const token = useAuthToken();
        if (token.value) {
          const { data } = await useAsyncData(() => $fetch('/user/me/'));
          this.user = data.value;
          localStorage.setItem('user', JSON.stringify(this.user))
        }


      } catch (error) {
        console.error(error)
      }
    },
    loadUser() {

      const token = useAuthToken();
      if (token.value === undefined || token.value === null)
      {
       localStorage.removeItem('user') 
      }
      else {
        const storeUser = localStorage.getItem('user');
        const storedCards = JSON.parse(storeUser)
        this.user = storedCards;
      }

    },
    async getSwiperManufact(){
      const { data: manufacture } = await useAsyncData('manufacture', () => $fetch('/manufacturer/broken/') ,{
        transform: (manufacture) => {
          const transformedData = {
            distribute: manufacture.own.map((doc) => ({
                id: doc.id,
                image: doc.image,
                url:doc.url,
                content: {
                  ru: { title: doc.title_ru, description: doc.country_ru },
                  uz: { title: doc.title_uz, description: doc.country_uz }
                }
              })),
            own: manufacture.distribute.map((doc) => ({
                id: doc.id,
                image: doc.image,
                url:doc.url,
                content: {
                  ru: { title: doc.title_ru, description: doc.country_ru },
                  uz: { title: doc.title_uz, description: doc.country_uz }
                }
              })),
          };
    
          return transformedData;
          
        }
      
      });
      this.manufact = manufacture.value;
    },
    async getAbout(){
      const {data:About} = await useAsyncData(()=>$fetch('/settings/'), {
        transform:(About) =>{
         this.Social = About[0].social;
          return About.map((doc)=>({
            id:doc.id,
            logo:doc.logo,
            phone_number1:doc.phone_number1,
            phone_number2:doc.phone_number2,
            email:doc.email,
            site_name:doc.site_name,
            content: {
              ru: { title: doc.title_about_ru, description: doc.about_ru, title_d:doc.title_delivery_ru, description_d:doc.delivery_guide_ru },
              uz: { title: doc.title_about_uz, description: doc.about_uz, title_d:doc.title_delivery_uz, description_d:doc.delivery_guide_uz }
            },
          }))
        }
      })
      this.about = About.value;
    
    },
    async getOrderHistory(){
      const { data:history } = await useAsyncData(()=>$fetch('/order/'), {
        
        transform:(history) => {
          return history.results.map((order)=>({
            id: order.id,
            full_name: order.full_name,
            phone: order.phone,
            address: order.address,
            status: order.status,
            cost: order.cost,
            is_delivery: order.is_delivery,
            details: order.details.map((detail) => ({
              id: detail.id,
              value: detail.value,
              cost: detail.cost,
              content: {
                ru: { title: detail.product_title_ru },
                uz: { title: detail.product_title_uz },
              },
            })),
          }))

        }

      })
      this.order_history = history.value
    },

  },
  getters: {
    cardLenght: (state) => state.cards.length,
  }
});
