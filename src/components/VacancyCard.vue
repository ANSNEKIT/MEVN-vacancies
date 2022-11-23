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
                    <b-link to="/"
                        ><b-img
                            :src="userProfileImg"
                            :alt="'Логотип компании ' + company.name"
                            width="60"
                            height="60"
                            blank-color="blue"
                            rounded="circle"
                            class="vacancy-card__icon"
                        >
                        </b-img
                    ></b-link>
                    <div class="vacancy-card__info">
                        <div class="vacancy-card__company">
                            <h3 class="vacancy-card__company-title">
                                <b-link :to="'/companies/' + company.prefix">{{
                                    company.name
                                }}</b-link>
                            </h3>
                        </div>
                        <h2 class="vacancy-card__title">
                            <b-link :to="'/vacancies/' + id" class="vacancy-card__title-link">{{
                                vacancy.name
                            }}</b-link>
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
            @submit-form="$emit('editCard', id, $event)"
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
import type { IBVacancy } from '@/entities/vacancy'
import { computed, ref, toRefs, type PropType } from 'vue'
import ModalVacancyForm from '@/components/ModalVacancyForm.vue'
import { useEnums } from '@/common/enums'

const props = defineProps({
    id: {
        type: String,
        required: true,
    },
    vacancy: {
        type: Object as PropType<IBVacancy>,
        default: () => ({}),
    },
})

defineEmits(['removeCard', 'editCard'])

const { cityOptions, employmentTypeOptions, getItemName } = useEnums()

const { company, cardImg } = toRefs(props.vacancy)

const showRemoveModal = ref(false)
const showModalEdit = ref(false)

const userProfileImg = computed(() => `https://source.unsplash.com/random/60x60?sig=${props.id}`)
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
    const date = new Date(props.vacancy.dateTimeEnd)

    let dd: number | string = date.getDate()
    if (dd < 10) dd = '0' + dd

    let mm: number | string = date.getMonth()
    if (mm < 10) mm = '0' + mm

    const yyyy = date.getFullYear()

    let hours: number | string = date.getHours()
    if (hours < 10) hours = '0' + hours

    let minutes: number | string = date.getMinutes()
    if (minutes < 10) minutes = '0' + minutes

    return `${dd}-${mm}-${yyyy} ${hours}:${minutes}`
})
const createdAt = computed(() => {
    const date = new Date(props.vacancy.createdAt)

    return date.toLocaleDateString('ru', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    })
})
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

    &__icon {
        border-radius: 1000px;
        margin-right: 20px;
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
