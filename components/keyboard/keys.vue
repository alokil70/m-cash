<template>
    <div class="flex height-keyboard">
        <m-btn-keyboard
            v-for="(item, idx) in arrayKeys"
            :key="idx"
            class="m6 black"
            :title="item"
        ></m-btn-keyboard>
    </div>
</template>

<script>
import MBtn from '@/components/button/m-btn'
import MBtnKeyboard from '@/components/button/m-btn-keyboard'
export default {
    name: 'Keys',
    components: { MBtnKeyboard, MBtn },
    props: {
        arrayKeys: {
            type: Array,
            default: () => [],
        },
    },
}
</script>

<style scoped></style>
