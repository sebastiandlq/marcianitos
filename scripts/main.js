import { Enemy } from "./enemy.js"
import { update as updatePlayer, draw as drawPlayer } from "./player.js"
import { checkCollision } from "./collisions.js"

export const canvas = document.querySelector('canvas')
canvas.width=1300
canvas.height=731

const ctx = canvas.getContext('2d')

let lastRenderTime = 0
const GAMESPEED = 100

const enemy = new Enemy(50, 80, 10)
const enemy2 = new Enemy(300, 80, 5, 64, 80, false)

function main(currentTime){
    window.requestAnimationFrame(main)
    const secondsSinceLastRender = (currentTime - lastRenderTime)/1000;
    if(secondsSinceLastRender < 1/GAMESPEED){
        return
    }else{
        update()
        draw()
        lastRenderTime = currentTime
    }
}

function update(){
    updatePlayer()
    enemy.update()
    enemy2.update()
    if(checkCollision(enemy.x, enemy.y, enemy.WIDTH, enemy.HEIGHT, enemy2.x, enemy2.y, enemy2.WIDTH, enemy2.HEIGHT)){
        enemy.changeDirection()
        enemy2.changeDirection()
    }
}

function draw(){
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    drawPlayer(ctx)
    enemy.draw(ctx)
    enemy2.draw(ctx)
}

window.requestAnimationFrame(main)