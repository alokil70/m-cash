<template>
    <div>
        <div>cash</div>
        <div>cash</div>
        <div class="flex p5-0">
            Смена
            <m-btn-product
                v-for="item in cashShift"
                :key="item.id"
                :title="String(item.number)"
                @click="cashShiftHistoryView(item.id)"
            ></m-btn-product>
        </div>
        <div class="flex">
            <div class="m12">смена {{ shift.number }}</div>
            <div class="m12">Открыта? {{ shift.isOpen }}</div>
            <div class="m12">Всего {{ total }}</div>
        </div>
        <div>
            <div class="flex m12">
                <m-btn
                    title="Создать заказ"
                    class="bg-green w200 m12"
                    @click="newOrder"
                ></m-btn>
                <div class="product-btn-container">
                    <m-btn-order
                        v-for="order in orderListFilterByUserAndShift"
                        :key="order.id"
                        :object-data="order"
                        class="m12 w400"
                    ></m-btn-order>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import MBtn from '@/components/button/m-btn'
import { mapState } from 'vuex'
import MBtnOrder from '@/components/button/m-btn-order'
import MBtnProduct from '@/components/button/m-btn-product'

export default {
    name: 'Index',
    components: { MBtnProduct, MBtnOrder, MBtn },
    auth: true,
    async asyncData({ store }) {
        if (store.getters['order/ORDER_LIST'].length === 0) {
            await store.dispatch('order/GET_ORDER_LIST_FROM_API')
            await store.dispatch('cashShift/GET_CASH_SHIFTS_FROM_API')
        }
    },
    data: () => ({
        cashShiftLenghtChange: null,
    }),
    computed: {
        ...mapState({
            orderList: (state) => state.order.orderList,
            cashShift: (state) => state.cashShift.cashShifts,
            cart: (state) => state.cart.cart,
        }),
        shift() {
            return this.cashShift.find((item) => item.id === this.lastShift.id)
        },
        lastShift() {
            const last = this.cashShift[this.cashShift.length - 1]
            if (this.cashShiftLenghtChange) {
                return this.cashShift.find(
                    (item) => item.id === this.cashShiftLenghtChange
                )
            }
            return last
        },
        orderListFilterByUserAndShift() {
            const ordersFilteredByShift = this.orderList.filter(
                (item) => item.CashShiftId === this.shift.id
            )
            const ordersFilteredByUser = ordersFilteredByShift.filter(
                (item) => item.user === this.$auth.user.email
            )
            return ordersFilteredByUser.sort((a, b) => a.number - b.number)
        },
        total() {
            return 1
        },
    },
    methods: {
        async newOrder() {
            if (this.shift.isOpen) {
                const data = {
                    user: this.$auth.user.email,
                    CashShiftId: this.shift.id,
                }
                await this.$store.dispatch('cart/CLEAN_CART')
                await this.$store.dispatch('order/NEW_ORDER', data)
                const lastOrderNumber = this.orderListFilterByUserAndShift[
                    this.orderListFilterByUserAndShift.length - 1
                ].number
                await this.$store.$router.push('/orders/' + lastOrderNumber)
            }
        },
        closeShift() {
            this.$store.dispatch('cashShift/CLOSE_SHIFT')
        },
        deleteShift() {
            this.$store.dispatch('cashShift/DELETE_SHIFT')
        },
        cashShiftHistoryView(id) {
            this.cashShiftLenghtChange = id
        },
    },
}
</script>

<style scoped></style>
