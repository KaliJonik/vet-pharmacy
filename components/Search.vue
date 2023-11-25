<template>
    <v-row justify="end" align="center">
        <v-dialog v-model="dialog" persistent width="1024">
            <template v-slot:activator="{ props }">
                <v-btn color="#0F9D58" class="button-search d-flex align-items-center py-5 px-5 " v-bind="props"><v-icon
                        small left>mdi-magnify</v-icon>
                    Поиск
                </v-btn>
            </template>
            <v-card>
                <v-card-title class="mt-5 ms-2">
                    <span class="text-h5">Search</span>
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <v-row>
                            <v-col cols="12">
                                <v-text-field v-model="querySearch" append-icon="mdi-magnify" color="#0F9D58" variant="filled"
                                    clear-icon="mdi-close-circle" clearable label="Поиск" type="text"
                                    @click:append="searchItems" @click:clear="clearMessage"></v-text-field>
                            </v-col>
                        </v-row>
                    </v-container>
                    <v-list lines="three">

                        <v-list v-if="searchResults.length > 0">
                            <v-list-item v-for="{ id, content, image, price } in searchResults" :key="id"
                                :title="content[$i18n.locale].title" :subtitle="price" lines="three">
                                <template v-slot:prepend>
                                    <v-avatar rounded="0" color="grey-lighten-1">
                                        <img :src="image" alt="Avatar">
                                    </v-avatar>
                                </template>
                                <nuxt-link :to="'/products/' + id">Перейти</nuxt-link>
                            </v-list-item>
                        </v-list>

                        <div v-else class="centered-container">
                            <img src="/nodata.jpg" alt="No Data">
                        </div>
                    </v-list>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="#0F9D58" variant="text" @click="dialog = false">
                        Close
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-row>
</template>
  
<script setup>
const dialog = ref(false);
const querySearch = ref('');
const searchResults = ref([]);

const searchItems = async () => {
    try {
        const searchString = querySearch.value.toString();
        const { data: search } = await useAsyncData('search', () =>
            $fetch(`/product/?active=true&search=${searchString}`),
            {
                transform: (search) => {
                    return search.results.map((doc) => ({
                        id: doc.id,
                        image: doc.image,
                        price: doc.price,
                        content: {
                            ru: { title: doc.title_ru },
                            uz: { title: doc.title_uz },
                        },
                    }));
                },
            }
        );

        searchResults.value = search.value;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

const clearMessage = () => {
    querySearch.value = '';
    searchResults.value = [];
}

</script>
  
<style scoped>
.button-search {
    text-transform: capitalize;
    font-size: 16px;
    margin: 0 0 0 16px;
}

.centered-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
}
</style>