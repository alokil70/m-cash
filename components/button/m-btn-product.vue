<template>
    <div class="m-btn-product" :class="className" @click="click">
        <!--<i class="material-icons">e dit</i>-->
        <span>{{ title }}</span>
    </div>
</template>

<script>
export default {
    name: 'MBtnProduct',
    props: {
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
