import store from '@/store'

export default function dateFilter(value, format = 'date') {
    const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        hour12: false
    }

    const locate = store.getters.info.locate

    return new Intl.DateTimeFormat(locate, options).format(new Date(value))
}