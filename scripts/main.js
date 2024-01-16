import { update as updatePlayer, draw as drawPlayer, getPlayer, hit, getHitPoints, resetPlayer } from "./player.js"
import { checkCollision } from "./collisions.js"
import { drawShots, enemyShots, playerShots, resetShots, updateShots } from "./shots.js"
import { spawnEnemies, update as enemiesUpdate, draw as enemiesDraw, enemies, resetEnemies } from "./enemyGroup.js"

export const canvas = document.querySelector('canvas')
canvas.width=1300
canvas.height=731

//Interface
const LIVES = document.getElementById('lives')
const SCORE = document.getElementById('score')
const RESET_BUTTON = document.querySelector('#reset-game')
const PAUSE_BUTTON = document.querySelector('#pause')
//Graphics
const BACKGROUND = document.querySelector('#background')
//Canvas
const ctx = canvas.getContext('2d')

let lastRenderTime = 0
const GAMESPEED = 100

let active = true
let score = 0

const ENEMY_ROWS = 3, ENEMY_COLUMNS = 5

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
    drawBackground()
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
    updateLives()
    SCORE.textContent = score
}
function updateLives(){
    let livesText = "";
    for(let i = 0; i < getHitPoints(); i++){
        livesText += "|"
    }
    LIVES.textContent = livesText
}

function GameOver(){
    active = false
    alert("You died")
}

function ResetGame(){
    resetPlayer()
    resetEnemies(ENEMY_ROWS, ENEMY_COLUMNS)
    resetShots()
    score = 0
    updateInterface()
    if(!active){
        active = true
        window.requestAnimationFrame(main)
    }
}

function start(){
    spawnEnemies(ENEMY_ROWS, ENEMY_COLUMNS)
    updateInterface()
    window.requestAnimationFrame(main)
}

function drawBackground(){
    ctx.fillStyle = 'black'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    ctx.drawImage(BACKGROUND, 0, 0)
}

function pauseGame(){
    active = !active
    if(active && getHitPoints() > 0){
        window.requestAnimationFrame(main)
    }
}

start()

RESET_BUTTON.addEventListener('click', ResetGame)
PAUSE_BUTTON.addEventListener('click', pauseGame)
