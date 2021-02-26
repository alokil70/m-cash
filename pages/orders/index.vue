<template>
    <div>
        <div>cash</div>
        <div>cash</div>
        <div>cash</div>
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
                <div class="flex">
                    <m-btn-order
                        v-for="order in orderListFilter"
                        :key="order.id"
                        :object-data="order"
                        class="w200 m12"
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
            orderNumber: (state) => state.order.orderNumber,
        }),
        shift() {
            return this.cashShift[this.cashShift.length - 1]
        },
        orderListFilter() {
            const orderFilteredByShift = this.orderList.filter(
                (item) => item.CashShiftId === this.shift.id
            )
            return orderFilteredByShift.filter(
                (item) => item.user === this.$auth.user.email
            )
        },
        /* orderNumber() {
            return this.orderList[this.orderList.length - 1]
        }, */
        /* total() {
            return this.orderListFilter.reduce((sum, item) => {
                return (
                    sum +
                    item.positions.reduce((sum1, item) => {
                        return sum1 + item.product.price * item.quantity
                    }, 0)
                )
            })
        }, */
    },
    methods: {
        newOrder() {
            let idx = null
            if (this.shift.isOpen) {
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
                this.$store.$router.push('/orders/' + idx)
            }
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
