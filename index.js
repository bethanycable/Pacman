const width = 28
const grid = document.querySelector('.grid')
const scoreDisplay = document.getElementById('score')
let squares = []
let score = 0
let pacDots = 0
let powerPellets = 0

// 0 - pac-dots
// 1 - wall
// 2 - ghost-lair
// 3 - power-pellet
// 4 - empty
const layout = [ 
    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,3,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,3,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,1,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,4,4,4,4,4,4,4,4,4,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,1,1,1,2,2,1,1,1,4,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,1,1,2,2,2,2,1,1,4,1,1,0,1,1,1,1,1,1,
    4,4,4,4,4,4,0,0,0,4,1,1,2,2,2,2,1,1,4,0,0,0,4,4,4,4,4,4,
    1,1,1,1,1,1,0,1,1,4,1,1,1,1,1,1,1,1,4,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,4,4,4,4,4,4,4,4,4,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,1,0,1,1,1,1,1,1,0,1,1,1,0,1,1,1,1,1,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,3,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,3,1,
    1,1,1,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,0,1,1,1,
    1,1,1,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,0,1,1,1,
    1,0,0,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,0,0,1,
    1,0,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,1,
    1,0,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1  
]

//creating board
function createBoard() {
  for(let i = 0; i < layout.length; i++) {
    //creating a square
    const square = document.createElement('div')

    //putting square in board
    grid.appendChild(square)

    //put square into squares array
    squares.push(square)

    if(layout[i] === 0) {
      squares[i].classList.add('pac-dot')
      pacDots++
    } else if(layout[i] === 1) {
      squares[i].classList.add('wall')
    }  else if(layout[i] === 2) {
      squares[i].classList.add('ghost-lair')
    } else if(layout[i] === 3) {
      squares[i].classList.add('power-pellet')
      powerPellets++
    }
  }
}
createBoard()
console.log(pacDots, powerPellets)
//Pacman starting position
let pacmanCurrentIndex =  434

squares[pacmanCurrentIndex].classList.add('pacman')
scoreDisplay.innerHTML = score

function control(e) {
  squares[pacmanCurrentIndex].classList.remove('pacman')

  switch(e.keyCode) { //repl doesn't seem to support event.key
    case 40:
    if(
      !squares[pacmanCurrentIndex + width].classList.contains('ghost-lair') &&
      !squares[pacmanCurrentIndex + width].classList.contains('wall') &&
      pacmanCurrentIndex + width < width * width
      ) 
      pacmanCurrentIndex += width
    break

    case 39:
    if(
      !squares[pacmanCurrentIndex + 1].classList.contains('ghost-lair') &&
      !squares[pacmanCurrentIndex + 1].classList.contains('wall') &&
      pacmanCurrentIndex % width < width - 1
      ) 
      pacmanCurrentIndex +=1

    if(pacmanCurrentIndex === 391)
      pacmanCurrentIndex = 364
    break

    case 38:
    if(
      !squares[pacmanCurrentIndex - width].classList.contains('ghost-lair') &&
      !squares[pacmanCurrentIndex - width].classList.contains('wall') &&
      pacmanCurrentIndex - width >= 0
      )
      pacmanCurrentIndex -= width
    break

    case 37: 
    if(
      !squares[pacmanCurrentIndex - 1].classList.contains('ghost-lair') &&
      !squares[pacmanCurrentIndex - 1].classList.contains('wall') &&
      pacmanCurrentIndex % width !== 0
      ) 
      pacmanCurrentIndex -= 1

    if(pacmanCurrentIndex === 364)
      pacmanCurrentIndex = 391
    break
  }
  squares[pacmanCurrentIndex].classList.add('pacman')
  pacDotEaten()
  powerPelletsEaten()
  checkForWin()
  checkForGameOver()
}
document.addEventListener('keyup', control)

//function keeps track of the pacdots eatin by the Pac-Man
function pacDotEaten() {
    //Check if that index holds a class of pac-dot, if so add to score
    if(squares[pacmanCurrentIndex].classList.contains('pac-dot')) {
      squares[pacmanCurrentIndex].classList.remove('pac-dot')
      score++
      scoreDisplay.innerHTML = score
    }
}

function powerPelletsEaten() {
  //if square pacman is in contains power pellet
  if(squares[pacmanCurrentIndex].classList.contains('power-pellet')) {
    squares[pacmanCurrentIndex].classList.remove('power-pellet')
    //add a score of 10 
    score += 10
    scoreDisplay.innerHTML = score;
    //change each of the four ghosts to isScared
    ghosts.forEach(ghost => ghost.isScared = true)
    
    //use setTimeout to unscare ghosts after 10 seconds
    setTimeout(unScareGhosts, 10000)
  }
}

function unScareGhosts() {
  //When the time runs out for scared ghosts, switch the class back to unScared
  ghosts.forEach(ghost => ghost.isScared = false)
}

function getCoordinates (index) {
  //looking for the current coordinates of 
  return [index % width, Math.floor(index / width)]
}

class Ghost {
  constructor(className, startIndex, speed) {
    this.className = className
    this.startIndex = startIndex
    this.speed = speed
    this.currentIndex = startIndex
    this.isScared = false
    this.timerId = NaN
  }
}

const ghosts = [
  new Ghost('blinky', 348, 250),
  new Ghost('pinky', 376, 400),
  new Ghost('inky', 351, 300),
  new Ghost('clyde', 379, 500)
]

//insert ghosts into grid
ghosts.forEach(ghost => {
    squares[ghost.currentIndex].classList.add(ghost.className)
    squares[ghost.currentIndex].classList.add('ghost')
})

//move the ghosts
ghosts.forEach(ghost => moveGhost(ghost))

function moveGhost(ghost) {
  const directions = [-1, +1, -width, +width]
  let direction = directions[Math.floor(Math.random() * directions.length)]

  ghost.timerId = setInterval(function() {
    //if the next square does not contain a wall and does not contain a ghost
    if(
      !squares[ghost.currentIndex + direction].classList.contains('wall') &&
      !squares[ghost.currentIndex + direction].classList.contains('ghost')
      ) {
         //remove ghost class
        squares[ghost.currentIndex].classList.remove(ghost.className)
        squares[ghost.currentIndex].classList.remove('ghost', 'scared-ghost')

        //create variables to hold coordinates for checks
        const[ghostX, ghostY] = getCoordinates(ghost.currentIndex)
        const[pacmanX, pacmanY] = getCoordinates(pacmanCurrentIndex)
        const[ghostNewX, ghostNewY] = getCoordinates(ghost.currentIndex + direction)

        //create an x coordinate function
        function isXCoordCloser() {
          if(Math.abs(ghostNewX - pacmanX) < Math.abs(ghostX - pacmanX)) {
              return true
          } else {
            return false
          }
        } 

        //create a Y coordinate function 
        function isYCoordCloser() {
          if(Math.abs(ghostNewY - pacmanY) < Math.abs(ghostY - pacmanY)) {
              return true
          } else {
            return false
          }
        }

        //   if(!squares[ghost.currentIndex + direction].classList.contains('ghost-lair')) {
        //     direction = directions[Math.floor(Math.random() * directions.length)]
        //   } else {
        //   }

        //checking the coordinates of the ghosts against pacman
        if(isXCoordCloser() || isYCoordCloser() ) {
          //add direction to current Index
          ghost.currentIndex += direction;

          //add ghost class
          squares[ghost.currentIndex].classList.add(ghost.className)
          squares[ghost.currentIndex].classList.add('ghost') 
        } else {
          direction = directions[Math.floor(Math.random() * directions.length)]
          //add ghost class
          squares[ghost.currentIndex].classList.add(ghost.className)
          squares[ghost.currentIndex].classList.add('ghost')
        }

    } else {
      direction = directions[Math.floor(Math.random() * directions.length)]
    }

    //if ghost is currently scared
    if(ghost.isScared) {
      squares[ghost.currentIndex].classList.add('scared-ghost')
    }

    //if the ghost is currently scared AND pacman is on it
    if(ghost.isScared && squares[ghost.currentIndex].classList.contains('pacman')) {
      //remove classnames - ghost.classname, 'ghost', 'scared-ghost'
      squares[ghost.currentIndex].classList.remove(ghost.className, 'ghost', 'scared-ghost')
      //change ghosts currentindex to its startIndex
      ghost.currentIndex = ghost.startIndex
      //add a score of 100 points
      score += 100
      scoreDisplay.innerHTML = score
      //re-add classnames of ghost.className and 'ghost' to the ghsots new position
      squares[ghost.currentIndex].classList.add(ghost.className, 'ghost')
    }
    checkForGameOver()

  }, ghost.speed )
}

//Check for a game over 
function checkForGameOver() {
  //if the square pacmane is in contains a ghost AND square does not contain scared ghost
  if(
    squares[pacmanCurrentIndex].classList.contains('ghost') && 
    !squares[pacmanCurrentIndex].classList.contains('scared-ghost')
    ) {
    //for each ghost - we need to stop it moving
    ghosts.forEach(ghost => clearInterval(ghost.timerId))
    //remove addeventlistener from out control function
    document.removeEventListener('keyup', control)
    //tell the user the game is over
    scoreDisplay.innerHTML = "You LOSE!"
    }
}

//checking for a win
function checkForWin() {
  let finalCount = pacDots + powerPellets
  if(score === finalCount) {
    //stop each ghost moving
    ghosts.forEach(ghost => clearInterval(ghost.timerId))
    //remove eventListener for the control function
    document.removeEventListener('keyup', control)
    //tell the user they have won
    scoreDisplay.innerHTML = "YOU WON!"
  }
}


