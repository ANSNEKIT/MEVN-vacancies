export interface Vacancy {
    _id: string
    company: {
        src: string
        name: string
        link: string
    }
    name: string
    cardImg: string
    city: string
    employmentType: string
    hasRemote: boolean
    minPrice: number
    maxPrice: number
    description: string
    dateEnd: string
    timeEnd: string
    dateTimeEnd?: Date
}

export interface VacancyBackend extends Vacancy {
    createdAt: Date
    dateTimeEnd: Date
}
