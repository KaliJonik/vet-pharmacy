import { defineStore } from "pinia";

export const productStore = defineStore('products', {

  state: () => ({
    products: [],
    one_products: [],
    cards: [],
    category: [],
    manufacturer: [],
    token:'',
    sale: '',
    search:'',
    pageAPI: 1,
    pageCount: 1,

  }),
  actions: {
    
    async fetchProduct(selectedId, selectidmanter) {
      try {
        const categoryParam = selectedId ? `category=${selectedId}&` : '';
        const manufacturerParam = selectidmanter ? `manufacturer=${selectidmanter}&` : '';
        const data_sale = this.sale !== '' ? `sale=${this.sale}&` : '';
        const data_search = this.search !=='' ? `search=${this.search}&`:'';

        const { data: response } = await useAsyncData('svs', () => $fetch(`product/?${categoryParam}${manufacturerParam}${data_sale}${data_search}page=${this.pageAPI}&active=true`), {
          transform: (response) => {
            this.pageCount = response.page_count;
            return response.results.map((doc) => ({
              id: doc.id,
              price: doc.price,
              sale: doc.sale,
              old_price: doc.old_price,
              quantity: 0,
              cost: 0,
              content: {
                ru: { title: doc.title_ru },
                uz: { title: doc.title_uz },
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
      const { data: response } = await useAsyncData('svs', () => $fetch(`/product/${route.params.id}/?active=true`), {
        transform: (response) => {
          return [
            {
              id: response.id,
              photos: response.photos,
              price: response.price,
              sale: response.sale,
              old_price: response.old_price,
              quantity: 0,
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
    incrementQuantity(cardId) {
      const card = this.one_products.find((c) => c.id === cardId);
      card.quantity++;
      card.cost = (card.price * card.quantity);
      localStorage.setItem('cards', JSON.stringify(this.one_products));
    },

    DecrementQuantity(cardId) {
      const card = this.one_products.find((c) => c.id === cardId);
  
      if (card.quantity > 0) {
        card.quantity--;
        card.cost = parseInt(card.price * card.quantity);
      }
      localStorage.setItem('cards', JSON.stringify(this.one_products));
    },
    incrementQuantityCards(cardId) {
      const card = this.cards.find((c) => c.id === cardId);
      card.quantity++;
      card.cost = parseFloat(card.price * card.quantity);
      localStorage.setItem('cards', JSON.stringify(this.cards));
  

    },
    DecrementQuantityCards(cardId) {
      const card = this.cards.find((c) => c.id === cardId);
  
      if (card.quantity > 1) {
        card.quantity--;
        card.cost = parseFloat(card.price * card.quantity);
      }
      localStorage.setItem('cards', JSON.stringify(this.cards));
    },
    incrementCost(cardId) {
      const card = this.one_products.find((c) => c.id === cardId);
 
      card.cost = (parseInt(card.cost) || 0) + 1000;
      
      card.quantity = parseFloat(card.cost / card.price);
      localStorage.setItem('cards', JSON.stringify(this.one_products));
    },
    decrementCost(cardId) {
      const card = this.one_products.find((c) => c.id === cardId);

      if(card.cost > 0){
        card.cost = Math.max((parseFloat(card.cost) || 0) - 1000, 0);
        card.quantity = parseFloat(card.cost/card.price);
      }
      localStorage.setItem('cards', JSON.stringify(this.one_products));
    },


  },
  getters: {
    cardLenght: (state) => state.cards.length,
  }
});
