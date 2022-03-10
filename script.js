import Picker from './colorPicker.js'

//QUERY SELECTORS
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
const aboutBtn = document.querySelector('[data-info-btn]')
const aboutInfo = document.querySelector('[data-info]')
const homeBtn = document.querySelector('[data-home]')
const colorCustomization = document.querySelector('[data-color-customization]')
const rgbBtn = document.querySelector('[data-rgb-btn]')
const rgbSpeedCon = document.querySelector('[data-rgb-speed-con]')

//keyboards
const keyboards = [
    {
        name: 'sixty',
        size: 'sixty',
        keys: sixtyKeys,
        rgbCycle: false,
        cycleLength: 'slow',
        isActive: 'false',
    },
    {
        name: 'seventyFive',
        size: 'seventyFive',
        keys: seventyFiveKeys,
        rgbCycle: false,
        cycleLength: 'slow',
        isActive: 'false',
    }
]
//stores keys of current kb type
let keys

//EVENT LISTENERS

//event: window load
window.addEventListener('DOMContentLoaded', () => {
    ui.initializeSettings()
    ui.refreshSelectedContent()
})

//event: home btn 
homeBtn.addEventListener('click', () => {
    storage.saveSelectedContent('home')
    ui.refreshSelectedContent()
})

//event: about btn
aboutBtn.addEventListener('click', () => {
    storage.saveSelectedContent('about')
    ui.refreshSelectedContent()
})

//events: rgb speed btns
const rgbSpeedBtns = [...rgbSpeedCon.children]
rgbSpeedBtns.forEach(btn => {
    const speed = btn.dataset.speed
    btn.addEventListener('click', () => {
        rgbSpeedBtns.forEach(btn => btn.style.borderColor = 'transparent')
        btn.style.borderColor = '#999'
        ui.rgbSpeed(speed)
    })
})
//event: rgb btn 
rgbBtn.addEventListener('click', () => ui.rgbCycle())


//event: open select-kb modal
selectKBbtn.addEventListener('click', () => {
    modalSelKBCon.classList.add('active')
})

//event: toggle theme
box.addEventListener('change', () => ui.theme())

//event: escape key to close
document.addEventListener('keydown', e => {
    if (e.code == 'Escape') {
        ui.closeModal()
    }
})

//event: select 60%
select60.addEventListener('click', () => {
    storage.saveSelectedKB('sixty')
    ui.closeModal()
    ui.refreshSelectedContent()
    rgbBtn.classList.remove('on')
    void rgbBtn.offsetWidth  //**smart fix **/
    rgbBtn.classList.add('on')
   
})

//event: select 75%
select75.addEventListener('click', () => {
    storage.saveSelectedKB('seventyFive')
    ui.closeModal()
    ui.refreshSelectedContent()
    rgbBtn.classList.remove('on')
    void rgbBtn.offsetWidth //**smart fix **/
    rgbBtn.classList.add('on')

})

//event: keydown
document.addEventListener('keydown', e => {

    const key = keys.find(key => {
        return key.dataset.key === e.code
    })
    if (key != undefined) {
        key.classList.add('active')
    }
})

//event: keyup
document.addEventListener('keyup', e => {
    const key = keys.find(key => {
        return key.dataset.key === e.code
    })
    if (key != undefined) {
        key.classList.remove('active')
    }

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
    },
    saveSelectedContent(value) {
        localStorage.setItem('keyboardapp.selectedContent', `${value}`)
    },
    checkSelectedContent() {
        return localStorage.getItem('keyboardapp.selectedContent')

    },
    saveRgbCycle(value) {
        localStorage.setItem('keyboardapp.rgbCycle', `${value}`)
    },
    checkRgbCycle() {
        return localStorage.getItem('keyboardapp.rgbCycle')
    },
    saveRgbSpeed(value) {
        localStorage.setItem('keyboardapp.rgbSpeed', `${value}`)
    },
    checkRgbSpeed() {
        return localStorage.getItem('keyboardapp.rgbSpeed')
    },
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
    rgbCycle() {
        setKeys()
        seventyFiveKeys.forEach(key => key.classList.toggle('on'))
        sixtyKeys.forEach(key => key.classList.toggle('on'))

        rgbBtn.classList.toggle('on')
        if (rgbBtn.classList.contains('on')) {
            storage.saveRgbCycle('on')
        } else {
            storage.saveRgbCycle('off')
        }
    },
    rgbSpeed(speed) {
        rgbBtn.classList.remove('rgb-slow')
        rgbBtn.classList.remove('rgb-med')
        rgbBtn.classList.remove('rgb-fast')
        rgbBtn.classList.add(`rgb-${speed}`)
      
        seventyFiveKeys.forEach(key => {
            key.classList.remove('rgb-slow')
            key.classList.remove('rgb-med')
            key.classList.remove('rgb-fast')
            key.classList.add(`rgb-${speed}`)
        })
        sixtyKeys.forEach(key => {
            key.classList.remove('rgb-slow')
            key.classList.remove('rgb-med')
            key.classList.remove('rgb-fast')
            key.classList.add(`rgb-${speed}`)
        })
        storage.saveRgbSpeed(speed)
    },
    closeModal() {
        modalCons.forEach(modalCon => {
            modalCon.classList.remove('active')
        })
    },
    initializeSettings() {
        //update theme
        const theme = storage.checkTheme()
        if (theme === 'dark') {
            ui.theme()
        }
        //initialize kb selection
        if(storage.checkSelectedKB() == null) {
            storage.saveSelectedKB('sixty')
        }
        //initialize selected content selection
        if(storage.checkSelectedContent() == null) {
            storage.saveSelectedContent('home')
        }
        //update rgb
        const rgbCycle = storage.checkRgbCycle()
        if (rgbCycle === 'on') {
            ui.rgbCycle()
        }
        //update rgb speed
        const rgbSpeed = storage.checkRgbSpeed()
        if(rgbSpeed){
            ui.rgbSpeed(rgbSpeed)
            const speedBtn = rgbSpeedBtns.find(btn => {
                return btn.dataset.speed == rgbSpeed
            })
            speedBtn.style.borderColor = '#999'
        }
        //update color
    },
    refreshSelectedContent() {
        const activeElements = [...document.querySelectorAll('.active')]
        activeElements.forEach(element => {
            element.classList.remove('active')
        })
        const selection = storage.checkSelectedContent()
        if (!selection) {
            return
        } else if (selection == 'home') {
            colorCustomization.classList.add('active')
            const kbSelection = storage.checkSelectedKB()
            if (!kbSelection) {
                return
            } else if (kbSelection == 'sixty') {
                kb60.classList.add('active')
                setKeys('sixty')
            } else if (kbSelection == 'seventyFive') {
                kb75.classList.add('active')
                setKeys('seventyFive')
            }
        } else if (selection == 'about') {
            aboutInfo.classList.add('active')
        }
    }
}
// helpers 
function setKeys() {
    const kbType = storage.checkSelectedKB()
    if (kbType == 'sixty') {
        keys = sixtyKeys
    } else if (kbType == 'seventyFive') {
        keys = seventyFiveKeys
    } else {
        return
    }
}

// color picker
let picker = new Picker(document.getElementById('color-picker'),
    300, 40)

//Draw
setInterval(() => picker.draw(), 1)

picker.onChange((color) => {
    let selected = document.querySelector(".selected")
    selected.style.backgroundColor = `rgb(${color.r}, ${color.g}, ${color.b})`
})