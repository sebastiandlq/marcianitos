import { getInputDirection } from "./input.js"
import { canvas } from "./main.js"
import { Shots } from "./shots.js"

const SPEED =4
let x = 220
let y = 620
const WIDTH = 64
const HEIGHT = 80

let shots = []
export function update(){
    const inputDirection = getInputDirection();
    if((x + inputDirection.x * SPEED + WIDTH) < canvas.width && x + inputDirection.x * SPEED > 0){
        //Check if player is out of the canvas first
        x += inputDirection.x * SPEED; 
    }
    updateShots()
}

export function draw(gameCanvas){
    gameCanvas.fillStyle = 'blue'
    gameCanvas.fillRect(x, y, WIDTH, HEIGHT)
    drawShots(gameCanvas)
}


function updateShots(){
    shots.forEach(s => {
        s.update()
    });
}
function drawShots(gameCanvas){
    shots.forEach(s => {
        console.log(s);
        s.draw(gameCanvas)
    })
}

function Shot(){
    let shot = new Shots(x + WIDTH/2 - 10, y + HEIGHT/2, true)
    shots.push(shot)
}

addEventListener('keypress', e => {
    if(e.key == ' '){
        Shot()
    }
})