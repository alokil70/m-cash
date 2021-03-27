<template>
    <div></div>
</template>

<script>
import MBtnKeyboard from '@/components/button/m-btn-keyboard'
import MBtn from '@/components/button/m-btn'

export default {
    name: 'KeyboardApp',
    data: () => ({
        input: '',
        arrayKeys: {
            numbers: [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, '<-'],
            firstRow: [
                'Й',
                'Ц',
                'У',
                'К',
                'Е',
                'Н',
                'Г',
                'Ш',
                'Щ',
                'З',
                'Х',
                'Ъ',
            ],
            secondRow: ['Ф', 'Ы', 'В', 'А', 'П', 'Р', 'О', 'Л', 'Д', 'Ж', 'Э'],
            thirdRow: ['Я', 'Ч', 'С', 'М', 'И', 'Т', 'Ь', 'Б', 'Ю'],
            fourthRow: ['@', '___', '!'],
        },
    }),
    methods: {
        clean() {
            this.$emit('clean')
        },
        onChange(input) {
            this.input = input
        },
        onKeyPress(button) {
            this.$emit('click', button)
        },
        onInputChange(input) {
            this.input = input.target.value
        },
    },
}
</script>

<style></style>
