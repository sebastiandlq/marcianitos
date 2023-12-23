import { canvas } from "./main.js"
import { EnemyShot } from "./shots.js"

export class Enemy{
    constructor(x = 0, y = 0, speed = 50, shotInterval = 150, width = 64, height = 80, goingRight = true){
        this.x = x
        this.y = y
        this.WIDTH = width
        this.HEIGHT = height
        this.speed = speed
        this.goingRight = goingRight
        this.shotInterval = shotInterval
        this.shotCounter = 0
    }

    update(){
        this.x += this.speed * (this.goingRight? 1 : -1)
        this.checkOutOfBorder()
        console.log(this.x, this.y);
        this.shotCounter++
        if(this.shotCounter >= this.shotInterval){
            this.shot()
            this.shotCounter = 0
        }
    }

    draw(gameCanvas){
        gameCanvas.fillStyle = 'red'
        gameCanvas.fillRect(this.x, this.y, this.WIDTH, this.HEIGHT)
    }

    checkOutOfBorder(event){
        if(this.x < 0 || this.x + this.WIDTH > canvas.width){
            this.changeDirection()
        }
    }

    changeDirection(){
        this.goingRight = !this.goingRight
    }
    shot(){
        EnemyShot(this.x, this.y, this.WIDTH, this.HEIGHT)
    }
}