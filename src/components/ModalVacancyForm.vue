<template>
    <b-modal
        id="modal-vacancy-form"
        :model-value="isShow"
        :title="modalTitle"
        size="lg"
        cancel-title="Отмена"
        hide-footer
        @show="resetModal"
        @hidden="resetModal"
        @update:model-value="$emit('update:isShow', !props.isShow)"
    >
        <Form
            :initial-values="vacancyLocal"
            :validation-schema="schemaVacancy"
            @submit="handleSubmit"
        >
            <Field
                name="company.name"
                v-model="vacancyLocal.company.name"
                v-slot="{ value, handleChange, errorMessage }"
            >
                <b-form-group
                    label-cols="5"
                    label="Название компании"
                    :invalid-feedback="errorMessage"
                >
                    <b-form-input
                        type="text"
                        :model-value="value"
                        :lazy="true"
                        placeholder="ООО Веселая компания"
                        maxLength="40"
                        required
                        @update:modelValue="handleChange"
                    >
                    </b-form-input>
                </b-form-group>
            </Field>

            <Field
                name="company.src"
                v-model="vacancyLocal.company.src"
                v-slot="{ value, handleChange, errorMessage }"
            >
                <b-form-group
                    label-cols="5"
                    label="Ссылка на лого компании"
                    :invalid-feedback="errorMessage"
                >
                    <b-form-input
                        type="text"
                        :model-value="value"
                        :lazy="true"
                        placeholder="my-company"
                        maxLength="10"
                        required
                        @update:modelValue="handleChange"
                    >
                    </b-form-input>
                </b-form-group>
            </Field>

            <Field
                name="company.prefix"
                v-model="vacancyLocal.company.prefix"
                v-slot="{ value, handleChange, errorMessage }"
            >
                <b-form-group
                    label-cols="5"
                    label="Префикс для ссылки на компанию"
                    :invalid-feedback="errorMessage"
                >
                    <b-form-input
                        type="url"
                        :model-value="value"
                        :lazy="true"
                        placeholder="https://link.li/smile-logo.png"
                        required
                        @update:modelValue="handleChange"
                    >
                    </b-form-input>
                </b-form-group>
            </Field>

            <Field
                name="name"
                v-model="vacancyLocal.name"
                v-slot="{ value, handleChange, errorMessage }"
            >
                <b-form-group
                    label-cols="5"
                    label="Название вакансии"
                    :invalid-feedback="errorMessage"
                >
                    <b-form-input
                        type="text"
                        :model-value="value"
                        :lazy="true"
                        maxLength="50"
                        placeholder="Название вакансии"
                        required
                        @update:modelValue="handleChange"
                    ></b-form-input>
                </b-form-group>
            </Field>

            <Field
                name="cardImg"
                v-model="vacancyLocal.cardImg"
                v-slot="{ value, handleChange, errorMessage }"
            >
                <b-form-group label-cols="5" label="Фото карточки" :invalid-feedback="errorMessage">
                    <b-form-input
                        type="url"
                        :model-value="value"
                        :lazy="true"
                        placeholder="https://dummyimage.com/1300x150/499efa/ffffff&text=Название+вакансии"
                        required
                        @update:modelValue="handleChange"
                    >
                    </b-form-input>
                </b-form-group>
            </Field>

            <Field
                name="city"
                v-model="vacancyLocal.city"
                v-slot="{ value, handleChange, errorMessage }"
            >
                <b-form-group label-cols="5" label="Город" :invalid-feedback="errorMessage">
                    <b-form-select
                        :model-value="value"
                        :options="cityOptions"
                        @update:modelValue="handleChange"
                    >
                    </b-form-select>
                </b-form-group>
            </Field>

            <Field
                name="employmentType"
                v-model="vacancyLocal.employmentType"
                v-slot="{ value, handleChange, errorMessage }"
            >
                <b-form-group label-cols="5" label="Тип занятости" :invalid-feedback="errorMessage">
                    <b-form-select
                        :model-value="value"
                        :options="employmentTypeOptions"
                        @update:modelValue="handleChange"
                    ></b-form-select>
                </b-form-group>
            </Field>

            <Field
                name="hasRemote"
                v-model="vacancyLocal.hasRemote"
                v-slot="{ value, handleChange, errorMessage }"
            >
                <b-form-group class="mb-3" :invalid-feedback="errorMessage">
                    <b-form-checkbox
                        id="has-remote"
                        :model-value="value"
                        value="true"
                        name="has-remote"
                        unchecked-value="false"
                        @update:modelValue="handleChange"
                    >
                        Возможна удаленка
                    </b-form-checkbox>
                </b-form-group>
            </Field>

            <Field
                name="minPrice"
                v-model="vacancyLocal.minPrice"
                v-slot="{ value, handleChange, errorMessage }"
            >
                <b-form-group
                    label-cols="5"
                    label="Минимальная вилка зп"
                    :invalid-feedback="errorMessage"
                >
                    <b-form-input
                        type="number"
                        :model-value="value"
                        :lazy="true"
                        maxLength="6"
                        min="0"
                        max="1000000"
                        @update:modelValue="handleChange"
                    ></b-form-input>
                </b-form-group>
            </Field>

            <Field
                name="maxPrice"
                v-model="vacancyLocal.maxPrice"
                v-slot="{ value, handleChange, errorMessage }"
            >
                <b-form-group
                    label-cols="5"
                    label="Максимальная вилка зп"
                    :invalid-feedback="errorMessage"
                >
                    <b-form-input
                        type="number"
                        :model-value="value"
                        :lazy="true"
                        maxLength="6"
                        min="0"
                        max="1000000"
                        @update:modelValue="handleChange"
                    ></b-form-input>
                </b-form-group>
            </Field>

            <Field
                name="dateEnd"
                v-model="vacancyLocal.dateEnd"
                v-slot="{ value, handleChange, errorMessage }"
            >
                <b-form-group
                    label-cols="5"
                    label="Дата окончания вакансии"
                    :invalid-feedback="errorMessage"
                >
                    <b-form-input
                        :model-value="value"
                        type="date"
                        :min="dateToday(dateTommorow())"
                        @update:modelValue="handleChange"
                    ></b-form-input>
                </b-form-group>
            </Field>

            <Field
                name="timeEnd"
                v-model="vacancyLocal.timeEnd"
                v-slot="{ value, handleChange, errorMessage }"
            >
                <b-form-group
                    label-cols="5"
                    label="Время окончания вакансии"
                    :invalid-feedback="errorMessage"
                >
                    <b-form-input
                        :model-value="value"
                        type="time"
                        min="00:00"
                        @update:modelValue="handleChange"
                    ></b-form-input>
                </b-form-group>
            </Field>

            <Field
                name="description"
                v-model="vacancyLocal.description"
                v-slot="{ value, handleChange, errorMessage }"
            >
                <b-form-group :invalid-feedback="errorMessage">
                    <b-form-textarea
                        id="description"
                        :model-value="value"
                        placeholder="Описание вакансии"
                        :lazy="true"
                        rows="3"
                        max-rows="6"
                        no-resize
                        @update:model-value="handleChange"
                    ></b-form-textarea>
                </b-form-group>
            </Field>

            <div class="mt-3 d-flex gap-3">
                <b-button variant="outline-secondary" @click="onCancel">Отмена</b-button>
                <b-button type="submit" variant="primary">{{
                    isEdit ? 'Сохранить' : 'Создать'
                }}</b-button>
            </div>
        </Form>
    </b-modal>
</template>

<script setup lang="ts">
import type { Vacancy, VacancyBackend } from '@/entities/vacancy'
import { BFormInput } from 'bootstrap-vue-3'
import { computed, onMounted, type PropType } from 'vue'
import { Form, Field } from 'vee-validate'
import { useEnums } from '@/common/enums'
import { useVacancyForm } from '@/composables/vacancyForm'

const props = defineProps({
    vacancy: {
        type: Object as PropType<VacancyBackend>,
        default: () => ({}),
    },
    isEdit: {
        type: Boolean,
        default: false,
    },
    isShow: {
        type: Boolean,
        default: false,
    },
})

const emits = defineEmits(['update:isShow', 'submitForm'])

const { cityOptions, employmentTypeOptions } = useEnums()
const { vacancyLocal, dateTimeEnd, schemaVacancy, dateTommorow, dateToday, clearForm } =
    useVacancyForm()

onMounted(() => {
    if (props.isEdit) {
        vacancyLocal.value = props.vacancy
    }
})

const modalTitle = computed(() => {
    if (props.isEdit) {
        return `Редактировать вакансию "${props.vacancy.name}"`
    }

    return 'Создать вакансию'
})

const resetModal = () => {
    if (props.isEdit) {
        vacancyLocal.value = props.vacancy
    } else {
        vacancyLocal.value = clearForm()
    }
}

const onCancel = () => {
    emits('update:isShow', false)
}

const handleSubmit = (values: object) => {
    const newShema = schemaVacancy.cast(values)

    const formValues = {
        ...(newShema as Vacancy),
        dateTimeEnd: dateTimeEnd.value,
    }

    emits('submitForm', formValues)
    emits('update:isShow', false)
}
</script>

<style scoped></style>
