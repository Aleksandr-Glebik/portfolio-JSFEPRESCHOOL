const containerVideoPlayer = document.querySelector('.video-player')
const btnHome = document.querySelector('.btn__home')
const videoElements = ['.video-screen', '.video-screen__viewer', '.video-nav']
const videoNavProgress = document.querySelector('.video-nav__progress')
const videoNavVolume = document.querySelector('.video-nav__volume')
const video = document.querySelector('.video-screen__viewer')
let isPlay = false
const useBtnControlsPP = document.querySelector('.btn__controls-pp > use')
const useBtnControlsVM = document.querySelector('.btn__controls-vm > use')

btnHome.addEventListener('click', hideBackgroundImg)
video.addEventListener('click', controlIsPlay)
useBtnControlsPP.addEventListener('click', controlIsPlay)
videoNavProgress.addEventListener('input', addStyleToBackgroundInput)
videoNavVolume.addEventListener('input', addStyleToBackgroundInput)
video.addEventListener('timeupdate', controlTimeVideo)
videoNavProgress.addEventListener('change', setProgressVideo)
videoNavVolume.addEventListener('change', setVideoVolume)
useBtnControlsVM.addEventListener('click', onOrOfVolume)

function hideBackgroundImg() {
    containerVideoPlayer.classList.add('hide-bg-img')
    findVideoElements()
    playVideo()
    controlDisplayItems()
}

function findVideoElements() {
    videoElements.forEach((el) => {
        removeDisplayNone(el)
    })
}

function removeDisplayNone(classNameElem) {
    let items = document.querySelectorAll(classNameElem)
    items.forEach((item) => {
       item.style.display = 'flex'
    })
}

function addStyleToBackgroundInput() {
    let value = this.value
    this.style.background = `linear-gradient( to right, #bdae82 0%, #bdae82 ${value}%, #c8c8c8 ${value}%, #c8c8c8 100% )`
}

function playVideo() {
    video.play()
    isPlay = true
}

function pauseVideo() {
    video.pause()
    isPlay = false
}

function controlDisplayItems() {
    if (isPlay === true) {
        btnHome.style.display = 'none'
        useBtnControlsPP.setAttribute('xlink:href', '../portfolio/assets/svg/sprite.svg#pause')
    } else if (isPlay !== true) {
        btnHome.style.display = 'block'
        useBtnControlsPP.setAttribute('xlink:href', '../portfolio/assets/svg/sprite.svg#play')
    }

    if (video.volume === 0) {
        useBtnControlsVM.setAttribute('xlink:href', '../portfolio/assets/svg/sprite.svg#mute')
    } else if (video.volume > 0) {
        useBtnControlsVM.setAttribute('xlink:href', '../portfolio/assets/svg/sprite.svg#volume')
    }
}

function controlIsPlay() {
    if (isPlay === true) {
        pauseVideo()
        controlDisplayItems()
    } else {
        playVideo()
        controlDisplayItems()
    }
}

function controlTimeVideo() {
    let timePercent = ((video.currentTime / video.duration) * 100).toFixed(0)
    videoNavProgress.value = timePercent
    videoNavProgress.style.background = `linear-gradient( to right, #bdae82 0%, #bdae82 ${timePercent}%, #c8c8c8 ${timePercent}%, #c8c8c8 100% )`
}

function setProgressVideo() {
    video.currentTime = (videoNavProgress.value * video.duration) / 100
}

function setVideoVolume() {
    let value = (videoNavVolume.value / 100).toFixed(1)
    video.volume = value
    controlDisplayItems()
}

function onOrOfVolume() {
    if (video.volume !== 0) {
        video.volume = 0
        controlDisplayItems()
    } else {
        setVideoVolume()
        controlDisplayItems()
    }
}

console.log(`
Оценка за таск : 70.

1. Вёрстка : 10
1.1 есть само видео, в панели управления есть кнопка Play/Pause, прогресс-бар, кнопка Volume/Mute, регулятор громкости звука;
1.2 допускалось выполнение таска в проекте portfolio - весь функционал сайта сохранен (переключая светлую и темную темы - оформление плейера изменяеться);

2. Кнопка Play/Pause на панели управления : 10
2.1 при клике по кнопке Play/Pause запускается или останавливается проигрывание видео;
2.2 внешний вид и функционал кнопки изменяется в зависимости от того, проигрывается ли видео в данный момент;

3.Прогресс-бар отображает прогресс проигрывания видео... : 10;

4. При перемещении ползунка регулятора громкости звука можно сделать звук громче или тише... : 10;

5. При клике по кнопке Volume/Mute можно включить или отключить звук... : 10;

6. Кнопка Play/Pause в центре видео... : 10;

7. Качество оформления приложения соответствует макету : 10;
`)