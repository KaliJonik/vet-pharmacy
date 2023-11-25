import { defineStore } from "pinia";

export const productStore = defineStore('products', {

  state: () => ({
    products: [],
    one_products: [],
    cards: [],
    category:[],
    manufacturer:[],
    sale:'',
    pageAPI: 1,
    pageCount: 1,
  }),
  actions: {
    async fetchProduct(selectedId, selectidmanter) {
    try {
        const categoryParam = selectedId ? `category=${selectedId}&` : '';
        const manufacturerParam = selectidmanter ? `manufacturer=${selectidmanter}&`:'';
        const price = this.sale !== '' ? `sale=${this.sale}&` : ''; 
        const { data: response } = await useAsyncData('svs', () => $fetch(`product/?${categoryParam}${manufacturerParam}${price}page=${this.pageAPI}&active=true`), {
          transform: (response) => {
            this.pageCount = response.page_count;
            return response.results.map((doc) => ({
              id: doc.id,
              price: doc.price,
              sale: doc.sale,
              old_price: doc.old_price,
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
              photos:response.photos, 
              price:response.price,
              sale:response.sale,
              old_price:response.old_price,

              content: {
                ru: {
                  title:response.title_ru,
                  category_title: response.category_title_ru,
                  manufacturer_title: response.manufacturer_title_ru,
                  description:response.description_ru,
                  unit:response.unit_ru,
                  characteristic:response.characteristic_ru
                },
                uz: {
                  title:response.title_uz,
                  category_title: response.category_title_uz,
                  manufacturer_title: response.manufacturer_title_uz,
                  description:response.description_uz,
                  unit:response.unit_uz,
                  characteristic:response.characteristic_uz
                },
              },

            }
          ]
        }
        
      });

      this.one_products = response.value;

    },
    async fethCategory(){
      try{

        const { data:category } = useAsyncData('category', ()=>$fetch('/category/?active=true') ,{ 
          transform:(category) => {
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

      }catch(error){
        console.error(error)
      }
    },
    async fethManufacture(){
      try{

        const { data:manufacturer } = useAsyncData('manufacturer', ()=>$fetch('/manufacturer/?active=true') ,{ 
          transform:(manufacturer) => {
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

      }catch(error){
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
    }
  },
  getters: {
    cardLenght: (state) => state.cards.length
  }
});
