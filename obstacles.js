import { onSnake, expandSnake } from './snake.js'

let obstacle = []
const gridSize = 45

export function getRandomObstaclePosition(){
    for(let i = 0; i < 60; i++)
    obstacle.push({x: Math.floor(Math.random() * gridSize) + 1,
        y: Math.floor(Math.random() * gridSize) + 1})
}

export function update(){
    if(onSnake(food)){
        expandSnake(expansionRate)
        food = getRandomFoodPosition()
    }
}

export function draw(gameBoard){    
    obstacle.forEach(segment => {
        const obstacleElement = document.createElement('div')
        obstacleElement.style.gridRowStart = segment.y
        obstacleElement.style.gridColumnStart = segment.x
        obstacleElement.classList.add('obstacles') // to get .snake from css
        gameBoard.appendChild(obstacleElement)
    })
}

export function hitObstacle(position){
    return obstacle.some(segment =>{
        return equalPositions(segment, position)
    })
}

function equalPositions(pos1, pos2){
    return pos1.x === pos2.x && pos1.y === pos2.y 
}