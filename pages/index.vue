<template>
    <div class="cash-block">
        <div class="cash-title-block">
            <div class="m12">Итого: {{ cost }} руб</div>
            <div class="flex">
                <m-btn
                    class="bg-green"
                    :title="btnCancel"
                    @click="cancelOrder"
                />
                <m-btn class="bg-green" :title="btnSave" @click="saveOrder" />
            </div>
        </div>
        <div class="cash-function-block">
            <div class="table-with-added-product">
                <div
                    v-for="item in cart"
                    :key="item.product.id"
                    class="flex-between"
                >
                    <h3 class="w100p">{{ item.product.productName }}</h3>
                    <h3 class="w150">
                        {{ item.quantity }} x {{ item.product.price }} р
                    </h3>
                    <h3 class="w100 flex-center-align">
                        {{ item.product.price * item.quantity }} р
                    </h3>
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
    name: 'Index',
    auth: true,
    components: { MBtn, MBtnProduct },
    async asyncData({ store }) {
        if (
            store.getters['products/PRODUCTS'].length === 0 &&
            store.getters['products/CATEGORY'].length === 0
        ) {
            await store.dispatch('products/GET_PRODUCTS_FROM_API')
            await store.dispatch('products/GET_CATEGORY_FROM_API')
        }
    },
    data() {
        return {
            URL: '',
            selectedCategory: null,
            btnSave: 'Сохранить',
            btnCancel: 'Отмена',
            order: [],
            orderList: [],
            quantity: null,
            total: 0,
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
            return this.cart.reduce((sum, item) => {
                return sum + item.product.price * item.quantity
            }, 0)
        },
        itemFilteredList() {
            if (this.selectedCategory) {
                return this.products.filter(
                    (i) => i.CategoryId === this.selectedCategory.id
                )
            } else {
                return []
            }
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
        },
        saveOrder() {
            this.disabled = true
            if (!this.order) {
                this.order.push(this.cart)
            }
            this.orderList = this.order
            this.$store.dispatch('cart/CLEANCART')
            console.log(this.order)
            console.log(this.orderList)
            this.order = []
            this.orderList.push(this.order)
            this.disabled = false
        },
        cancelOrder() {
            this.$store.dispatch('cart/CLEANCART')
        },
    },
}
</script>

<style></style>
