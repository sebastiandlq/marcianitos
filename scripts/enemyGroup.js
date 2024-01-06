import { Enemy } from "./enemy.js"

let horizontalSeparation = 180
let verticalSeparation = 160

let xMargin = 50
let yMargin = 20

//Sprites
const ENEMY_1 = document.querySelector('#enemy1')
const ENEMY_2 = document.querySelector('#enemy2')
const ENEMY_3 = document.querySelector('#enemy3')

export let enemies

export function spawnEnemies(rows, columns){
    enemies = new Array(rows)
    for (let i = 0; i < rows; i++) {
        enemies[i] = new Array(columns)
        for (let j = 0; j < columns; j++) {
            let enemySprite
            switch(i){
                case 0:
                    enemySprite = ENEMY_1
                    break
                case 1:
                    enemySprite = ENEMY_2
                    break
                case 2:
                    enemySprite = ENEMY_3
                    break
            }
            enemies[i][j] = new Enemy(xMargin+j*horizontalSeparation, yMargin+i*verticalSeparation, 3, 150, enemySprite)
        }
    }
}

export function update(){
    enemies.forEach((row, i) => {
        row.forEach((enemy, j) => {
            if(enemy.update){               
                if(enemy.checkOutOfBorder()){
                    row.forEach(e => {
                        e.changeDirection()
                    })
                }
                enemy.update()
            }
        });
    });
    checkSeparation()
}

export function draw(gameCanvas){
    enemies.forEach(row => {
        row.forEach(enemie => {
            if(enemie.draw){
                enemie.draw(gameCanvas)
            }
        });
    });
}

function checkSeparation(){
    //This function looks for enemies that are gettin closer, it happens as a bug and this function checks and corrects if it happens
    for (let i = 0; i < enemies.length; i++) {
        for (let j = 1; j < enemies[i].length; j++) {
            /*
            if(enemies[i][j].x - enemies[i][j-1].x < horizontalSeparation && enemies[i][j]){
                enemies[i][j].x = enemies[i][j-1].x + horizontalSeparation
            }*/
            if(enemies[i][j] && enemies[i][j-1]){
                if(enemies[i][j].x - enemies[i][j-1].x < horizontalSeparation && enemies[i][j]){
                    enemies[i][j].x = enemies[i][j-1].x + horizontalSeparation
                }
            }
        }
    }
}