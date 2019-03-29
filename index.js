const vol = require("vol")
const gamepad = require("gamepad")
const {exec}  = require("child_process")


const VOLUME_UP = 7
const VOLUME_DOWN = 5
const VOL_INCREMENT = .03
let currentVolume = 1;


vol.get().then(start)

function start(volume){
    currentVolume = volume
    showCurrentVolume()
    gamepad.init()

    for(var i = 0, l = gamepad.numDevices(); i<l; i++) console.log(i, gamepad.deviceAtIndex(i))
    
    setInterval(gamepad.processEvents, 16)
    setInterval(gamepad.detectDevices, 500)
    
    
    gamepad.on("down", (joystickId, buttonId) => {
        switch(buttonId){
            case VOLUME_UP:
                volumeUp()
                break
            case VOLUME_DOWN:
                volumeDown()
                break
        }
    })
    exec("jmouse.exe")
}


function volumeUp(){
    incrementVolume(VOL_INCREMENT)
}

function volumeDown(){
    incrementVolume(VOL_INCREMENT * -1)
}

function incrementVolume(value){
    currentVolume += value
    currentVolume = clamp(currentVolume)
    vol.set(currentVolume)
    showCurrentVolume()
}

function clamp(value, min = 0, max = 1){
    return Math.min(max, Math.max(min, value))
}

function showCurrentVolume(){
    return //Don't log unecessary stuff
    console.log("Current volume: " + currentVolume)
}
