const container = document.querySelector('.container'),
mainVideo = document.querySelector('video'),
playBtn = document.querySelector('.play-stop'),
backwardBtn = document.querySelector('.skip-backward'),
forwardBtn = document.querySelector('.skip-forward'),
inPictureBtn = document.querySelector('.in-picture'),
expandBtn = document.querySelector('.expand'),
soundBtn = document.querySelector('.sound-button'),
soundSlider = document.querySelector('.left input'),
videoTimeLine = document.querySelector('.video-timeline'),
timeLineSpan = document.querySelector('.progress-area span'),
progressBar = document.querySelector('.progress-bar'),
videoCurrentTime = document.querySelector('.current-time'),
videoDuration = document.querySelector('.full-time'),
speedBtn = document.querySelector('.speed-btn'),
speedOptions = document.querySelector('.speed-options')

let soundOn = true,
vidDuration = mainVideo.duration
let timer;

const hideControls = () =>{
    if (mainVideo.paused) return;

    timer = setTimeout(()=>{
        container.classList.remove('show-control')
        console.log('timer ended');
    },3000)
}
hideControls()

container.addEventListener('mousemove', ()=>{
    container.classList.add('show-control')
    clearTimeout(timer)
    hideControls()
})

// reponsive input range
function handleInputChange(e) {
    let target = e.target
    const min = target.min
    const max = target.max
    const val = target.value
    
    target.style.backgroundSize = (val - min) * 100 / (max - min) + '% 100%'
  }
soundSlider.addEventListener('input', handleInputChange)

const formatTime = time =>{
    seconds = Math.floor(time % 60)
    minutes = Math.floor(time / 60) % 60
    hours = Math.floor(time / 3600)

    seconds = seconds < 10 ? `0${seconds}`: seconds
    minutes = minutes < 10 ? `0${minutes}`: minutes
    hours = hours < 10 ? `0${hours}`: hours
    if (hours == 0) {
        return `${minutes}:${seconds}`
    }
    return `${hours}:${minutes}:${seconds}`
}

mainVideo.addEventListener('timeupdate', e =>{
    let {duration, currentTime} = e.target
    percent = (currentTime / duration) * 100
    progressBar.style.width = `${percent}%`
    
    timeLineSpan.innerText = formatTime(currentTime)
    videoCurrentTime.innerText = formatTime(currentTime)
})

videoDuration.innerText = formatTime(mainVideo.duration) //video duration loaded

mainVideo.addEventListener('loadeddata', e =>{
    videoDuration.innerText = e.target.duration
})

soundBtn.addEventListener('click', ()=>{
    if (soundOn==true) {
        mainVideo.volume = 0.0
        soundBtn.innerHTML = `<i class="fa-solid fa-volume-mute"></i>`
        soundOn = false
        soundSlider.style.backgroundSize ='0% 100%'
    }
    else{
        mainVideo.volume = 0.5
        soundBtn.innerHTML = `<i class="fa-solid fa-volume-high"></i>`
        soundOn = true
        soundSlider.style.backgroundSize ='50% 100%'
    }
    
    soundSlider.value = mainVideo.volume
})

soundSlider.addEventListener('input', e =>{
    mainVideo.volume = e.target.value
    if (e.target.value == 0 ) {
        soundBtn.innerHTML = `<i class="fa-solid fa-volume-mute"></i>`
        soundOn = false
    }
    else{
        soundBtn.innerHTML = `<i class="fa-solid fa-volume-high"></i>`
        soundOn = true
    }
})

playBtn.addEventListener('click', ()=>{
    if (mainVideo.paused) {
        mainVideo.play()
        videoOn = true
        playBtn.innerHTML = `<i class="fas fa-pause">`
    }
    else{
        mainVideo.pause()
        playBtn.innerHTML = `<i class="fas fa-play">`
    }
})

backwardBtn.addEventListener('click', ()=>{
    mainVideo.currentTime -= 5
}) 
forwardBtn.addEventListener('click', ()=>{
    mainVideo.currentTime += 5
})

videoTimeLine.addEventListener('click', e =>{
    let timeLineWidth = e.target.clientWidth //get video timeline width
    mainVideo.currentTime = (e.offsetX / timeLineWidth) * mainVideo.duration
})

const draggableProgressBar = e =>{
    let timeLineWidth = e.target.clientWidth //get video timeline width
    progressBar.style.width = `${e.offsetX}px`
    mainVideo.currentTime = (e.offsetX / timeLineWidth) * mainVideo.duration
    videoCurrentTime.innerText = formatTime(mainVideo.currentTime)
}

videoTimeLine.addEventListener('mousedown', ()=>{
    videoTimeLine.addEventListener('mousemove', draggableProgressBar)
})

videoTimeLine.addEventListener('mousemove', e =>{
 timeLineSpan.style.left = `${e.offsetX}px`
 let timeLineWidth = e.target.clientWidth,
 percent = (e.offsetX / timeLineWidth) * mainVideo.duration
 timeLineSpan.innerText = formatTime(percent)
})

document.addEventListener('mouseup', ()=>{
    videoTimeLine.removeEventListener('mousemove', draggableProgressBar)
})

inPictureBtn.addEventListener('click', ()=>{
    mainVideo.requestPictureInPicture()
})


expandBtn.addEventListener('click', ()=>{
    container.classList.toggle('fullscreen')
    if (document.fullscreenElement) {
        expandBtn.innerHTML = `<i class="fa-solid fa-expand"></i>`
        return document.exitFullscreen()
    }
    expandBtn.innerHTML = `<i class="fa-solid fa-compress"></i>`
    container.requestFullscreen()
})

speedBtn.addEventListener('click', () =>{
    speedOptions.classList.toggle('show')
})

document.addEventListener('click', e =>{
    if (e.target.tagName !== 'SPAN' || e.target.className !== 'material-icons' ) {
        speedOptions.classList.remove('show')
    }
})

speedOptions.querySelectorAll('li').forEach(option => {
    option.addEventListener('click', ()=>{
        mainVideo.playbackRate = option.dataset.speed
        speedOptions.querySelector('.active').classList.remove('active')
        option.classList.add('active')
    })
});

