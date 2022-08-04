import{ update as updateSnake, draw as drawSnake, getSnakeHead, snakeIntersection} from './snake.js'
import{ update as updateFood, draw as drawFood} from './food.js'
import{ outsideGrid } from './grid.js'
import{ hitObstacle, getRandomObstaclePosition, draw as drawObstacles } from './obstacles.js'

let lastRenderTime = 0
let gameOver = false
const gameBoard = document.getElementById("game-board")
const obstacleBtn = document.getElementById("create-obstacles")
const startBtn = document.getElementById("start")

const sliderSpeed = document.getElementById("speedRange")
const outputSpeed = document.getElementById("speed-disp")

outputSpeed.innerHTML = sliderSpeed.value + 'x'

let snakeSpeed = sliderSpeed.value

sliderSpeed.oninput = function(){
  snakeSpeed = this.value
  outputSpeed.innerHTML = this.value + 'x'
}

obstacleBtn.addEventListener('click', function()
{
    getRandomObstaclePosition()
})

let flag = 0

startBtn.addEventListener('click', function(){
    flag = 1
    disable()
})
    
function main(currentTime){ // currentTime gives sys time at which this fn executes
    if(gameOver){
        enable()
        if(confirm('you lost. press ok to restart.')){
            window.location = '/'
        }
        return
    }
    window.requestAnimationFrame(main)
    const secondSinceLastRender = (currentTime - lastRenderTime) / 1000 // div by 1000 to get ms
    if(secondSinceLastRender < 1 / snakeSpeed) return // snakeSpeed times per second
    lastRenderTime = currentTime
    console.log('render')
    if(flag) update()
    draw()
}

window.requestAnimationFrame(main)

function update(){
    updateSnake()
    updateFood()
    checkDeath()
}

function draw(){
    gameBoard.innerHTML = ''
    drawSnake(gameBoard)
    drawFood(gameBoard)
    drawObstacles(gameBoard)
}

function checkDeath(){
    gameOver = outsideGrid(getSnakeHead()) || snakeIntersection() || hitObstacle(getSnakeHead())
}

function disable(){
    obstacleBtn.disabled = true
    startBtn.disabled = true
    sliderSpeed.disabled = true
}

function enable(){
    obstacleBtn.disabled = false
    startBtn.disabled = false
    sliderSpeed.disabled = false
}