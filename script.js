//QUERY SELECTORS
// const keyboard = document.querySelector('[data-keyboard]')
// const keys = [...document.querySelectorAll('.key')]
const sixtyKeys = [...document.querySelectorAll('[data-kb-60] .key')]
const seventyFiveKeys = [...document.querySelectorAll('[data-kb-75] .key')]

const box = document.getElementById('box')
const selectKBbtn = document.querySelector('[data-select-kb-btn]')
const modalSelKBCon = document.querySelector('[data-modal-sel-kb-con]')
const modalCons = [...document.querySelectorAll('.modal-con')]
const select60 = document.querySelector('[data-select-60]')
const select75 = document.querySelector('[data-select-75]')
const kb60 = document.querySelector('[data-kb-60]')
const kb75 = document.querySelector('[data-kb-75]')

//stores keys of current kb type
let keys 

//EVENT LISTENERS

//event: window load
window.addEventListener('DOMContentLoaded', () => {
    //update theme
    const theme = storage.checkTheme()
    if(theme === 'dark') {
        ui.theme() 
    }
    ui.refreshSelectedKB()

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

//event: keydown
document.addEventListener('keydown', e => {
    const keyCode = e.code
    // if(keys) {

    // }
    const key = keys.find(key => {
        return key.dataset.key === e.code
    })
    console.log(key)
    key.classList.add('active')
})

//event: keyup
document.addEventListener('keyup', e => {
    const key = keys.find(key => {
        return key.dataset.key === e.code
    })
    key.classList.remove('active')

})


//FUNCTIONS 

const storage = {
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

const ui = {
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

// helpers 

function setKeys() {
    const kbType = storage.checkSelectedKB()
    if(kbType == 'sixty') {
        keys = sixtyKeys
    } else if (kbType == 'seventyFive') {
        keys =  seventyFiveKeys
    } else {
        return
    }
}





