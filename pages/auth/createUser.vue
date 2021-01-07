<template>
    <div class="center">
        <div class="auth-card">
            <h1 class="header">Добавить</h1>
            <form @submit.prevent="userRegister">
                <!--<div>
                    <label>Username</label>
                    <input v-model="user.name" type="text" />
                </div>
                <div>
                    <label>Email</label>
                    <input v-model="user.email" type="email" />
                </div>
                <div>
                    <label>Password</label>
                    <input v-model="user.password" type="password" />
                </div>
                <div>
                    <label>CompanyName</label>
                    <input v-model="user.company" type="text" />
                </div>
                <div>
                    <label>City</label>
                    <input v-model="user.city" type="text" />
                </div>-->
                <div v-for="item in columnName" :key="item.id">
                    <label>{{ item.title }}</label>
                    <input v-model="item.value" :type="item.type" />
                </div>
                <div>
                    <button class="btn w100" type="submit">Submit</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Register',
    layout: 'empty',
    auth: false,
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
                { id: 3, title: 'Город', type: 'text', value: 'Пятигорск' },
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
                    value: '1980-1-1 00:00:00',
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
        userRegister({ store }) {
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
