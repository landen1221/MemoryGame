const btn = document.querySelector('button')
btn.addEventListener('click', button)

function button() {
  if (btn.innerText === 'Start Game') {
    startGame()
    btn.innerText = 'Restart Game'
  } else {
    location.reload()
  }
}


function startGame() {
  const gameContainer = document.getElementById("game");
  let visibleScore = document.querySelector('p')

  console.log(btn.innerText)

  let score = 0
  function showScore() {
    visibleScore.innerText = "Score: " + score
  }

  const COLORS = [
    "red",
    "blue",
    "green",
    "orange",
    "purple",
    "red",
    "blue",
    "green",
    "orange",
    "purple"
  ];

  // here is a helper function to shuffle an array
  // it returns the same array with values shuffled
  // it is based on an algorithm called Fisher Yates if you want ot research more
  function shuffle(array) {
    let counter = array.length;

    // While there are elements in the array
    while (counter > 0) {
      // Pick a random index
      let index = Math.floor(Math.random() * counter);

      // Decrease counter by 1
      counter--;

      // And swap the last element with it
      let temp = array[counter];
      array[counter] = array[index];
      array[index] = temp;
    }

    return array;
  }

  let shuffledColors = shuffle(COLORS);

  // this function loops over the array of colors
  // it creates a new div and gives it a class with the value of the color
  // it also adds an event listener for a click for each card
  function createDivsForColors(colorArray) {
    let x = 0
    for (let color of colorArray) {
      // create a new div
      const newDiv = document.createElement("div");

      // give it a class attribute for the value we are looping over
      newDiv.classList.add(color);
      newDiv.style.backgroundColor = 'white'
      newDiv.id = x
      x++

      // call a function handleCardClick when a div is clicked on
      newDiv.addEventListener("click", handleCardClick);

      // append the div to the element with an id of game
      gameContainer.append(newDiv);
    }
  }

  // TODO: Implement this function!
  let curColor = ''
  let prevID = ""
  let tries = 0

  function handleCardClick(event) {
    score++
    showScore()
    var color = changeColor(event)

    if (tries%2 === 0) {
      curColor = color
      prevID = event.target.id
    } else if (color !== curColor) {
      console.log("No Match")
      document.body.classList.toggle('noPoint')
      setTimeout(function() {
        // change current element & previous id back to white
        changeColor(event)
        
        let prevColor = document.getElementById(prevID)
        prevColor.style.backgroundColor = 'white'
        document.body.classList.toggle('noPoint')
      }, 1000)
      

    } else {
      console.log(`success`)
      
    }
    let divs = document.querySelectorAll('div')
    

    tries++
    
    // you can use event.target to see which element was clicked
    // console.log("you just clicked", event.target);
  }


  function changeColor(e) {
    if (!e.target.style.backgroundColor){
      let color = e.target.classList[0]
      e.target.style.backgroundColor = color
      
      return color
    
    } else if (e.target.style.backgroundColor === 'white') {
      let color = e.target.classList[0]
      e.target.style.backgroundColor = color
      
      return color

    } else {
      e.target.style.backgroundColor = 'white'
    }
  }

  function match(color) {
    let divs = document.querySelectorAll('div')

    for (let div of divs) {
      if (div.classList[0] === color) {
        div.style.backgroundColor = color
      }
    }

  }

  // when the DOM loads
  createDivsForColors(shuffledColors);
}
