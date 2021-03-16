<template>
    <div :class="keyboardClass">
        <div>
            <m-btn title="1" />
            <m-btn title="1" />
            <m-btn title="1" />
            <m-btn title="1" />
            <m-btn title="1" />
        </div>
    </div>
</template>

<script>
import MBtn from '@/components/button/m-btn'

export default {
    name: 'Keyboard',
    components: { MBtn },
    props: {
        keyboardClass: {
            default: 'keyboard',
            type: String,
        },
        /* input: {
            type: String,
        }, */
    },
    data: () => ({
        // keyboard: null,
    }),
    /* watch: {
        input(input) {
            // this.keyboard.setInput(input)
        },
    }, */
    /* mounted() {
        this.keyboard = new Keyboard(this.keyboardClass, {
            onChange: this.onChange,
            onKeyPress: this.onKeyPress,
        })
    }, */
    methods: {
        onChange(input) {
            this.$emit('onChange', input)
        },
        onKeyPress(button) {
            this.$emit('onKeyPress', button)

            /**
             * If you want to handle the shift and caps lock buttons
             */
            if (button === '{shift}' || button === '{lock}') this.handleShift()
        },
        handleShift() {
            /* const currentLayout = this.keyboard.options.layoutName
            const shiftToggle =
                currentLayout === 'default' ? 'shift' : 'default'

            this.keyboard.setOptions({
                layoutName: shiftToggle,
            }) */
        },
    },
}
</script>

<style scoped></style>
