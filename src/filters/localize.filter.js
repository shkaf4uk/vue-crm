import store from '../store'
import ru from '../locales/ru.json'
import en from '../locales/en.json'

const colales = {
    'ru-RU': ru,
    'en-US': en
}

export default function localizeFilter(key) {
    const locate = store.getters.info.locate || 'ru-RU'
    return colales[locate][key] || `[Localize error]: key ${key} not found`
}