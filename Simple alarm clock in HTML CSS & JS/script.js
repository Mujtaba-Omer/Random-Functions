selectMenu = document.querySelectorAll("select")
const currentTime = document.querySelector("h1")
content = document.querySelector(".content")
setAlarmButton = document.getElementById("setButton")
alarmMenu = document.querySelector('ul')
let alarms = document.querySelectorAll('li')
let alarmTime, isAlarmSet = false, alarmId,
ringtone = new Audio('files/Blood of the Demon.mp3'),
alarmGroup = [], timeNow


for (let i = 12; i > 0; i--) {
    i = i < 10 ? '0' + i : i 
    let option = `<option value="${i}">${i}</option>`
    selectMenu[0].firstElementChild.insertAdjacentHTML("afterend", option)
}

for (let i = 59; i >= 0; i--) {
    i = i < 10 ? '0' + i : i 
    let option = `<option value="${i}">${i}</option>`
    selectMenu[1].firstElementChild.insertAdjacentHTML("afterend", option)
}

for (let i = 2; i > 0; i--) {
    let ampm = i == 1 ? 'AM' : 'PM' 
    let option = `<option value="${ampm}">${ampm}</option>`
    selectMenu[2].firstElementChild.insertAdjacentHTML("afterend", option)
}

setInterval(() => {
    let date = new Date()
    h = date.getHours()
    m = date.getMinutes()
    s = date.getSeconds()
    ampm = 'AM'

    if (h >= 12){
        h =  h - 12
        ampm = 'PM'
    }
    // if hours = 0 set it to 12
    h = h == 0 ? h = 12 : h
    // if h, m, s < 10 put 0 to the left
    h = h < 10 ? '0' + h : h
    m = m < 10 ? '0' + m : m
    s = s < 10 ? '0' + s : s

    currentTime.innerText = `${h}:${m}:${s} ${ampm}`
    // trigger the alarm
    for (let i = 0; i < alarmGroup.length; i++) {
        if (alarmGroup[i] == `${h}:${m} ${ampm}`) {
            ringtone.play()
            timeNow = alarmGroup[i]
            ringtone.loop = true
            content.classList.add('disable')
            setAlarmButton.innerText = 'Stop Alarm'
            isAlarmSet = true
        }  
    }
    
}, 1000);


function setAlarm() {
    if (isAlarmSet) {
        ringtone.pause()
        for (let i = 0; i < alarmGroup.length; i++) {
            if (alarmGroup[i] == timeNow) {
                clearAlarm(alarmGroup[i])
                alarmGroup.splice(i, 1)
            }
        }

        console.log(alarmGroup)
        content.classList.remove('disable')
        setAlarmButton.innerText = 'Set Alarm'
        return isAlarmSet = false
    }

    let time = `${selectMenu[0].value}:${selectMenu[1].value} ${selectMenu[2].value}`

    if (time.includes('Hour')||time.includes('Minute')||time.includes('AM/PM')){
        return alert('Please set a valid alarm Time')
    }
    
    alarmTime = time
    
    if (alarmGroup.includes(time)) {
        return alert('Please enter an alarm with different time')
    } 
    else {
        alarmItems = `<li id='${time}'><h2>${time}</h2>
                    <button id='clearButton'>Clear Alarm</button></li>`;
        alarmGroup.push(time)
        console.log(alarmGroup)
        alarmMenu.firstElementChild.insertAdjacentHTML("afterend", alarmItems)

        var clearAlarmButton = document.getElementById(`clearButton`)
        clearAlarmButton.addEventListener('click', function() {
            clearAlarm(time);
          })
    }
}


function clearAlarm(id){
    alarmId = document.getElementById(id)
    for (let i = 0; i < alarmGroup.length; i++) {
        if (alarmGroup[i] == id) {
            alarmGroup.splice(i, 1) 
        }
    }
    alarmId.remove()
    console.log(`alarm with id: ${id} is removed`)
    console.log(alarmGroup)
}


setAlarmButton.addEventListener('click', setAlarm)

