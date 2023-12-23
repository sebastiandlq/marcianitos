import { Enemy } from "./enemy.js"
import { update as updatePlayer, draw as drawPlayer } from "./player.js"
import { checkCollision } from "./collisions.js"
import { drawShots, playerShots, updateShots } from "./shots.js"

export const canvas = document.querySelector('canvas')
canvas.width=1300
canvas.height=731

const ctx = canvas.getContext('2d')

let lastRenderTime = 0
const GAMESPEED = 100

let enemy = new Enemy(50, 50, 5)

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
    updateShots()

    checkCollisionsPlayerShotsEnemy()
}

function draw(){
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    drawPlayer(ctx)
    enemy.draw(ctx)
    drawShots(ctx)
}

function checkCollisionsPlayerShotsEnemy(){
    playerShots.forEach(s => {
        if(checkCollision(s, enemy)){
            console.log("Colision");
            enemy = {}
        }
    })
}

window.requestAnimationFrame(main)