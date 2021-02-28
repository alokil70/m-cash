<template>
    <header>
        <nav>
            <ul>
                <li>
                    <nuxt-link v-if="$auth.user.admin" to="/client"
                        >Клиенты</nuxt-link
                    >
                </li>
                <li><nuxt-link to="/">Н</nuxt-link></li>
                <li><nuxt-link to="/orders">Заказы</nuxt-link></li>
                <li>
                    <nuxt-link v-if="$auth.user.admin" to="/manager">
                        Менеджеры
                    </nuxt-link>
                </li>
                <li><nuxt-link to="/cashShift">Смены</nuxt-link></li>
                <li>
                    <nuxt-link v-if="$auth.user.admin" to="/setting">
                        Настройки
                    </nuxt-link>
                </li>
            </ul>
            <ul>
                <a class="small12 lower">{{ date }}</a>
            </ul>
            <ul>
                <li v-if="$auth.loggedIn">
                    <nuxt-link to="/auth/login">{{
                        $auth.user.name
                    }}</nuxt-link>
                </li>
                <li v-else>
                    <nuxt-link to="auth/login">Войти</nuxt-link>
                </li>
                <li><a href="" @click="logout">Выйти</a></li>
            </ul>
        </nav>
    </header>
</template>

<script>
import dateFilter from '@/plugins/filters/date.filter'

export default {
    name: 'Navbar',
    data: () => ({
        date: null,
    }),
    mounted() {
        setInterval(() => {
            this.date = dateFilter(new Date(), 'datetime')
        }, 1000)
    },
    methods: {
        logout() {
            this.$auth.logout()
        },
    },
}
</script>

<style></style>
