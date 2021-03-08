<template>
    <div>
        <div>cash</div>
        <div>cash</div>
        <div>cash</div>
        <div v-if="shift">смена {{ shift.number }}</div>
        <div v-if="shift">Открыта? {{ shift.isOpen }}</div>
        <m-btn title="Открыть смену" @click="openShift"></m-btn>
        <m-btn title="Удалить смену" @click="deleteShift"></m-btn>
        <m-btn title="Закрыть смену" @click="closeShift"></m-btn>
    </div>
</template>

<script>
import MBtn from '@/components/button/m-btn'
import { mapState } from 'vuex'
export default {
    name: 'Index',
    components: { MBtn },
    auth: true,
    async asyncData({ store }) {
        if (store.getters['cashShift/CASH_SHIFTS'].length === 0) {
            await store.dispatch('cashShift/GET_CASH_SHIFTS_FROM_API')
        }
    },
    data() {
        return {}
    },
    computed: {
        ...mapState({
            cashShift: (state) => state.cashShift.cashShifts,
        }),
        shift() {
            return this.cashShift[this.cashShift.length - 1]
        },
    },
    methods: {
        openShift() {
            this.$store.dispatch('cashShift/OPEN_NEW_SHIFT')
            this.$router.push('/orders')
        },
        closeShift() {
            this.$store.dispatch('cashShift/CLOSE_SHIFT', this.shift.id)
        },
        deleteShift() {
            this.$store.dispatch('cashShift/DELETE_SHIFT', this.shift.id)
        },
    },
}
</script>

<style scoped></style>
