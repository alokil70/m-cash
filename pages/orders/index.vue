<template>
    <div>
        <div>cash</div>
        <div>cash</div>
        <div>cash</div>
        <div class="flex p5-0">
            Смена
            <m-btn-product
                v-for="item in cashShift"
                :key="item.id"
                :title="item.number"
                @click="cashShiftHistoryView(item.id)"
            ></m-btn-product>
        </div>
        <div>смена {{ shift.number }}</div>
        <div>Открыта? {{ shift.isOpen }}</div>
        <div>Всего {{ total }}</div>
        <div>
            <div class="flex">
                <m-btn
                    title="Создать заказ"
                    class="w100"
                    @click="newOrder"
                ></m-btn>
                <div class="product-btn-container">
                    <m-btn-order
                        v-for="order in orderListFilterByUser"
                        :key="order.id"
                        :object-data="order"
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
        orderListFilterByUser() {
            const ordersFilteredByShift = this.orderList.filter(
                (item) => item.CashShiftId === this.shift.id
            )
            return ordersFilteredByShift.filter(
                (item) => item.user === this.$auth.user.email
            )
        },
    },
    methods: {
        async newOrder() {
            if (this.shift.isOpen) {
                const data = {
                    cart: this.cart,
                    user: this.$auth.user.email,
                    CashShiftId: this.shift.id,
                }
                await this.$store.dispatch('cart/CLEANCART')
                await this.$store.dispatch('order/NEW_ORDER', data)
                const lastOrder = this.orderListFilterByUser[
                    this.orderListFilterByUser.length - 1
                ].number
                await this.$store.$router.push('/orders/' + lastOrder)
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
