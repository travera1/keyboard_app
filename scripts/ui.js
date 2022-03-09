import { storage } from './storage.js'
import { kb60, kb75, setKeys } from './main.js'

const modalCons = [...document.querySelectorAll('.modal-con')]

export const ui = {
    theme() {
        const ball = document.querySelector('.ball')
        document.body.classList.toggle('dark');
        if (document.body.classList.contains('dark')) {
            storage.saveTheme('dark')
            //move ball
            ball.style.transform = 'translate(48px)'
        } else {
            storage.saveTheme('light')
            ball.style.transform = 'translate(0px)'
        }
    },
    closeModal() {
        modalCons.forEach(modalCon => {
            modalCon.classList.remove('active')
        })
    },
    refreshSelectedKB(){
        const selection = storage.checkSelectedKB()
        if (!selection) {
            return   
        } else if (selection == 'sixty') {
            kb60.classList.add('active')
            setKeys('sixty')
        } else if (selection == 'seventyFive'){
            kb75.classList.add('active')
            setKeys('seventyFive')
        }
    }
}