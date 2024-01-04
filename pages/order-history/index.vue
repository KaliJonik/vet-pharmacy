<template>
    <section class="bg-img h-100 bg-img-fixed" id="food-menu-section" style="background-image:  url(/chicken.jpg);">
        <div class="container">
            <div class="food-menu">
                <h1 class="text-center mb-3 history-title">{{ $t('order_history') }}</h1>
                <div class="order-container" v-for="items in store.order_history" :key="items.id"
                    v-if="store.order_history.length > 0">
                    <div class="orders">
                        <div class="order-img">
                            <img src="/order.webp" alt="">
                        </div>

                        <div class="order-title">
                            <h2>{{ $t('order_item') }} #{{ items.id }}</h2>
                            <h1 class="full-name">{{ truncateString(items.full_name, 15) }}</h1>
                            <span>{{ items.phone }}</span>
                        </div>
                        <v-btn class="elevation-0 status-button"
                            :class="{ 'order-status': true, 'processing': items.status === 'PROCESSING', 'accepted': items.status === 'AGREED', 'disabled': items.status === 'DENIED', 'success': items.status === 'SUCCESS' }">
                            {{ items.status }}
                        </v-btn>

                    </div>

                    <hr>
                    <div class="order-info">

                        <ul v-for="{ id, value, cost, content } in items.details" :key="id">
                            <li>{{ content[$i18n.locale].title }} {{ value }} <span>{{ addSpacesToNumber(cost) }}
                                    {{ $t('price') }}</span></li>
                        </ul>
                        <ul>
                            <li>
                                {{ $t('delivery_item') }}
                                <v-icon v-if="items.is_delivery" color="success">mdi-car</v-icon>
                                <v-icon v-else color="error">mdi-block-helper</v-icon>
                            </li>
                        </ul>


                        <hr>
                        <ul class="text-h5 my-3 font-weight-bold">
                            <li>{{ $t('total') }}: <span>{{ addSpacesToNumber(items.cost) }} {{ $t('price') }}</span></li>
                        </ul>
                    </div>

                </div>
                <div v-else class="centered-container">
                    <img src="/nodataimage.jpg" alt="No Products Available" class="centered-image" />
                </div>


            </div>
        </div>
    </section>
</template>

<script setup>
import { productStore } from '@/stores/product';

const store = productStore();
const token = useAuthToken();
    if (token.value !== undefined) {
        await store.getOrderHistory();
    }

const addSpacesToNumber = (number) => {
    return String(number).replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}
const truncateString = (text, maxLength) => {
    if (text && text.length > maxLength) {
        return text.substring(0, maxLength) + '...';
    }
    return text;
};
</script>

<style scoped>
.order-container {
    display: flex;
    flex-direction: column;
    padding: 25px;
    background-color: #f0f3f7;
    border-radius: 30px;
    margin-bottom: 20px;
}

.orders {
    display: flex;

}

.order-img img {
    width: 200px;
    height: 200px;
    object-fit: cover;
    border-radius: 20px;
    margin-bottom: 30px;
}

.order-title {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    margin: 0 0 0 30px;
    padding: 0px;
}

.order-status {
    margin: 10px 0 0 auto;
    color: #fff;

}

.processing {

    background-color: rgb(226, 226, 119);

}

.accepted {
    background-color: #397055;
}

.disabled {
    background-color: red;
}

.success {
    background-color: #0F9D58;
}

.order-info ul {
    display: flex;
    line-height: 2rem;

    flex-direction: column;
}

.order-info li {
    display: flex;
    justify-content: space-between;
}

ul li {
    list-style-type: none;
}

@media(max-width:600px) {
    .food-menu {
        padding: 1rem 1rem;
    }

    .order-img img {
        width: 100px;
        height: 100px;
    }

    .order-title {
        font-size: 12px;
    }

    .full-name {
        font-size: 10px !important;
    }

    .status-button {
        width: 20%;
        font-size: 8px;
    }
}</style>