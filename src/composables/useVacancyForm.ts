import type { IBVacancy } from '@/entities/vacancy'
import { computed, markRaw, ref } from 'vue'
import { setLocale, object, string, number, boolean } from 'yup'

export function useVacancyForm() {
    const randomSix = mathRandom(100000)

    const vacancyLocal = ref({
        company: {
            src: `https://source.unsplash.com/random/60x60?sig=${randomSix}`,
            name: '',
            prefix: '',
        },
        name: '',
        cardImg: 'https://dummyimage.com/1300x150/499efa/ffffff&text=Название+вакансии',
        city: '',
        employmentType: '',
        hasRemote: false,
        minPrice: 0,
        maxPrice: 0,
        description: '',
        dateEnd: dateTommorow(),
        timeEnd: '00:00',
    })

    const dateTimeEnd = computed(() => {
        const date = `${vacancyLocal.value.dateEnd}T${vacancyLocal.value.timeEnd}`

        return new Date(date)
    })

    setLocale({
        mixed: {
            default: 'Поле заполнено некорректно',
            notType: 'Неверный формат',
        },
    })

    const schemaVacancy = markRaw(
        object({
            _id: string(),
            company: object({
                name: string()
                    .required('Обязательное поле')
                    .trim()
                    .max(40, 'Максимально допустимое значение ${max}'),
                prefix: string()
                    .required('Обязательное поле')
                    .trim()
                    .max(20, 'Максимально допустимое значение ${max}'),
                src: string().trim().url('Неверный url. Ссылка должна начинаться с http(s)://'),
            }),
            name: string()
                .required('Обязательное поле')
                .trim()
                .max(50, 'Максимально допустимое значение ${max}'),
            cardImg: string().trim().url('Неверный url. Ссылка должна начинаться с http(s)://'),
            city: string(),
            employmentType: string().required('Обязательное поле'),
            hasRemote: boolean(),
            minPrice: number()
                .min(0, 'Минимально допустимое значение ${min}')
                .max(1_000_000, 'Максимально допустимое значение ${max}'),
            maxPrice: number()
                .min(0, 'Минимально допустимое значение ${min}')
                .max(1_000_000, 'Максимально допустимое значение ${max}'),
            description: string()
                .required('Обязательное поле')
                .trim()
                .max(500, 'Максимально допустимое значение ${max}'),
            dateEnd: string().default(() => dateTommorow()),
            timeEnd: string().required('Обязательное поле'),
        }),
    )

    function mathRandom(max: number) {
        return Math.floor(Math.random() * max)
    }

    function dateTommorow(): string {
        const date = new Date()
        let dd: number | string = date.getDate() + 1
        if (dd < 10) dd = '0' + dd

        let mm: number | string = date.getMonth() + 1
        if (mm < 10) mm = '0' + mm

        const yyyy: number | string = date.getFullYear()

        return `${yyyy}-${mm}-${dd}`
    }

    function dateToday(str: string): string {
        return str
            .split('-')
            .map((el, i) => (i === 2 ? String(Number(el) - 1) : el))
            .join('-')
    }

    const getClearForm = () => ({
        company: {
            src: `https://source.unsplash.com/random/60x60?sig=${randomSix}`,
            name: '',
            prefix: '',
        },
        name: '',
        cardImg: 'https://dummyimage.com/1300x150/499efa/ffffff&text=Название+вакансии',
        city: '',
        employmentType: '',
        hasRemote: false,
        minPrice: 0,
        maxPrice: 0,
        description: '',
        dateEnd: dateTommorow(),
        timeEnd: '00:00',
    })

    const clearForm = () => {
        vacancyLocal.value = getClearForm()
    }

    const editForm = (val: IBVacancy) => {
        vacancyLocal.value = val
    }

    return {
        vacancyLocal,
        dateTimeEnd,
        schemaVacancy,
        dateTommorow,
        dateToday,
        editForm,
        clearForm,
    }
}
