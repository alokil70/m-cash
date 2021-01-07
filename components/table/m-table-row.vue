<template>
    <div class="content-table">
        <nuxt-link
            :to="{ name: 'manager-id', params: { id: rowData.id } }"
            class="flex"
        >
            <div class="row-left">
                <div>{{ rowData.email }}</div>
                <div>{{ rowData.email }}</div>
                <div>{{ rowData.email }}</div>
                <div>{{ rowData.email }}</div>
            </div>
            <div class="row-left">
                <div>{{ rowData.city }}</div>
                <div>{{ rowData.city }}</div>
                <div>{{ rowData.city }}</div>
                <div>{{ rowData.city }}</div>
            </div>
            <div class="row-left">
                <div>{{ rowData.company }}</div>
                <div>Создана {{ dateFilter(rowData.createdAt) }}</div>
            </div>
            <div class="row-left">
                Действительна до {{ dateFilter(rowData.expire) }}
            </div>
            <div class="row-center">{{ isAdmin }}</div>
        </nuxt-link>
    </div>
</template>

<script>
import dateFilter from '~/plugins/filters/date.filter'

export default {
    name: 'MTableRow',
    props: {
        rowData: {
            type: Object,
            default: () => {
                return {}
            },
        },
    },
    computed: {
        isAdmin() {
            if (this.rowData.admin) {
                return 'Администратор'
            } else {
                return 'Пользователь'
            }
        },
    },
    methods: {
        dateFilter(value) {
            return dateFilter(new Date(value), 'datetime')
        },
    },
}
</script>
