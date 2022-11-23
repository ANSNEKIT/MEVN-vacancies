import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { IVacancy, IBVacancy } from '@/entities/vacancy'
import { getVacancies, deleteVacancy, createVacancy, updateVacancy } from '@/service/VacancyService'

export const useVacanciesStore = defineStore('vacancies', () => {
    const vacancies = ref<IBVacancy[]>([])
    const search = ref('')
    const sort = ref<'' | 'asc' | 'desk'>('')

    const filteredVacancies = computed(() => {
        let filtered = []

        if (!search.value && !sort.value) {
            return vacancies.value
        }

        filtered = vacancies.value.filter((vac) => vac.name.toLowerCase().includes(search.value))

        if (sort.value === 'asc') {
            filtered.sort((v1, v2) => v1.minPrice - v2.minPrice)
        }

        if (sort.value === 'desk') {
            filtered.sort((v1, v2) => v2.minPrice - v1.minPrice)
        }

        return filtered
    })

    const currentPage = ref(1)
    const perPage = ref(3)
    const maxPages = computed(() => filteredVacancies.value.length)
    const _start = computed(() => (currentPage.value - 1) * perPage.value)
    const _end = computed(() => currentPage.value * perPage.value)

    const paginatedVacancies = computed(() =>
        filteredVacancies.value.slice(_start.value, _end.value),
    )

    function onSearch(value: string) {
        search.value = value.trim().toLowerCase()
    }

    async function fetchVacancies() {
        vacancies.value = await getVacancies()
    }

    async function fetchCreateVacancy(vacancy: IVacancy) {
        const newVac = await createVacancy(vacancy)
        vacancies.value.push(newVac)
    }

    async function fetchUpdateVacancy(id: string, vacancy: IVacancy) {
        const vacancyIndex = vacancies.value.findIndex((vacancy) => vacancy._id === id)

        if (vacancyIndex !== -1) {
            const newVac = await updateVacancy(id, vacancy)

            vacancies.value.splice(vacancyIndex, 1, newVac)
        }
    }

    async function fetchDeleteVacancies(id: string) {
        const vacancyIndex = vacancies.value.findIndex((vacancy) => vacancy._id === id)

        if (vacancyIndex !== -1) {
            await deleteVacancy(id)

            vacancies.value.splice(vacancyIndex, 1)
        }
    }

    return {
        search,
        sort,
        filteredVacancies,
        paginatedVacancies,
        currentPage,
        perPage,
        maxPages,
        onSearch,
        fetchVacancies,
        fetchCreateVacancy,
        fetchUpdateVacancy,
        fetchDeleteVacancies,
    }
})
