import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { IVacancy, IBVacancy } from '@/entities/vacancy'
import { getVacancies, deleteVacancy, createVacancy, updateVacancy } from '@/service/VacancyService'

export const useVacanciesStore = defineStore('vacancies', () => {
    const vacancies = ref<IBVacancy[]>([])
    const search = ref('')
    const sort = ref<'' | 'asc' | 'desk'>('')
    const isLoading = ref(false)

    const _filteredVacancies = computed(() => {
        if (!search.value && !sort.value) {
            return vacancies.value
        }

        return vacancies.value.filter((vac) => vac.name.toLowerCase().includes(search.value))
    })

    const sortedVacancies = computed(() => {
        if (sort.value === 'asc') {
            return _filteredVacancies.value.sort((v1, v2) => v1.minPrice - v2.minPrice)
        }

        if (sort.value === 'desk') {
            return _filteredVacancies.value.sort((v1, v2) => v2.minPrice - v1.minPrice)
        }

        return _filteredVacancies.value
    })

    const currentPage = ref(1)
    const perPage = ref(3)
    const maxPages = computed(() => _filteredVacancies.value.length)
    const _start = computed(() => (currentPage.value - 1) * perPage.value)
    const _end = computed(() => currentPage.value * perPage.value)

    const paginatedVacancies = computed(() => sortedVacancies.value.slice(_start.value, _end.value))

    function onSearch(value: string) {
        search.value = value.trim().toLowerCase()
    }

    async function fetchVacancies() {
        isLoading.value = true
        vacancies.value = await getVacancies()
        isLoading.value = false
    }

    async function fetchCreateVacancy(vacancy: IVacancy) {
        isLoading.value = true
        const newVac = await createVacancy(vacancy)
        vacancies.value.push(newVac)
        isLoading.value = false
    }

    async function fetchUpdateVacancy(id: string, vacancy: IVacancy) {
        isLoading.value = true
        const vacancyIndex = vacancies.value.findIndex((vacancy) => vacancy._id === id)

        if (vacancyIndex !== -1) {
            const newVac = await updateVacancy(id, vacancy)

            vacancies.value.splice(vacancyIndex, 1, newVac)
        }
        isLoading.value = false
    }

    async function fetchDeleteVacancies(id: string) {
        isLoading.value = true
        const vacancyIndex = vacancies.value.findIndex((vacancy) => vacancy._id === id)

        if (vacancyIndex !== -1) {
            await deleteVacancy(id)

            vacancies.value.splice(vacancyIndex, 1)
        }
        isLoading.value = false
    }

    return {
        search,
        sort,
        paginatedVacancies,
        currentPage,
        perPage,
        maxPages,
        isLoading,
        onSearch,
        fetchVacancies,
        fetchCreateVacancy,
        fetchUpdateVacancy,
        fetchDeleteVacancies,
    }
})
