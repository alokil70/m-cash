<template>
    <div class="m-table card">
        <h1 class="flex-center-align fz28 bg-title">{{ title }}</h1>
        <div class="flex">
            <m-btn title="Добавит" class="mb6 bg-green" @click="addUser" />
            <m-btn title="Добавить" class="mb6" @click="add" />
            <m-btn title="Добавить" class="mb6" />
            <m-btn title="Добавить" class="mb6" />
        </div>

        <div class="m-table__header flex-around">
            <p v-for="col in columnName" :key="col.title">
                {{ col.title }}
            </p>
        </div>

        <div v-for="row in rowData" :key="row.id" class="flex content-table">
            <div class="row-left">
                <div>{{ row.type }}</div>
                <div>{{ row.type }}</div>
                <div>{{ row.type }}</div>
                <div>{{ row.type }}</div>
            </div>
            <div class="row-left">
                <div>{{ row.address }}</div>
                <div>{{ row.address }}</div>
                <div>{{ row.address }}</div>
                <div>{{ row.address }}</div>
            </div>
            <div class="row-left">
                <div>{{ row.company }}</div>
                <div>Создана {{ dateFilter(row.createdAt) }}</div>
            </div>
            <div class="row-left">
                {{ row.description }}
            </div>
            <div class="row-center">Администратор {{ row.admin }}</div>
        </div>
    </div>
</template>

<script>
import MUserCreate from '@/components/form/m-userCreate'
import dateFilter from '~/plugins/filters/date.filter'
import MBtn from '~/components/button/m-btn'
import ModalWrapper from '~/components/modal/ModalWrapper'
import MForm from '~/components/form/m-form'

export default {
    name: 'MTableCompany',
    components: { MBtn },
    props: {
        title: {
            type: String,
            default: 'table',
        },
        columnName: {
            type: Array,
            default: () => {
                return []
            },
        },
        rowData: {
            type: Array,
            default: () => {
                return []
            },
        },
    },
    methods: {
        dateFilter(value) {
            return dateFilter(new Date(value), 'datetime')
        },
        add() {
            this.$modal.show(
                MForm,
                { height: 'auto' },
                { height: 'auto', width: '50%' }
            )
        },
        addUser() {
            this.$modal.show(
                MUserCreate,
                { height: '50%' },
                { height: '50%', width: '50%' }
            )
            /* this.$modal.show('my-first-modal2', MUserCreate) */
        },
    },
}
</script>
