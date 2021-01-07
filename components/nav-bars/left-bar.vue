<template>
    <div class="left-bar">
        <ul>
            <li class="black m12">Редактор</li>
            <li><nuxt-link to="/client">Новая карточка</nuxt-link></li>
            <li>
                <a>Заметки</a>
            </li>
            <li>
                <a>Посчитать</a>
            </li>
            <li>
                <a>Статистика</a>
            </li>
            <li>
                <a>Просмотреть</a>
            </li>
            <li>
                <nuxt-link v-if="$auth.user.admin" to="/setting">
                    Настройки
                </nuxt-link>
            </li>
        </ul>
        <ul>
            <li v-if="$auth.loggedIn">
                <nuxt-link to="/auth/login">Удалить</nuxt-link>
            </li>
            <li v-else>
                <nuxt-link to="auth/login">Войти</nuxt-link>
            </li>
        </ul>
        <!--<ul>
            <li class="flex-center-align color-white">Список менеджеров</li>
        </ul>-->
    </div>
</template>

<script>
export default {
    methods: {
        logout() {
            this.$auth.logout()
            this.$router.push('/auth/login')
        },
    },
}
</script>

<style></style>
