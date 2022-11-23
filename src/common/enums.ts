export function useEnums() {
    const cityOptions = [
        { value: '', text: 'Выберите город' },
        { value: 'msk', text: 'Москва' },
        { value: 'spb', text: 'Санкт-Петербург' },
        { value: 'ekb', text: 'Екатеринбург' },
        { value: 'nyagan', text: 'Нягань' },
    ]
    const employmentTypeOptions = [
        { value: '', text: 'Выберите тип' },
        { value: 'full', text: 'Полный день' },
        { value: 'part', text: 'Неполный день' },
        { value: 'every-day', text: 'Круглосуточно (раб на галерах)' },
        { value: 'hour-in-month', text: 'Час в месяц' },
    ]
    const sortOptions = [
        { value: '', text: 'Выберите сортировку' },
        { value: 'asc', text: 'По возрастанию зарплаты' },
        { value: 'desk', text: 'По убыванию зарплаты' },
    ]

    function getItemName(val: string, list: Array<{ value: string; text: string }>): string {
        const item = list.find((el) => el.value === val)
        if (item) {
            return item.text
        }
        return ''
    }

    return { cityOptions, employmentTypeOptions, sortOptions, getItemName }
}
