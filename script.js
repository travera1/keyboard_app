//QUERY SELECTORS
const keyboard = document.querySelector('[data-keyboard]')
const keys = [...document.querySelectorAll('.key')]
const box = document.getElementById('box')
const selectKB = document.querySelector('[data-select-kb]')
const modalSelKBCon = document.querySelector('[data-modal-sel-kb-con]')
const modalCons = [...document.querySelectorAll('.modal-con')]


//EVENT LISTENERS

//event: window load
window.addEventListener('DOMContentLoaded', () => {
    //update theme
    const theme = storage.checkTheme()
    if(theme === 'dark') {
        ui.theme() 
    }
})

//event: toggle theme
box.addEventListener('change', () => ui.theme())

//event: open select-kb modal
selectKB.addEventListener('click', () => {
    modalSelKBCon.classList.add('active')
})

//event: escape key to close
document.addEventListener('keydown', e =>{
    if(e.code == 'Escape') {
        modalCons.forEach(modalCon => {
            modalCon.classList.remove('active')
        })
    }
})

//event: keydown
document.addEventListener('keydown', e => {
    const keyCode = e.code
    const key = keys.find(key => {
        return key.dataset.key === e.code
    })
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
    }
}




