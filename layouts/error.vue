<template>
    <div class="flex-center-align empty-page">
        <h1 class="error-color">Ошибка</h1>
        <nuxt-link to="/"><span class="white upper">вернуться</span></nuxt-link>
    </div>
</template>

<script>
export default {
    name: 'Error',
}
</script>

<style>
.container {
    margin: 0;
}
</style>
