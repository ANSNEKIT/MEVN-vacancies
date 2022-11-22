export interface Vacancy {
    company: {
        src: string
        name: string
        link: string
    }
    name: string
    city: string
    employmentType: string
    hasRemote: boolean
    minPrice: number
    maxPrice: number
    description: string
    dateEnd: string
    timeEnd: string
}

export interface VacancyFull extends Vacancy {
    dateTimeEnd: Date
}
