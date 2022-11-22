type Callback = (...args: any[]) => void

function throttle(cb: Callback, timeout: number) {
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

export function debounce(el: HTMLInputElement, binding: { value: string; oldValue: string }) {
    if (binding.value !== binding.oldValue) {
        el.oninput = throttle(function () {
            el.dispatchEvent(new Event('change'))
        }, parseInt(binding.value) || 500)
    }
}
