<template>
    <div class="flex-center-align">
        <div class="auth-card">
            <h1 class="header flex-center-align">Добавить</h1>
            <form @submit.prevent="userRegister">
                <div
                    v-for="item in columnName"
                    :key="item.id"
                    class="m6 flex-between"
                >
                    <label>{{ item.title }}</label>
                    <input v-model="item.value" :type="item.type" />
                </div>
                <div>
                    <m-btn
                        class="bg-red"
                        :disabled="loading"
                        title="Сохранить"
                        @click="userRegister"
                        >Сохранить</m-btn
                    >
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import MBtn from '@/components/button/m-btn'
export default {
    name: 'MUserCreate',
    components: { MBtn },
    auth: true,
    data() {
        return {
            user: {
                name: '',
                email: '',
                city: '',
                company: '',
                password: '',
            },
            columnName: [
                {
                    id: 1,
                    title: 'Имя',
                    type: 'text',
                    field: 'name',
                    value: 'Николай Минаев',
                },
                {
                    id: 2,
                    title: 'Логин',
                    type: 'email',
                    field: 'email',
                    value: 'user12345@gmail.com',
                },
                {
                    id: 3,
                    title: 'Город',
                    type: 'text',
                    field: 'city',
                    value: 'Пятигорск',
                },
                {
                    id: 4,
                    title: 'Компания',
                    type: 'text',
                    field: 'company',
                    value: 'ООО Рога и',
                },
                {
                    id: 5,
                    title: 'Лицензия',
                    type: 'text',
                    field: 'expire',
                    value: '2020-12-31 00:00:00',
                },
                {
                    id: 6,
                    title: 'Уровнь доступа',
                    type: 'text',
                    field: 'modules',
                    value: 1,
                },
                {
                    id: 7,
                    title: 'Пароль',
                    type: 'password',
                    field: 'password',
                    value: 'qwertyuiop',
                },
            ],
        }
    },
    methods: {
        userRegister() {
            /* try {
                await this.$axios
                    .post('/auth/register', this.user)
                    .then((e) => {
                        if (e.status === 201) {
                            this.$router.push('/auth/login')
                        } else {
                            console.log(e.statusText)
                        }
                    })
            } catch (err) {
                console.log(err)
            } */
            this.columnName.forEach((i) => {
                this.user[i.field] = i.value
            })
            this.$store.dispatch('users/SET_USER_TO_API', this.user)
        },
    },
}
</script>

<style></style>
