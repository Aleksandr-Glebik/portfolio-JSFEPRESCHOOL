import i18Obj from './translate.js'

const hamburger = document.querySelector('.hamburger')
const nav = document.querySelector('.nav')
const useHamburger = document.querySelector('.hamburger > use')

const portfolioBtns = document.querySelector('.portfolio-btns')
const portfolioImgs = document.querySelectorAll('.portfolio-img')
const seasons = ['winter', 'spring', 'summer', 'autumn']

const containerSwitchLng = document.querySelector('.switch-lng')
const portfolioBtn = document.querySelectorAll('.portfolio-btn')
const lngBtn = document.querySelectorAll('.btn__lng')

const themeBtn = document.querySelector('.icon__theme')
const useIconTheme = document.querySelector('.icon__theme > use')
const body = document.querySelector('body')
const elemArrayForAddLightTheme = ['.header', '.nav-link', '.switch-lng', '.btn__lng', '.logo', '.icon__theme', '.hero', '.btn__gold', '.hero__title', '.hero__text', '.skills', '.section-title', '.skill-item__subtitle', '.skill-item__text', '.portfolio', '.portfolio-btn', '.video', '.price', '.price-item__title', '.price-item__price', '.price-item__text', '.btn__gold-price', '.contacts', '.section-title__contact', '.contacts-form__el', '.footer', '.footer-list__el', '.footer-text', '.footer-link', '.play_hover', '.nav', '.hamburger', '.btn__controls-pp', '.btn__controls-vm', '.video-nav__progress', '.video-nav__volume'];

let lang = 'en'
let theme = 'dark'

hamburger.addEventListener('click', toggleOpenCloseMenu)

function toggleOpenCloseMenu() {
    if (nav.classList.contains('openMenu')) {
        nav.classList.add('closeMenu')
        nav.classList.remove('openMenu')
    } else {
        nav.classList.add('openMenu')
        nav.classList.remove('closeMenu')
    }

    if (nav.classList.contains('openMenu')) {
        useHamburger.setAttribute('xlink:href', '../portfolio/assets/svg/sprite.svg#close')
    } else {
        useHamburger.setAttribute('xlink:href', '../portfolio/assets/svg/sprite.svg#hamburger')
    }
}

document.querySelector('.nav-list').addEventListener('click', function(event) {
    let tagName = event.target.tagName.toLowerCase()
    if (tagName === 'a') {
        toggleOpenCloseMenu()
    }
})

portfolioBtns.addEventListener('click', changeClassActive)
containerSwitchLng.addEventListener('click', changeClassActive)

function changeClassActive(event) {
    if (event.target.classList.contains('portfolio-btn')) {
        portfolioBtn.forEach(el => {
            el.classList.remove('active')
        })
        event.target.classList.add('active')
    } else if (event.target.classList.contains('btn__lng')) {
        lngBtn.forEach(el => {
            el.classList.remove('active')
        })
        event.target.classList.add('active')
    }
}

portfolioBtns.addEventListener('click', changeImage)

function changeImage(event) {
    let btn = event.target.classList.contains('portfolio-btn')
    let valueStrSeason = event.target.dataset.season
    if (btn) {
        portfolioImgs.forEach((img, index) => {
        img.src = `./assets/img/${valueStrSeason}/${index + 1}.jpg`
        })
    }
}

function preloadImages() {
    seasons.forEach((el) => {
        for (let i = 1; i <= 6; i++) {
            const img = new Image()
            img.src = `./assets/img/${el}/${i}.jpg`
        }
    })
}

preloadImages()

containerSwitchLng.addEventListener('click', setLanguages)

function setLanguages(event) {
    let language = event.target.textContent
    if (language === 'en') {
        lang = 'en'
        getTranslate(Object.keys(i18Obj)[0])
    } else if (language === 'ru') {
        lang = 'ru'
        getTranslate(Object.keys(i18Obj)[1])
    }

}

function getTranslate(lng) {
    lang = lng
    let allElementsWithDataSetAttr = document.querySelectorAll('[data-i18]')
    allElementsWithDataSetAttr.forEach((el) => {
        if (Object.keys(i18Obj[lng]).includes(el.dataset.i18)) {
            el.textContent = ''
            el.textContent = i18Obj[lng][el.dataset.i18]
        }
    })

}

themeBtn.addEventListener('click', changeTheme)

function changeTheme(event) {
    let themeBtnClick = event.target
     if (themeBtnClick.classList.contains('dark-theme')) {
        themeBtnClick.classList.remove('dark-theme')
        themeBtnClick.classList.add('light-theme')
        findElementsForCreateLightTheme()
    } else {
        themeBtnClick.classList.remove('light-theme')
        themeBtnClick.classList.add('dark-theme')
        findElementsForCreateLightTheme()
    }
}

function findElementsForCreateLightTheme() {
    elemArrayForAddLightTheme.forEach((el) => {
        changeElemToLightTheme(el)
    })
}

function changeElemToLightTheme(classNameElem) {
    let items = document.querySelectorAll(classNameElem)
    items.forEach((item) => {
        if (item.classList.contains('light-theme-cr')) {
            item.classList.remove('light-theme-cr')
            body.style.backgroundColor = '#000000'
            useIconTheme.setAttribute('xlink:href', '../portfolio/assets/svg/sprite.svg#light-theme')
            return theme = 'dark'
        } else {
            item.classList.add('light-theme-cr')
            body.style.backgroundColor = '#ffffff'
            useIconTheme.setAttribute('xlink:href', '../portfolio/assets/svg/sprite.svg#dark-theme')
            return theme = 'light'
        }
    })
}

function setLocalStorage() {
    localStorage.setItem('lang', lang)
    localStorage.setItem('theme', theme)
}

window.addEventListener('beforeunload', setLocalStorage)

function changeClassActiveBtnLngWithLS() {
    lngBtn.forEach((el)=> {
        if (el.textContent === lang) {
            el.classList.add('active')
        } else if (el.textContent !== lang) {
            el.classList.remove('active')
        }
    })
}

function changeThemeWithLC(str) {
    let icon = document.querySelector('.icon__theme')
    if ( str === 'light') {
        icon.classList.remove('dark-theme')
        icon.classList.add('light-theme')
        findElementsForCreateLightTheme()
    } else if (str === 'dark') {
        icon.classList.remove('light-theme')
        icon.classList.add('dark-theme')
    }
}

function getTranslateWithLC(lang) {
    lang = localStorage.getItem('lang')
    let allElementsWithDataSetAttr = document.querySelectorAll('[data-i18]')
    allElementsWithDataSetAttr.forEach((el) => {
        if (Object.keys(i18Obj[lang]).includes(el.dataset.i18)) {
            el.textContent = ''
            el.textContent = i18Obj[lang][el.dataset.i18]
        }
    })
}

function getLocalStorage() {
    if (localStorage.getItem('lang')) {
        lang = localStorage.getItem('lang')
        getTranslateWithLC(lang)
        changeClassActiveBtnLngWithLS(lang)
    }

    if (localStorage.getItem('theme')) {
        const theme = localStorage.getItem('theme')
        changeThemeWithLC(theme)
    }
}

window.addEventListener('load', getLocalStorage)

/* console.log(`
Ваша отметка - 80 балла(ов)
Отзыв по пунктам ТЗ:
Не выполненные/не засчитанные пункты:
1) сложные эффекты для кнопок при наведении и/или клике

Все оставшиеся пункты выполнены и не имеют комментариев проверяющего.
`); */
