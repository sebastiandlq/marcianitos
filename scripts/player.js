import { getInputDirection } from "./input.js"
import { canvas } from "./main.js"
import { PlayerShot } from "./shots.js"

const SPEED =4
const COOLING_INTERVAL = 100
let coolingState = 0
let x = 220
let y = 620
const WIDTH = 64
const HEIGHT = 80

const SHOOT_BUTTON = document.querySelector('#shoot')

let hitPoints = 5

export function update(){
    const inputDirection = getInputDirection();
    if((x + inputDirection.x * SPEED + WIDTH) < canvas.width && x + inputDirection.x * SPEED > 0){
        //Check if player is out of the canvas first
        x += inputDirection.x * SPEED; 
    }
    coolingState--
}

export function draw(gameCanvas){
    gameCanvas.fillStyle = 'blue'
    gameCanvas.fillRect(x, y, WIDTH, HEIGHT)
}

export function getPlayer(){
    return {
        WIDTH : WIDTH,
        HEIGHT : HEIGHT,
        x : x,
        y: y
    }
}

export function hit(){
    hitPoints--
}

export function getHitPoints(){
    return hitPoints
}

function shoot(){
    if(coolingState <= 0){
        PlayerShot(x, y, WIDTH, HEIGHT)
        coolingState = COOLING_INTERVAL
    }
}

addEventListener('keydown', e => {
    switch(e.key){ //Doesnt detect arrows for some reason
        case ' ':
        case 'W':
        case 'w':
        case 'ArrowUp':
            shoot()
            break
    }
})
SHOOT_BUTTON.addEventListener('click', shoot)