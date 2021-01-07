<template>
    <div>
        <div
            class="form-group"
            :class="{ 'form-group--error': $v.name.$error }"
        >
            <label class="form__label">Name</label>
            <input
                v-model.trim="name"
                class="form__input"
                @input="setName($event.target.value)"
            />
        </div>
        <div v-if="!$v.name.required" class="error">Field is required</div>
        <div v-if="!$v.name.minLength" class="error">
            Name must have at least {{ $v.name.$params.minLength.min }} letters.
        </div>
        <span tabindex="0">Blur to see changes</span>
    </div>
</template>

<script>
import { required, minLength, between } from 'vuelidate/lib/validators'

export default {
    name: 'Index',
    layout: 'empty',
    auth: true,
    data() {
        return {
            name: '',
            age: 0,
        }
    },

    validations: {
        name: {
            required,
            minLength: minLength(4),
        },
        age: {
            between: between(20, 30),
        },
    },

    methods: {
        setName(value) {
            this.name = value
            this.$v.name.$touch()
        },
        setAge(value) {
            this.age = value
            this.$v.age.$touch()
        },
    },
}
</script>

<style scoped></style>
