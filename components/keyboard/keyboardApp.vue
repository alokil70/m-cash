<template>
    <div>
        <!--<keyboard
            :input="input"
            @onChange="onChange"
            @onKeyPress="onKeyPress"
        />-->
        <keys :array-keys="arrayKeys.numbers" />
        <keys :array-keys="arrayKeys.firstRow" />
        <keys :array-keys="arrayKeys.secondRow" />
        <keys :array-keys="arrayKeys.thirdRow" />
        <keys :array-keys="arrayKeys.fourthRow" />
    </div>
</template>

<script>
import Keys from '@/components/keyboard/keys'
export default {
    name: 'KeyboardApp',
    components: { Keys },
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
        onChange(input) {
            this.input = input
        },
        onKeyPress(button) {
            console.log('button', button)
        },
        onInputChange(input) {
            this.input = input.target.value
        },
    },
}
</script>

<style></style>
