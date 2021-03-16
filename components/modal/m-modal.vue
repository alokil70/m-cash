<template>
    <div>
        <div class="modalWrapper">
            <div class="popUp card">
                <div class="modalWrapper__upBar">
                    <div class="white m12">Какой то заголовок</div>
                    <div class="modalWrapper__closeBtn" @click="$emit('close')">
                        Х
                    </div>
                </div>
                <div>
                    <slot></slot>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'MModal',
    methods: {},
}
</script>

<style scoped></style>
