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
                <b-button pill variant="primary" size="lg" @click="showModalCreate = true"
                    >Создать</b-button
                >
            </div>
            <ModalVacancyForm v-model:is-show="showModalCreate" @submitForm="onCreate" />
        </b-container>

        <b-container>
            <VacancyCard
                v-for="vacancy of vacancies"
                :key="vacancy._id"
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
import type { IVacancy } from '@/entities/vacancy'
import { ref, onMounted } from 'vue'
import { useVacanciesStore } from '@/stores/vacancies'
import { storeToRefs } from 'pinia'

const store = useVacanciesStore()

const { vacancies } = storeToRefs(store)

onMounted(async () => {
    await store.fetchVacancies()
})

const showModalCreate = ref(false)

const onRemovedCard = (id: string) => {
    store.fetchDeleteVacancies(id)
    console.log('delete', id)
}
const onEditCard = (id: string, vacancy: IVacancy) => {
    store.fetchUpdateVacancy(id, vacancy)
}
const onCreate = (vacancy: IVacancy) => {
    store.fetchCreateVacancy(vacancy)
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
