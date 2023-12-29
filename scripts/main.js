import { update as updatePlayer, draw as drawPlayer } from "./player.js"
import { checkCollision } from "./collisions.js"
import { drawShots, playerShots, updateShots } from "./shots.js"
import { spawnEnemies, update as enemiesUpdate, draw as enemiesDraw, enemies } from "./enemyGroup.js"

export const canvas = document.querySelector('canvas')
canvas.width=1300
canvas.height=731

const ctx = canvas.getContext('2d')

let lastRenderTime = 0
const GAMESPEED = 100

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
    enemiesUpdate()
    updateShots()

    checkCollisionsPlayerShotsEnemy()
}

function draw(){
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    drawPlayer(ctx)
    enemiesDraw(ctx)
    drawShots(ctx)
}

function checkCollisionsPlayerShotsEnemy(){
    playerShots.forEach((s,a) => {
        enemies.forEach((row, i) => {
            row.forEach((enemie, j) => {
                if(checkCollision(enemie, s)){
                    delete enemies[i][j]
                    delete playerShots[a]
                }
            });
        })
    })
}

function start(){
    spawnEnemies(3, 5)
    window.requestAnimationFrame(main)
}

start()