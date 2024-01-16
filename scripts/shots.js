import { canvas } from "./main.js"


const PLAYERSHOOT = document.querySelector('#playershoot')
const ENEMYSHOOT = document.querySelector('#enemyshoot')
export class Shots {
    constructor(x = 0, y = 0, fromPlayer = false, speed = 50, image,  width = 10, height = 20){
        this.x = x
        this.y = y
        this.WIDTH = width
        this.HEIGHT = height
        this.fromPlayer = fromPlayer
        this.speed = speed
        this.imagesrc = image
    }

    update(){
        this.y += this.speed * (this.fromPlayer? -1 : 1)
    }

    draw(gameCanvas){
        if(this.imagesrc){
            gameCanvas.drawImage(this.imagesrc, this.x, this.y)
        }else{
            gameCanvas.fillStyle = 'black'
            gameCanvas.fillRect(this.x, this.y, this.WIDTH, this.HEIGHT)
        }
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
    playerShots.forEach((s, i) => {
        if(s.update){
            s.update()
        }
        if(s.isOutOfBorder()){
           delete playerShots[i]
        }
    });
    enemyShots.forEach((s, i) => {
        s.update()
        if(s.isOutOfBorder()){
            delete enemyShots[i]
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
    let shot = new Shots(x + WIDTH/2 - 7.5, y + HEIGHT/2, true, 50, PLAYERSHOOT)
    playerShots.push(shot)
}

//EnemyShots

export function EnemyShot(x, y, WIDTH, HEIGHT){
    let shot = new Shots(x + WIDTH/2 - 7.5, y + HEIGHT/2, false, 10, ENEMYSHOOT)
    enemyShots.push(shot)
}

export function resetShots(){
    playerShots = []
    enemyShots= []
}
