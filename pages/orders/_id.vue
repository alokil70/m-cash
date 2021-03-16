<template>
    <div class="cash-block">
        <m-modal v-if="modalOpen" @close="modalOpen = !modalOpen">
            <div class="header flex-center-align m12">Карточка гостя</div>
            <div>
                <div class="m12">
                    <m-input v-model="btnSave" label="Название" />
                    <m-input v-model="btnSave" label="Цена" />
                    <m-input v-model="btnSave" label="Описание" />
                    <m-input :value="selectedCategory" label="Категория" />
                    <m-input v-model="btnSave" label="Фото" />
                </div>
                <div class="flex m12">
                    <m-btn
                        class="bg-green"
                        title="Выбрать"
                        :disabled="disabled"
                        @click="saveItem"
                    ></m-btn>
                </div>
            </div>
            <keyboard-app class="m6" />
        </m-modal>
        <div class="cash-title-block">
            <div class="m12">Итого: {{ cost }} руб</div>
            <div class="m12">Номер заказа: {{ $route.params.id }}</div>
            <div class="m12">Гость: Виктор +7 928 753-65-55</div>
            <div class="flex">
                <m-btn
                    class="bg-green"
                    :title="btnGuestChoose"
                    @click="guestChoose"
                />
                <m-btn
                    class="bg-green"
                    :title="btnCancel"
                    @click="cancelOrder"
                />
                <m-btn
                    class="bg-green"
                    :title="btnSave"
                    :disabled="!localCart"
                    @click="saveOrder"
                />
                <m-btn
                    class="bg-green"
                    :title="btnPay"
                    :disabled="!localCart"
                    @click="payOrder"
                />
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
import MModal from '@/components/modal/m-modal'
import MInput from '@/components/form/m-input'
import KeyboardApp from '@/components/keyboard/keyboardApp'

export default {
    name: 'Id',
    auth: true,
    components: { KeyboardApp, MInput, MModal, MBtn, MBtnProduct },
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
        modalOpen: false,
        selectedCategory: null,
        btnSave: 'Сохранить',
        btnPay: 'Оплатить',
        btnCancel: 'Отмена',
        btnGuestChoose: 'Гость',
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
        cost() {
            console.log('before enter if', this.order)
            if (this.localCart) {
                console.log('enter if', this.order)
                return this.localCart.reduce((sum, item) => {
                    return sum + item.product.price * item.quantity
                }, 0)
            }
            return 0
        },
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
        this.$store.dispatch('cart/CLEAN_CART')
        this.localCart = this.order.positions
        console.log('mounted _id', this.order)
        this.selectedCategory = this.category[0]
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
        guestChoose() {
            this.modalOpen = true
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
            await this.$store.dispatch('cart/CLEAN_CART')
            await this.$store.dispatch('order/UPDATE_ORDER', data)
            this.localCart = []
            await this.$router.push('/orders')
            this.disabled = false
        },
        async payOrder() {
            this.disabled = true
            const data = {
                id: this.order.id,
                positions: this.localCart,
                user: this.$auth.user.email,
                isPayed: true,
                totalCostOrder: this.cost,
            }
            console.log(data)
            console.log(this.order)
            await this.$store.dispatch('cart/CLEAN_CART')
            await this.$store.dispatch('order/UPDATE_ORDER', data)
            this.localCart = []
            await this.$router.push('/orders')
            this.disabled = false
        },
        cancelOrder() {
            this.$store.dispatch('cart/CLEAN_CART')
            this.$router.push('/orders')
        },
    },
}
</script>

<style></style>
