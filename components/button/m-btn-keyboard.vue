<template>
    <button class="m-btn-keyboard" :class="className" @click="click(title)">
        <!--<i class="material-icons">e dit</i>-->
        <span>{{ title }}</span>
    </button>
</template>

<script>
export default {
    name: 'MBtnKeyboard',
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
        click(title) {
            this.$emit('click', title)
        },
    },
}
</script>

<style scoped></style>
