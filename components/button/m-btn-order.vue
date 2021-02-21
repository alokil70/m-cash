<template>
    <div>
        <nuxt-link
            class="m-btn"
            :class="className"
            :to="{ name: 'orders-id', params: { id: objectData.id } }"
            @click="click"
        >
            <span>{{ objectData.number }}</span>
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
    },
    methods: {
        click() {
            this.$emit('click')
        },
    },
}
</script>

<style scoped></style>
