import { ui } from './ui.js'
import { storage } from './storage.js'
// import { box, selectKBbtn, modalSelKBCon, kb60, kb75, select60, select75 } from './main.js'

const box = document.getElementById('box')
const selectKBbtn = document.querySelector('[data-select-kb-btn]')
const modalSelKBCon = document.querySelector('[data-modal-sel-kb-con]')
const select60 = document.querySelector('[data-select-60]')
const select75 = document.querySelector('[data-select-75]')
const kb60 = document.querySelector('[data-kb-60]')
const kb75 = document.querySelector('[data-kb-75]')

//EVENT LISTENERS

//event: window load
document.addEventListener('DOMContentLoaded', () => {
    console.log('window event about')
    //update theme
    const theme = storage.checkTheme()
    if(theme === 'dark') {
        ui.theme() 
    }
  
})

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

//event: select 60%
select60.addEventListener('click', () => {
    kb60.classList.add('active')
    kb75.classList.remove('active')
    ui.closeModal()
    storage.saveSelectedKB('sixty')
})

//event: select 75%
select75.addEventListener('click', () => {
    kb75.classList.add('active')
    kb60.classList.remove('active')
    ui.closeModal()
    storage.saveSelectedKB('seventyFive')
})