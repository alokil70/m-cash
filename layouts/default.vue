<template>
    <div class="default-page">
        <navbar />
        <modal name="my-first-modal">
            <h2>default</h2>
        </modal>
        <modal name="my-first-modal2">
            <h2>default2</h2>
        </modal>
        <Nuxt class="" />
    </div>
</template>
<script>
import Navbar from '~/components/nav-bars/Navbar'

export default {
    components: { Navbar },
}
</script>
<style>
/*html {
    font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
        'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
    font-size: 16px;
    word-spacing: 1px;
    -ms-text-size-adjust: 100%;
    -webkit-text-size-adjust: 100%;
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
    box-sizing: border-box;
}

*,
*::before,
*::after {
    box-sizing: border-box;
    margin: 0;
}*/
</style>
