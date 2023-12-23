import { getInputDirection } from "./input.js"
import { canvas } from "./main.js"
import { PlayerShot } from "./shots.js"

const SPEED =4
let x = 220
let y = 620
const WIDTH = 64
const HEIGHT = 80

export function update(){
    const inputDirection = getInputDirection();
    if((x + inputDirection.x * SPEED + WIDTH) < canvas.width && x + inputDirection.x * SPEED > 0){
        //Check if player is out of the canvas first
        x += inputDirection.x * SPEED; 
    }
}

export function draw(gameCanvas){
    gameCanvas.fillStyle = 'blue'
    gameCanvas.fillRect(x, y, WIDTH, HEIGHT)
}

addEventListener('keypress', e => {
    if(e.key == ' '){
        PlayerShot(x, y, WIDTH, HEIGHT)
    }
})