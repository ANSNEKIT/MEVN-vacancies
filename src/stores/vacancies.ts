import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { IVacancy, IBVacancy } from '@/entities/vacancy'
import { getVacancies, deleteVacancy, createVacancy, updateVacancy } from '@/service/VacancyService'

export const useVacanciesStore = defineStore('vacancies', () => {
    const vacancies = ref<IBVacancy[]>([])
    // const getVacancy = computed(
    //     () => (id: string) => vacancies.value.filter((el) => el._id === id)[0],
    // )

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
        vacancies,
        fetchVacancies,
        fetchCreateVacancy,
        fetchUpdateVacancy,
        fetchDeleteVacancies,
    }
})
