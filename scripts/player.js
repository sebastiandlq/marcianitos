import { getInputDirection } from "./input.js"

const SPEED =4
let x = 220
let y = 300
export function update(){
    const inputDirection = getInputDirection();
    x += inputDirection.x * SPEED; 
}

export function draw(gameCanvas){
    gameCanvas.fillStyle = 'blue'
    gameCanvas.fillRect(x, y, 100, 100)
}