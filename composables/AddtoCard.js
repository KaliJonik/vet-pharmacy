import { productStore } from "@/stores/product";
export const addToCart = (productId) => {
    const store = productStore();
    const router = useRouter();
    const alreadyInCart = store.cards.some((item) => item.id === productId);
    if (!alreadyInCart) {
        const selectedProduct = store.products.find((item) => item.id === productId);
        
        if (selectedProduct) {
            store.addCards(selectedProduct);
        }
    }
    else{
        router.push('/basket')
    }
};