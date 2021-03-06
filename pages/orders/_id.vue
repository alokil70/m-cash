<template>
    <div class="cash-block">
        <div class="cash-title-block">
            <div class="m12">Итого: {{ cost }} руб</div>
            <div class="m12">Номер заказа: {{ $route.params.id }}</div>
            <div class="flex">
                <m-btn
                    class="bg-green"
                    :title="btnCancel"
                    @click="cancelOrder"
                />
                <m-btn class="bg-green" :title="btnSave" @click="saveOrder" />
                <m-btn class="bg-green" :title="btnPay" @click="payOrder" />
            </div>
        </div>
        <div class="cash-function-block">
            <div class="table-with-added-product">
                <div
                    v-for="item in localCart"
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
                    v-for="item in itemFilteredListByCategory"
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
import { mapState, mapGetters } from 'vuex'
import MBtnProduct from '@/components/button/m-btn-product'
import MBtn from '@/components/button/m-btn'

export default {
    name: 'Id',
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
    data: () => ({
        selectedCategory: null,
        btnSave: 'Сохранить',
        btnPay: 'Оплатить',
        btnCancel: 'Отмена',
        quantity: null,
        total: 0,
        localCart: [],
    }),
    computed: {
        ...mapState({
            products: (state) => state.products.products,
            category: (state) => state.products.category,
            cart: (state) => state.cart.cart,
        }),
        ...mapGetters({
            lastShift: 'cashShift/LAST_CASH_SHIFT',
            getOrder: 'order/GET_ORDER_BY_NUMBER_FILTERED_USER_CASHSHIFT',
        }),
        order() {
            return this.getOrder(
                Number(this.$route.params.id),
                this.lastShift,
                this.$auth.user
            )
        },
        /* cost() {
            return this.order.reduce((sum, item) => {
                return sum + item.product.price * item.quantity
            }, 0)
        }, */
        itemFilteredListByCategory() {
            if (this.selectedCategory) {
                return this.products.filter(
                    (i) => i.CategoryId === this.selectedCategory.id
                )
            } else {
                return []
            }
        },
    },
    mounted() {
        this.$store.dispatch('cart/CLEANCART')
        this.localCart = this.order.positions
        console.log(this.order)
    },
    methods: {
        addToCart(data) {
            this.$store.dispatch('cart/ADD_TO_CART', {
                product: data,
                quantity: 1,
            })
            this.quantity += 1
            this.localCart = this.cart
        },
        selectCategory(item) {
            this.selectedCategory = item
        },
        async saveOrder() {
            this.disabled = true
            const data = {
                id: this.order.id,
                positions: this.localCart,
                user: this.$auth.user.email,
                isPayed: false,
                totalCostOrder: null,
            }
            console.log(data)
            await this.$store.dispatch('cart/CLEANCART')
            await this.$store.dispatch('order/UPDATE_ORDER', data)
            await this.$router.push('/orders')
            this.disabled = false
        },
        async payOrder() {
            this.disabled = true
            const data = {
                id: this.order.id,
                cart: this.localCart,
                user: this.$auth.user.email,
                isPayed: true,
                totalCostOrder: this.cost,
            }
            console.log(data)
            console.log(this.order)
            await this.$store.dispatch('cart/CLEANCART')
            await this.$store.dispatch('order/UPDATE_ORDER', data)
            await this.$router.push('/orders')
            this.disabled = false
        },
        cancelOrder() {
            this.$store.dispatch('cart/CLEANCART')
            this.$router.push('/orders')
        },
    },
}
</script>

<style></style>
