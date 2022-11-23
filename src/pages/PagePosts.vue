<template>
    <main class="page-posts">
        <b-container>
            <section class="page-posts__filter mb-5">
                <b-row class="justify-content-center row mx-4 my-5">
                    <b-col sm="8">
                        <b-form-input size="lg" class="mr-sm-2" placeholder="Поиск"></b-form-input>
                    </b-col>
                    <b-col sm="4">
                        <b-form-select
                            v-model="selectedSort"
                            :options="sortOptions"
                            size="lg"
                        ></b-form-select>
                    </b-col>
                </b-row>
            </section>
        </b-container>

        <b-container>
            <div class="mb-4 d-flex justify-content-end">
                <b-button pill variant="primary" size="lg" @click="showModalEdit = true"
                    >Создать</b-button
                >
            </div>
            <ModalVacancyForm v-model:isShow="showModalEdit" @submitForm="onCreate" />
        </b-container>

        <b-container>
            <VacancyCard
                :id="vacancy._id"
                :vacancy="vacancy"
                class="mb-5"
                @edit-card="onEditCard"
                @remove-card="onRemovedCard"
            />
        </b-container>

        <b-container>
            <b-pagination
                v-model="currentPage"
                :total-rows="maxPages"
                :per-page="perPage"
                first-number
                size="lg"
                class="mb-5"
            ></b-pagination>
        </b-container>
    </main>
</template>

<script setup lang="ts">
import ModalVacancyForm from '@/components/ModalVacancyForm.vue'
import VacancyCard from '@/components/VacancyCard.vue'
import type { Vacancy } from '@/entities/vacancy'
import { ref } from 'vue'

const vacancy = {
    _id: '123',
    createdAt: new Date(),
    company: {
        name: 'Test company',
        prefix: 'TestCompany',
        src: 'https://source.unsplash.com/random/60x60',
    },
    name: 'Phyton Developer',
    cardImg:
        'https://dummyimage.com/1300x150/499efa/ffffff&text=Text+asdfljk+ljsadfgjsdgsg+dsldkfj+wejtklk',
    city: 'msk',
    employmentType: 'full',
    hasRemote: false,
    minPrice: 10000,
    maxPrice: 15000,
    description: 'asdfsad sadf sadf jasljss',
    dateEnd: '2022-11-25',
    timeEnd: '12:00',
    dateTimeEnd: new Date('2022-11-22T12:00'),
}

const showModalEdit = ref(false)

const onRemovedCard = (id: string) => {
    console.log(id)
}
const onEditCard = (vacancy: Vacancy) => {
    console.log('111', vacancy)
}
const onCreate = (vacancy: Vacancy) => {
    console.log('4444', vacancy)
}

const selectedSort = ref<string>('')
const sortOptions = ref([
    { value: '', text: 'Выберите сортировку' },
    { value: 'asc', text: 'По возрастанию зарплаты' },
    { value: 'desk', text: 'По убыванию зарплаты' },
])

const currentPage = ref(3)
const maxPages = ref(5)
const perPage = ref(1)
</script>

<style lang="scss" scoped>
.page-posts {
    padding-top: 80px;

    &__filter {
        border-radius: 5px;
        border: 1px solid #ccc;
    }
}
.flex-wrap {
    display: flex;
    flex-wrap: nowrap;
}
</style>
