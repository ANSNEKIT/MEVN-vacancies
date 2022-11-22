<template>
    <div>
        <b-card tag="section" class="vacancy-card" :img-src="src" img-alt="Card image" img-top>
            <b-card-body class="vacancy-card__body">
                <div class="vacancy-card__date">
                    <time datetime="2022-11-08T08:23:44+03:00" class="basic-date"
                        >8 ноября 2022
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
                            <li class="vacancy-card__meta-item">{{ vacancy.city }}</li>
                            <li class="vacancy-card__meta-item">{{ vacancy.employmentType }}</li>
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
                        <b-card-text> Публикация доступна до: {{ vacancy.timeEnd }} </b-card-text>

                        <div class="vacancy-card__buttons">
                            <b-button variant="secondary" @click="$emit('editCard', id)"
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
        <ModalVacancyForm v-model="showModalEdit" :vacancy="vacancy" :is-edit="true" />
        <b-modal v-model="showRemoveModal" @ok="$emit('removeCard', id)"
            >Удалить вакансию "{{ vacancy.name }}"</b-modal
        >
    </div>
</template>

<script setup lang="ts">
import type { VacancyFull } from '@/entities/vacancy'
import { computed, ref, type PropType } from 'vue'
import { RouterLink } from 'vue-router'
import ModalVacancyForm from './ModalVacancyForm.vue'

const props = defineProps({
    id: {
        type: String,
        required: true,
    },
    vacancy: {
        type: Object as PropType<VacancyFull>,
        default: () => ({}),
    },
})

defineEmits(['removeCard', 'editCard'])

const showRemoveModal = ref(false)
const showModalEdit = ref(false)

const userProfileImg = computed(() => `https://source.unsplash.com/random/60x60?sig=${props.id}`)

const name = computed(() => props.vacancy.company.name)
const link = computed(() => props.vacancy.company.link)
const src = computed(() => props.vacancy.company.src)

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
