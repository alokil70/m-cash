<template>
    <div>
        <nuxt-link
            class="m-btn"
            :class="[className, objectData.isPayed ? 'bg-green' : 'bg-red']"
            :to="{ name: 'orders-id', params: { id: objectData.number } }"
        >
            <div class="m12">
                <span class="m12">Номер заказа: {{ objectData.number }}</span>
                <span class="m12">ID: {{ objectData.id }}</span>
                <span class="m12">Итого: {{ cost }} руб</span>
            </div>
        </nuxt-link>
    </div>
</template>

<script>
export default {
    name: 'MBtnOrder',
    props: {
        objectData: {
            type: Object,
            default: () => {
                return {}
            },
        },
        title: {
            type: String,
            default: 'button',
        },
        disabled: Boolean,
        error: Boolean,
    },
    computed: {
        className() {
            return {
                disabled: this.disabled,
                error: this.error,
            }
        },
        cost() {
            if (this.objectData.positions) {
                return this.objectData.positions.reduce((sum, item) => {
                    return sum + item.product.price * item.quantity
                }, 0)
            }
            return 0
        },
    },
    methods: {
        click() {
            this.$emit('click')
        },
    },
}
</script>

<style scoped></style>
