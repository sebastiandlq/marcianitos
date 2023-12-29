import { Enemy } from "./enemy.js"

let horizontalSeparation = 150
let verticalSeparation = 100

let xMargin = 50
let yMargin = 20

export let enemies

export function spawnEnemies(rows, columns){
    enemies = new Array(rows)
    for (let i = 0; i < rows; i++) {
        enemies[i] = new Array(columns)
        for (let j = 0; j < columns; j++) {
            enemies[i][j] = new Enemy(xMargin+j*horizontalSeparation, yMargin+i*verticalSeparation, 5)
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