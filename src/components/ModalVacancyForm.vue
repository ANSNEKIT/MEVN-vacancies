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
                    label="Префикс для ссылки на компанию"
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
                name="company.link"
                v-model="vacancyLocal.company.link"
                v-slot="{ value, handleChange, errorMessage }"
            >
                <b-form-group
                    label-cols="5"
                    label="Ссылка на лого компании"
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
                        required
                        @update:modelValue="handleChange"
                    ></b-form-input>
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
import type { Vacancy, VacancyFull } from '@/entities/vacancy'
import { BFormInput } from 'bootstrap-vue-3'
import { computed, markRaw, onMounted, ref, type PropType } from 'vue'
import { setLocale, object, string, number, boolean } from 'yup'
import { Form, Field } from 'vee-validate'

const props = defineProps({
    vacancy: {
        type: Object as PropType<Vacancy>,
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

setLocale({
    mixed: {
        default: 'Поле заполнено некорректно',
        notType: 'Неверный формат',
    },
})

const dateTommorow = () => {
    const date = new Date()
    let dd: number | string = date.getDate() + 1
    if (dd < 10) dd = '0' + dd

    let mm: number | string = date.getMonth() + 1
    if (mm < 10) mm = '0' + mm

    let yyyy: number | string = date.getFullYear()

    return `${yyyy}-${mm}-${dd}`
}

const schemaVacancy = markRaw(
    object({
        company: object({
            name: string().required('Обязательное поле').trim().max(40),
            src: string().required('Обязательное поле').trim().max(20),
            link: string().trim().url('Неверный url. Ссылка должна начинаться с http(s)://'),
        }),
        name: string().required('Обязательное поле').trim().max(50),
        city: string(),
        employmentType: string().required('Обязательное поле'),
        hasRemote: boolean(),
        minPrice: number()
            .min(0, 'Минимально допустимое значение ${min}')
            .max(1_000_000, 'Максимально допустимое значение ${max}'),
        maxPrice: number()
            .min(0, 'Минимально допустимое значение ${min}')
            .max(1_000_000, 'Максимально допустимое значение ${max}'),
        description: string().required('Обязательное поле').trim().max(500),
        dateEnd: string().default(() => dateTommorow()),
        timeEnd: string().required('Обязательное поле'),
    }),
)

const dateToday = (str: string) => {
    return str
        .split('-')
        .map((el, i) => (i === 2 ? String(Number(el) - 1) : el))
        .join('-')
}

const vacancyLocal = ref({
    company: {
        name: '',
        src: '',
        link: 'https://source.unsplash.com/random/60x60',
    },
    name: '',
    city: '',
    employmentType: '',
    hasRemote: false,
    minPrice: 0,
    maxPrice: 0,
    description: '',
    dateEnd: dateTommorow(),
    timeEnd: '00:00',
})

const dateTimeEnd = computed(() => {
    const date = `${vacancyLocal.value.dateEnd}T${vacancyLocal.value.timeEnd}`

    return new Date(date)
})

const cityOptions = [
    { value: '', text: 'Выберите город' },
    { value: 'Moscow', text: 'Москва' },
    { value: 'Spb', text: 'Санкт-Петербург' },
    { value: 'Ekb', text: 'Екатеринбург' },
    { value: 'Nyagan', text: 'Нягань' },
]
const employmentTypeOptions = [
    { value: '', text: 'Выберите тип' },
    { value: 'full', text: 'Полный день' },
    { value: 'part', text: 'Неполный день' },
    { value: 'every-day', text: 'Круглосуточно (раб на галерах)' },
    { value: 'hour-in-month', text: 'Час в месяц' },
]

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

const clearForm = () => ({
    company: {
        src: '',
        name: '',
        link: 'https://source.unsplash.com/random/60x60',
    },
    name: '',
    city: '',
    employmentType: '',
    hasRemote: false,
    minPrice: 0,
    maxPrice: 0,
    description: '',
    dateEnd: dateTommorow(),
    timeEnd: '00:00',
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

    const formValues: VacancyFull = {
        ...(newShema as Vacancy),
        dateTimeEnd: dateTimeEnd.value,
    }

    emits('submitForm', formValues)
    emits('update:isShow', false)
}
</script>

<style scoped></style>
