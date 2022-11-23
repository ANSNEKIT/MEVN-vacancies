import type { IVacancy, IBVacancy } from '@/entities/vacancy'
import type { AxiosResponse } from 'axios'
import axios from './axios'

const getVacancies = async (): Promise<IBVacancy[]> => {
    try {
        const respData: AxiosResponse<IBVacancy[]> = await axios.get('/vacancies')
        const { data } = respData

        return data
    } catch (error) {
        console.error(error)
        throw new Error('error getVacancies')
    }
}
const getVacancy = async (id: string): Promise<IBVacancy[]> => {
    try {
        const respData: AxiosResponse<IBVacancy[]> = await axios.get(`/vacancies/${id}`)
        const { data } = respData

        return data
    } catch (error) {
        console.error(error)
        throw new Error('error getVacancy')
    }
}
const createVacancy = async (vacancy: IVacancy): Promise<IBVacancy> => {
    try {
        const respData: AxiosResponse<IBVacancy> = await axios.post('/vacancies', vacancy)
        const { data } = respData

        return data
    } catch (error) {
        console.error(error)
        throw new Error('error createVacancy')
    }
}
const updateVacancy = async (id: string, vacancy: IVacancy): Promise<IBVacancy> => {
    try {
        const respData: AxiosResponse<IBVacancy> = await axios.put(`/vacancies/${id}`, vacancy)
        const { data } = respData

        return data
    } catch (error) {
        console.error(error)
        throw new Error('error updateVavancy')
    }
}
const deleteVacancy = async (id: string): Promise<void> => {
    try {
        await axios.delete(`/vacancies/${id}`)
    } catch (error) {
        console.error(error)
        throw new Error('error deleteVavancy')
    }
}

export { getVacancies, getVacancy, createVacancy, updateVacancy, deleteVacancy }
