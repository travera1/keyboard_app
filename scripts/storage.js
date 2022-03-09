import { setKeys } from './main.js'

export const storage = {
    saveTheme(value) {
        localStorage.setItem('keyboardapp.theme', `${value}`)
    },
    checkTheme() {
        return localStorage.getItem('keyboardapp.theme')
    },
    saveSelectedKB(value) {
        localStorage.setItem('keyboardapp.selectedKB', `${value}`)
        setKeys(value)
    },
    checkSelectedKB() {
        return localStorage.getItem('keyboardapp.selectedKB')
    }

}
