import { number } from 'yup';
type Callback = (...args: any[]) => void

export function throttle(cb: Callback, timeout: number) {
    let timer: null | ReturnType<typeof setTimeout> = null

    return function (...args: any[]) {
        if (timer) return

        timer = setTimeout(() => {
            cb(...args)

            if (timer) {
                clearTimeout(timer)
            }
            timer = null
        }, timeout)
    }
}

export function debounce(cb: Callback, delay: number) {
    let timer: number | ReturnType<typeof setTimeout> = 0

    return (...args: any[]) => {
        clearTimeout(timer)
        timer = setTimeout(() => {
            cb(...args)
        }, delay)
    }
}
