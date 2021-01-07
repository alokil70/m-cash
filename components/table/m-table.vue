<template>
    <div class="m-table card">
        <h1 class="flex-center-align fz28 bg-title">{{ title }}</h1>
        <div class="m-table__header flex-around">
            <p v-for="col in columnName" :key="col.title">
                {{ col.title }}
            </p>
        </div>
        <m-table-row v-for="row in rowData" :key="row.id" :row-data="row" />
    </div>
</template>

<script>
import MTableRow from '~/components/table/m-table-row'

export default {
    name: 'MTable',
    components: { MTableRow },
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
}
</script>
