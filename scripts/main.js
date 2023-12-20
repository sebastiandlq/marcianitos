import { update as updatePlayer, draw as drawPlayer } from "./player.js"

const canvas = document.querySelector('canvas')
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
scaleCanvas()

function update(){
    updatePlayer()
}

function draw(){
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    drawPlayer(ctx)
}

function scaleCanvas(){
    /*let scalator = screen.width / canvas.width
    canvas.style.transform = `scale(${scalator})`
    console.log("Escalado a: ", scalator)*/
}

window.requestAnimationFrame(main)