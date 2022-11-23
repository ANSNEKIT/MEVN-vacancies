export interface IVacancy {
    _id: string
    company: {
        src: string
        name: string
        prefix: string
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

export interface IBVacancy extends IVacancy {
    createdAt: Date
    dateTimeEnd: Date
}
