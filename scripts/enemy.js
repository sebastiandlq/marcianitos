import { canvas } from "./main.js"
import { EnemyShot } from "./shots.js"

export class Enemy{
    constructor(x = 0, y = 0, speed = 50, shotInterval = 150, image, width = 64, height = 80, goingRight = true){
        this.x = x
        this.y = y
        this.WIDTH = width
        this.HEIGHT = height
        this.speed = speed
        this.goingRight = goingRight
        this.shotInterval = shotInterval
        this.shotCounter = Math.floor(Math.random()*-300)
        this.imagesrc = image
    }

    update(){
        this.shotCounter++
        if(this.shotCounter >= this.shotInterval){
            this.shot()
            this.shotCounter = 0
        }
        this.x += this.speed * (this.goingRight? 1 : -1)
    }

    draw(gameCanvas){
        if(this.imagesrc){
            gameCanvas.drawImage(this.imagesrc, this.x, this.y)
        }else{
            gameCanvas.fillStyle = 'red'
            gameCanvas.fillRect(this.x, this.y, this.WIDTH, this.HEIGHT)
        }
    }

    checkOutOfBorder(event){
        if((this.x + this.speed < 0 && !this.goingRight) || (this.speed + this.x + this.WIDTH > canvas.width && this.goingRight)){
            return true
        }
        return false
    }

    changeDirection(){
        this.goingRight = !this.goingRight
    }
    shot(){
        EnemyShot(this.x, this.y, this.WIDTH, this.HEIGHT)
    }
}