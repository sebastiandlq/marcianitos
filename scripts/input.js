let inputDirection = {x: 0}
let lastDirection = {x: 0}


const LEFT_BUTTON = document.querySelector('#left')
const RIGHT_BUTTON = document.querySelector('#right')

addEventListener('keydown', e => {
    switch(e.key){
        case 'D':
        case 'd':
        case 'ArrowRight':
            moveRight()
            break;
        case 'A':
        case 'a':
        case 'ArrowLeft':
            moveLeft()
            break;
    }
})

addEventListener('keyup', e => {
    switch(e.key){
        case 'A':
        case 'D':
        case 'd':
        case 'ArrowRight':
        case 'a':
        case 'ArrowLeft':
            stopMoving()
        break;
    }
})

function moveRight(){
    if(lastDirection.x !== 1){
        inputDirection.x = 1
    }
}
function moveLeft(){
    if(lastDirection.x !== -1){
        inputDirection.x = -1;
    }
}
function stopMoving(){
    if(lastDirection.x !== 0){
        inputDirection.x = 0;
    }
}

LEFT_BUTTON.addEventListener('mousedown', moveLeft)
RIGHT_BUTTON.addEventListener('mousedown', moveRight)
LEFT_BUTTON.addEventListener('mouseup', stopMoving)
RIGHT_BUTTON.addEventListener('mouseup', stopMoving)


export function getInputDirection(){
    lastDirection = inputDirection;
    return inputDirection;
}