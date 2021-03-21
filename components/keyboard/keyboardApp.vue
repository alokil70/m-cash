<template>
    <div>
        <!--<keyboard
            :input="input"
            @onChange="onChange"
            @onKeyPress="onKeyPress"
        />-->
        <div class="flex">
            <m-btn-keyboard
                v-for="item of arrayKeys.numbers"
                :title="item"
                class="black m6"
                @click="onKeyPress"
            />
            <m-btn title="Очистить" @click="clean" />
        </div>
        <div class="flex">
            <m-btn-keyboard
                v-for="item of arrayKeys.firstRow"
                :title="item"
                class="black m6"
                @click="onKeyPress"
            />
        </div>
        <div class="flex">
            <m-btn-keyboard
                v-for="item of arrayKeys.secondRow"
                :title="item"
                class="black m6"
                @click="onKeyPress"
            />
        </div>
        <div class="flex">
            <m-btn-keyboard
                v-for="item of arrayKeys.thirdRow"
                :title="item"
                class="black m6"
                @click="onKeyPress"
            />
        </div>
        <div class="flex">
            <m-btn-keyboard
                v-for="item of arrayKeys.fourthRow"
                :title="item"
                class="black m6"
                @click="onKeyPress"
            />
        </div>
    </div>
</template>

<script>
import MBtnKeyboard from '@/components/button/m-btn-keyboard'
import MBtn from '@/components/button/m-btn'

export default {
    name: 'KeyboardApp',
    components: { MBtn, MBtnKeyboard },
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
