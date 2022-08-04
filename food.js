import { onSnake, expandSnake } from './snake.js'
import { randomGridPosition } from './grid.js'

const score = document.getElementById("score")

function getRandomFoodPosition(){
    let newFoodPosition
    while(newFoodPosition == null || onSnake(newFoodPosition)){
        newFoodPosition = randomGridPosition()
    }
    return newFoodPosition
}

let food = getRandomFoodPosition()
const expansionRate = 3

let scoreIncrement = 0

export function update(){
    if(onSnake(food)){
        expandSnake(expansionRate)
        scoreIncrement += 10 
        score.innerHTML = 'Score: ' + scoreIncrement
        food = getRandomFoodPosition()
    }
}

export function draw(gameBoard){    
 
    const foodElement = document.createElement('div')
    foodElement.style.gridRowStart = food.y
    foodElement.style.gridColumnStart = food.x
    foodElement.classList.add('food') // to get .snake from css
    gameBoard.appendChild(foodElement)
}

export function onFood(position){
    if(position == food) return true
    return false
}