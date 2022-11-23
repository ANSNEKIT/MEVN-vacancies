<template>
    <main class="page-posts h-100">
        <b-container>
            <div class="page-posts__content-wrap d-flex flex-column">
                <section class="page-posts__filter mb-5">
                    <b-row class="justify-content-center row mx-4 my-5">
                        <b-col sm="8">
                            <b-form-input
                                :model-value="search"
                                size="lg"
                                class="mr-sm-2"
                                placeholder="Поиск"
                                max-length="50"
                                @input="debouncedSearch"
                                @keydown.enter="store.onSearch"
                            ></b-form-input>
                        </b-col>
                        <b-col sm="4">
                            <b-form-select
                                v-model="sort"
                                :options="sortOptions"
                                size="lg"
                            ></b-form-select>
                        </b-col>
                    </b-row>
                </section>

                <div>
                    <div class="mb-4 d-flex justify-content-end">
                        <b-button pill variant="primary" size="lg" @click="showModalCreate = true"
                            >Создать</b-button
                        >

                        <ModalVacancyForm
                            v-model:is-show="showModalCreate"
                            @submitForm="onCreate"
                        />
                    </div>
                </div>

                <div class="flex-grow-1">
                    <h2 v-if="!filteredVacancies.length" class="mb-5">Вакансии не найдены</h2>
                    <VacancyCard
                        v-else
                        v-for="vacancy of filteredVacancies"
                        :key="vacancy._id"
                        :id="vacancy._id"
                        :vacancy="vacancy"
                        class="mb-5"
                        @edit-card="onEditCard"
                        @remove-card="onRemovedCard"
                    />
                </div>

                <b-pagination
                    v-model="currentPage"
                    :total-rows="maxPages"
                    :per-page="perPage"
                    first-number
                    size="lg"
                    class="mb-5"
                ></b-pagination>
            </div>
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
import { useEnums } from '@/common/enums'
import { debounce } from '@/composables/debounce'

const store = useVacanciesStore()

const { filteredVacancies, search, sort } = storeToRefs(store)

const { sortOptions } = useEnums()

onMounted(async () => {
    await store.fetchVacancies()
})

const showModalCreate = ref(false)

const debouncedSearch = debounce(store.onSearch, 500)

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

    &__content-wrap {
        min-height: calc(100vh - 80px);
    }
}
.flex-wrap {
    display: flex;
    flex-wrap: nowrap;
}
</style>
