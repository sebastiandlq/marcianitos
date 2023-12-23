import { canvas } from "./main.js"

export class Shots {
    constructor(x = 0, y = 0, fromPlayer = false, speed = 50,  width = 15, height = 20){
        this.x = x
        this.y = y
        this.WIDTH = width
        this.HEIGHT = height
        this.fromPlayer = fromPlayer
        this.speed = speed
    }

    update(){
        this.y += this.speed * (this.fromPlayer? -1 : 1)
    }

    draw(gameCanvas){
        gameCanvas.fillStyle = 'black'
        gameCanvas.fillRect(this.x, this.y, this.WIDTH, this.HEIGHT)
    }

    isOutOfBorder(){
        return this.y < 0 || this.y + this.HEIGHT > canvas.height;
    }
}

//Shots array
export let playerShots = []
export let enemyShots = []


export function updateShots(){
    //Player Shots
    playerShots.forEach(s => {
        s.update()
        if(s.isOutOfBorder()){
            //Investigar Slice para borrar bala
        }
    });
    enemyShots.forEach(s => {
        s.update()
        if(s.isOutOfBorder()){
            //Investigar Slice para borrar bala
        }
    });
}
export function drawShots(gameCanvas){
    playerShots.forEach(s => {
        s.draw(gameCanvas)
    })
    enemyShots.forEach(s => {
        s.draw(gameCanvas)
    })
}

export function PlayerShot(x, y, WIDTH, HEIGHT){
    let shot = new Shots(x + WIDTH/2 - 10, y + HEIGHT/2, true)
    playerShots.push(shot)
}

//EnemyShots

export function EnemyShot(x, y, WIDTH, HEIGHT){
    let shot = new Shots(x + WIDTH/2 - 10, y + HEIGHT/2, false, 10)
    enemyShots.push(shot)
}