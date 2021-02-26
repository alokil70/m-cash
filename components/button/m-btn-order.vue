<template>
    <div>
        <nuxt-link
            class="m-btn"
            :class="className"
            :to="{ name: 'orders-id', params: { id: objectData.id } }"
        >
            <div>
                <span>Номер заказа {{ objectData.number }}</span>
                <span>Всего {{ cost }} руб</span>
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
            return this.objectData.positions.reduce((sum, item) => {
                return sum + item.product.price * item.quantity
            }, 0)
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
