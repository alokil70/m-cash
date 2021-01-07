<template>
    <div>
        <v-tabs centered>
            <v-tab>Бар</v-tab>
            <v-tab>Кухня</v-tab>
            <v-tab>Мангал</v-tab>

            <v-tab-item v-for="n in 3" :key="n">
                <v-container fluid>
                    <v-row>
                        <v-col
                            v-for="item in products"
                            :key="item.id"
                            cols="4"
                            md="4"
                            align="center"
                        >
                            <!--<v-card
                                width="240"
                                min-height="120"
                                aspect-ratio="1"
                                justify="center"
                                class="primary white&#45;&#45;text pa-2 headline"
                                tile
                                >{{ item.productName }}
                            </v-card>-->
                            <cash-product-card :obj="item" />
                        </v-col>
                    </v-row>
                </v-container>
            </v-tab-item>
        </v-tabs>
    </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
    name: 'Cash',
    components: {},
    layout: 'cash',
    data() {
        return {
            URL: '',
        }
    },
    async fetch({ store }) {
        if (
            store.getters['products/PRODUCTS'].length === 0 &&
            store.getters['products/CATEGORY'].length === 0
        ) {
            await store.dispatch('products/GET_PRODUCTS_FROM_API')
            await store.dispatch('products/GET_CATEGORY_FROM_API')
        }
    },
    computed: {
        ...mapState({
            products: (state) => state.products.products,
            category: (state) => state.products.category,
        }),
    },
    methods: {
        addToCart(data) {
            const qqq = this.products.find((i) => i.id === data.id)
            console.log(qqq)
        },
    },
}
</script>

<style scoped></style>
