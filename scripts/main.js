import { update as updatePlayer, draw as drawPlayer, getPlayer, hit, getHitPoints } from "./player.js"
import { checkCollision } from "./collisions.js"
import { drawShots, enemyShots, playerShots, updateShots } from "./shots.js"
import { spawnEnemies, update as enemiesUpdate, draw as enemiesDraw, enemies } from "./enemyGroup.js"

export const canvas = document.querySelector('canvas')
canvas.width=1300
canvas.height=731

//Interface
const LIVES = document.getElementById('lives')
const SCORE = document.getElementById('score')
const RESET_BUTTON = document.querySelector('button')
//Canvas
const ctx = canvas.getContext('2d')

let lastRenderTime = 0
const GAMESPEED = 100

let active = true
let score = 0

function main(currentTime){
    const secondsSinceLastRender = (currentTime - lastRenderTime)/1000;
    if(secondsSinceLastRender < 1/GAMESPEED){
        window.requestAnimationFrame(main)
        return
    }else{
        if(active){
            window.requestAnimationFrame(main)
            update()
            draw()
            lastRenderTime = currentTime
        }
    }
}

function update(){
    updatePlayer()
    enemiesUpdate()
    updateShots()
    
    checkCollisionsPlayerShotsEnemy()
    checkCollisionsEnemyShotsPlayer()
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
                    addScore(100)
                    updateInterface()
                }
            });
        })
    })
}

function checkCollisionsEnemyShotsPlayer(){
    enemyShots.forEach((s, i) => {
        if(checkCollision(s, getPlayer())){
            //Player Got Shot
            delete enemyShots[i]
            hit()
            updateInterface()
            if(getHitPoints() <= 0){
                GameOver()
            }
        }
    })
}

function addScore(points) {
    score += points
}

function updateInterface(){
    LIVES.textContent = getHitPoints()
    SCORE.textContent = score
}

function GameOver(){
    active = false
    alert("You died")
}

function ResetGame(){
    location.reload()
}

function start(){
    spawnEnemies(3, 5)
    updateInterface()
    window.requestAnimationFrame(main)
}

start()

RESET_BUTTON.addEventListener('click', ResetGame)