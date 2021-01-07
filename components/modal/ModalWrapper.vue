<template>
    <div class="">
        <h1 class="flex-center-align fz28">Добавить</h1>
        <form>
            <m-input
                v-model="formdata.company"
                label="Наименоввние"
                :error="invalid"
                :info="formdata.company"
                :class="{
                    invalid:
                        ($v.formdata.company.$dirty &&
                            !$v.formdata.company.required) ||
                        ($v.formdata.company.$dirty &&
                            !$v.formdata.company.email),
                }"
            />
            <m-input
                v-model="formdata.address"
                label="Адрес"
                :class="{
                    invalid:
                        ($v.formdata.company.$dirty &&
                            !$v.formdata.company.required) ||
                        ($v.formdata.company.$dirty &&
                            !$v.formdata.company.email),
                }"
            />
            <m-input
                v-model="formdata.type"
                label="Тип"
                :class="{
                    invalid:
                        ($v.formdata.company.$dirty &&
                            !$v.formdata.company.required) ||
                        ($v.formdata.company.$dirty &&
                            !$v.formdata.company.email),
                }"
            />
            <m-input
                v-model="formdata.description"
                label="Описание"
                :class="{
                    invalid:
                        ($v.formdata.company.$dirty &&
                            !$v.formdata.company.required) ||
                        ($v.formdata.company.$dirty &&
                            !$v.formdata.company.email),
                }"
            />
        </form>
        <div class="flex">
            <m-btn
                :disabled="loading"
                title="Добавить"
                class="bg-red"
                @click="userLogin"
            />
            <m-btn
                :disabled="loading"
                title="Создать пользователя"
                @click="userCreate"
            />
        </div>
    </div>
</template>

<script>
import { email, required, minLength } from 'vuelidate/lib/validators'
import MInput from '@/components/form/m-input'
import MBtn from '~/components/button/m-btn'

export default {
    name: 'ModalWrapper',
    components: { MInput, MBtn },
    props: {
        invalid: {
            type: Boolean,
            default: false,
        },
    },
    validations: {
        formdata: {
            company: { email, required },
            address: { required, minLength: minLength(10) },
            type: { required, minLength: minLength(10) },
            description: { required, minLength: minLength(10) },
        },
    },
    data: () => ({
        formdata: {
            company: '',
            address: '',
            type: '',
            description: '',
        },
        error: null,
        loading: false,
    }),
}
</script>

<style scoped></style>
