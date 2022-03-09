import { ui } from './ui.js'
import { storage } from './storage.js'

//QUERY SELECTORS
// const keyboard = document.querySelector('[data-keyboard]')
// const keys = [...document.querySelectorAll('.key')]
const sixtyKeys = [...document.querySelectorAll('[data-kb-60] .key')]
const seventyFiveKeys = [...document.querySelectorAll('[data-kb-75] .key')]

export const box = document.getElementById('box')
export const selectKBbtn = document.querySelector('[data-select-kb-btn]')
export const modalSelKBCon = document.querySelector('[data-modal-sel-kb-con]')
export const select60 = document.querySelector('[data-select-60]')
export const select75 = document.querySelector('[data-select-75]')
export const kb60 = document.querySelector('[data-kb-60]')
export const kb75 = document.querySelector('[data-kb-75]')

//stores keys of current kb type
let keys 


//MAIN PAGE SPECIFFIC EVENT LISTENERS

//event: window load
const onWinLoad = function(e) {
    console.log('window event main')
    //update theme
    const theme = storage.checkTheme()
    if(theme === 'dark') {
        ui.theme() 
    }
    ui.refreshSelectedKB()
}
document.addEventListener('DOMContentLoaded', onWinLoad)
 
//event: keydown
const onKeydown = function(e) {
    const keyCode = e.code
    const key = keys.find(key => {
        return key.dataset.key === e.code
    })
    key.classList.add('active')
}
document.addEventListener('keydown', onKeydown)

//event: keyup
const onKeyup = function(e) {
    const key = keys.find(key => {
        return key.dataset.key === e.code
    })
    key.classList.remove('active')
}
document.addEventListener('keyup', onKeyup)
    
//remove page speciffic event listeners
window.onunload = function () {
    document.removeEventListener('DOMContentLoaded', onWinLoad)
    document.removeEventListener('keydown', onKeydown)
    document.removeEventListener('keyup', onKeyup)
    return;
}

//SHARED EVENT LISTENERS

//event: toggle theme
box.addEventListener('change', () => ui.theme())

//event: open select-kb modal
selectKBbtn.addEventListener('click', () => {
    modalSelKBCon.classList.add('active')
})

//event: escape key to close
document.addEventListener('keydown', e =>{
    if(e.code == 'Escape') {
        ui.closeModal()
    }
})

//event: select 75%
select75.addEventListener('click', () => {
    kb75.classList.add('active')
    kb60.classList.remove('active')
    ui.closeModal()
    storage.saveSelectedKB('seventyFive')
})

//event: select 60%
select60.addEventListener('click', () => {
    kb60.classList.add('active')
    kb75.classList.remove('active')
    ui.closeModal()
    storage.saveSelectedKB('sixty')
})

//FUNCTIONS 

export function setKeys() {
    const kbType = storage.checkSelectedKB()
    if(kbType == 'sixty') {
        keys = sixtyKeys
    } else if (kbType == 'seventyFive') {
        keys =  seventyFiveKeys
    } else {
        return
    }
}





