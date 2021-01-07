<template>
    <div class="cash-block">
        <div class="cash-title-block">
            <div>Итого: 1400 р {{ quantity }} {{ totalC }} {{ cost }}</div>
            <div class="flex">
                <m-btn class="bg-green" :title="btnCancel" />
                <m-btn class="bg-green" :title="btnSave" />
            </div>
        </div>
        <div class="cash-function-block">
            <div class="table-with-added-product">
                <div
                    v-for="item in cart"
                    :key="item.product.id"
                    class="flex-between"
                >
                    <h3>{{ item.product.productName }}</h3>
                    <h3>{{ item.quantity }} x {{ item.product.price }}р</h3>
                    <h3>{{ item.product.price * item.quantity }}р</h3>
                </div>
            </div>
            <div class="product-btn-container">
                <m-btn-product
                    v-for="item in itemFilteredList"
                    :key="item.id"
                    :title="item.productName"
                    @click="addToCart(item)"
                />
            </div>
        </div>
        <div class="cash-bottom-block">
            <m-btn-product
                v-for="item in category"
                :key="item.id"
                :title="item.categoryName"
                @click="selectCategory(item)"
            />
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import MBtnProduct from '@/components/button/m-btn-product'
import MBtn from '@/components/button/m-btn'

export default {
    name: 'Cash',
    components: { MBtn, MBtnProduct },
    layout: 'cash',
    data() {
        return {
            URL: '',
            selectedCategory: null,
            btnSave: 'Сохранить',
            btnCancel: 'Отмена',
            quantity: null,
            total: 0,
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
            cart: (state) => state.cart.cart,
            totalC: (state) => state.cart.totalCost,
        }),
        cost() {
            this.cart.forEach((item) => {
                this.total = item.product.price * item.quantity
            })
            console.log(this.total)
            return this.total
        },
        itemFilteredList() {
            return this.products.filter((i) => {
                if (this.selectedCategory) {
                    return i.CategoryId === this.selectedCategory.id
                } else {
                    return this.products
                }
            })
        },
    },
    methods: {
        addToCart(data) {
            this.$store.dispatch('cart/ADD_TO_CART', {
                product: data,
                quantity: 1,
            })
            this.quantity += 1
        },
        selectCategory(item) {
            this.selectedCategory = item
            const obj = this.category.find(
                (i) => i.id === this.selectedCategory.id
            )
        },
    },
}
</script>

<style></style>
