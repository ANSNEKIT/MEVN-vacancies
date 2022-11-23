<template>
    <div>
        <b-card
            tag="section"
            class="vacancy-card"
            :img-src="cardImg"
            img-height="150"
            img-width="1300"
            img-alt="Card image"
            img-top
        >
            <b-card-body class="vacancy-card__body">
                <div class="vacancy-card__date">
                    <time datetime="2022-11-08T08:23:44+03:00" class="basic-date"
                        >{{ createdAt }}
                    </time>
                </div>
                <div class="vacancy-card__flex-wrap">
                    <RouterLink to="/" class="vacancy-card__icon-link"
                        ><b-img
                            :src="userProfileImg"
                            :alt="'Логотип компании ' + name"
                            width="60"
                            height="60"
                            blank-color="blue"
                            rounded="circle"
                            class="vacancy-card__icon"
                        >
                        </b-img
                    ></RouterLink>
                    <div class="vacancy-card__info">
                        <div class="vacancy-card__company">
                            <h3 class="vacancy-card__company-title">
                                <RouterLink :to="'/companies/' + link">Иннотех</RouterLink>
                            </h3>
                        </div>
                        <h2 class="vacancy-card__title">
                            <RouterLink :to="'/vacancies/' + id" class="vacancy-card__title-link">{{
                                vacancy.name
                            }}</RouterLink>
                        </h2>
                        <ul class="vacancy-card__meta">
                            <li v-if="vacancy.city" class="vacancy-card__meta-item">
                                {{ getItemName(vacancy.city, cityOptions) }}
                            </li>
                            <li class="vacancy-card__meta-item">
                                {{ getItemName(vacancy.employmentType, employmentTypeOptions) }}
                            </li>
                            <li v-if="vacancy.hasRemote" class="vacancy-card__meta-item">
                                Доступна удаленка
                            </li>
                        </ul>
                        <div v-if="price" class="vacancy-card__salary">
                            <div class="basic-salary">{{ price }}</div>
                        </div>
                        <b-card-text>
                            {{ vacancy.description }}
                        </b-card-text>
                        <b-card-text> Публикация доступна до: {{ dateTimeEnd }} </b-card-text>

                        <div class="vacancy-card__buttons">
                            <b-button variant="secondary" @click="showModalEdit = !showModalEdit"
                                >Редактировать</b-button
                            >
                            <b-button variant="danger" @click="showRemoveModal = !showRemoveModal"
                                >Удалить</b-button
                            >
                        </div>
                    </div>
                </div>
            </b-card-body>
        </b-card>
        <ModalVacancyForm
            v-model:is-show="showModalEdit"
            :vacancy="vacancy"
            :is-edit="true"
            @submit-form="$emit('editCard', $event)"
        />
        <b-modal
            v-model="showRemoveModal"
            cancel-title="Отмена"
            ok-title="Удалить"
            @ok="$emit('removeCard', id)"
            >Удалить вакансию "{{ vacancy.name }}"</b-modal
        >
    </div>
</template>

<script setup lang="ts">
import type { VacancyBackend } from '@/entities/vacancy'
import { computed, ref, type PropType } from 'vue'
import { RouterLink } from 'vue-router'
import ModalVacancyForm from '@/components/ModalVacancyForm.vue'
import { useEnums } from '@/common/enums'

const props = defineProps({
    id: {
        type: String,
        required: true,
    },
    vacancy: {
        type: Object as PropType<VacancyBackend>,
        default: () => ({}),
    },
})

defineEmits(['removeCard', 'editCard'])

const { cityOptions, employmentTypeOptions, getItemName } = useEnums()

const showRemoveModal = ref(false)
const showModalEdit = ref(false)

const userProfileImg = computed(() => `https://source.unsplash.com/random/60x60?sig=${props.id}`)
const name = computed(() => props.vacancy.company.name)
const link = computed(() => props.vacancy.company.link)
const cardImg = computed(() => props.vacancy.cardImg)
const price = computed(() => {
    const { minPrice, maxPrice } = props.vacancy
    if (minPrice && maxPrice) {
        return `от ${minPrice.toLocaleString('ru')} до ${maxPrice.toLocaleString('ru')} руб`
    }

    if (minPrice && !maxPrice) {
        return `от ${minPrice.toLocaleString('ru')} руб`
    }

    if (!minPrice && maxPrice) {
        return `до ${maxPrice.toLocaleString('ru')} руб`
    }

    return ''
})
const dateTimeEnd = computed(() => {
    let dd: number | string = props.vacancy.dateTimeEnd.getDate()
    if (dd < 10) dd = '0' + dd

    let mm: number | string = props.vacancy.dateTimeEnd.getMonth()
    if (mm < 10) mm = '0' + mm

    const yyyy = props.vacancy.dateTimeEnd.getFullYear()

    let hours: number | string = props.vacancy.dateTimeEnd.getHours()
    if (hours < 10) hours = '0' + hours

    let minutes: number | string = props.vacancy.dateTimeEnd.getMinutes()
    if (minutes < 10) minutes = '0' + minutes

    return `${dd}-${mm}-${yyyy} ${hours}:${minutes}`
})
const createdAt = computed(() => props.vacancy.createdAt)
</script>

<style lang="scss" scoped>
.vacancy-card {
    &__body {
        padding-top: 25px;
        padding-bottom: 20px;
    }

    &__flex-wrap {
        display: flex;
    }

    &__date {
        float: right;
    }

    &__icon-link {
        margin-right: 20px;
    }

    &__icon {
        border-radius: 1000px;
    }

    &__title {
        font-size: 20px;
    }

    &__info {
        display: flex;
        flex-direction: column;
        width: 100%;

        font-size: 16px;
        line-height: 1.5;
        color: #444;
    }

    &__company-title {
        font-size: 16px;
    }

    &__meta {
        display: flex;
        flex-wrap: wrap;
        font-size: 16px;

        padding: 0;
        margin-bottom: 4px;

        &-item {
            list-style: none;
            white-space: nowrap;

            &::after {
                display: inline-block;
                content: '•';
                padding: 0 5px;
            }

            &:last-child {
                &::after {
                    display: none;
                }
            }
        }
    }

    &__salary {
        font-size: 20px;
        font-weight: 800;
        color: #56b76b;

        margin-bottom: 20px;
    }

    &__buttons {
        display: flex;
        gap: 10px;
    }
}
</style>
