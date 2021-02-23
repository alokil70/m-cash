<template>
    <div>
        <div>cash</div>
        <div>cash</div>
        <div>cash</div>
        <div>смена {{ shift.number }}</div>
        <div>Открыта? {{ shift.isOpen }}</div>
        <div>
            <div class="flex w50">
                <m-btn title="Создать заказ" @click="newOrder"></m-btn>
                <m-btn-order
                    v-for="order in orderListFilter"
                    :key="order.id"
                    :object-data="order"
                ></m-btn-order>
            </div>
        </div>
    </div>
</template>

<script>
import MBtn from '@/components/button/m-btn'
import { mapState } from 'vuex'
import MBtnOrder from '@/components/button/m-btn-order'

export default {
    name: 'Index',
    components: { MBtnOrder, MBtn },
    auth: true,
    async asyncData({ store }) {
        if (store.getters['order/ORDER_LIST'].length === 0) {
            await store.dispatch('order/GET_ORDER_LIST_FROM_API')
            await store.dispatch('cashShift/GET_CASH_SHIFTS_FROM_API')
        }
    },
    data() {
        return {}
    },
    computed: {
        ...mapState({
            orderList: (state) => state.order.orderList,
            cashShift: (state) => state.cashShift.cashShifts,
            cart: (state) => state.cart.cart,
        }),
        shift() {
            return this.cashShift[this.cashShift.length - 1]
        },
        orderListFilter() {
            return this.orderList.filter(
                (item) => item.user === this.$auth.user.email
            )
        },
        orderNumber() {
            return this.orderList[this.orderList.length - 1]
        },
    },
    methods: {
        newOrder() {
            let idx = null
            if (!this.orderNumber) {
                idx = 1
            } else idx = this.orderNumber.number + 1
            const data = {
                number: idx,
                cart: this.cart,
                user: this.$auth.user.email,
                CashShiftId: this.shift.id,
            }
            this.$store.dispatch('order/NEW_ORDER', data)
        },
        closeShift() {
            this.$store.dispatch('cashShift/CLOSE_SHIFT')
        },
        deleteShift() {
            this.$store.dispatch('cashShift/DELETE_SHIFT')
        },
    },
}
</script>

<style scoped></style>
