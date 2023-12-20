let inputDirection = {x: 0}
let lastDirection = {x: 0}

addEventListener('keydown', e => {
    switch(e.key){
        case 'D':
            if(lastDirection.x !== 1){
                inputDirection.x = 1
            }
            break;
        case 'A':
            if(lastDirection.x !== -1){
                inputDirection.x = -1;
            }
            break;
    }
})

addEventListener('keyup', e => {
    switch(e.key){
        case 'A':
        case 'D':
            if(lastDirection.x !== 0){
                inputDirection.x = 0;
            }
        break;
    }
})

export function getInputDirection(){
    lastDirection = inputDirection;
    return inputDirection;
}