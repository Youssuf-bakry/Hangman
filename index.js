let letters = "abcdefghijklmnopqrstuvwxyz";
let lettersArray = Array.from(letters);
let lettersContainer = document.querySelector(".letters");

// generating the keyboard letters

let buttons = lettersArray.forEach((letter) => {
  let span = document.createElement("span");

  let theLetter = document.createTextNode(letter);
  span.appendChild(theLetter);

  span.className = "letter-box";

  lettersContainer.appendChild(span);
});

// buttons.addEventListener("click", (e) => {
//   e.target.addClassList = "inactive";
// });

const words = {
  Countries: ["egypt", "syria", "jordan", "yemen"],
  "Sah'aba": ["omar", "abu bakr", "othman", "ali", "talha", "moaz", "saad"],
  Scholars: ["alnawawi", "albokhari", "moslem"],
};

//get random property

let allKeys = Object.keys(words);

let randomPropNumber = Math.floor(Math.random() * allKeys.length);
let randomPropName = allKeys[randomPropNumber];
let randomPropValue = words[randomPropName];

let randomValueNo = Math.floor(Math.random() * randomPropValue.length);
let randomValueValue = randomPropValue[randomValueNo];
// console.log(randomValueValue);

//set category info

document.querySelector(".game-info span").innerHTML = randomPropName;

// letters guess element
let lettersGuessContainer = document.querySelector(".letters-guess");

// convert chosen word to array

let lettersAndSpace = Array.from(randomValueValue);
// console.log(lettersAndSpace);

//Create spans depending on words
lettersAndSpace.forEach((letter) => {
  //create empty span for the space if exists
  let emptySpan = document.createElement("span");

  if (letter === " ") {
    emptySpan.className = "with-space";
  }

  // adding the span to the letters guess container

  lettersGuessContainer.appendChild(emptySpan);
});
//select guess spans'
let guessSpans = document.querySelectorAll(".letters-guess span");

//set wrong attemts

let wrongAttempts = 0;

//select the draw elemetn
let rightClicked = [];

let theDraw = document.querySelector(".hangman-draw");
// HANDLING letters clicking
document.addEventListener("click", (e) => {
  //set the guess status
  let theStatus = false;
  if (e.target.className === "letter-box") {
    e.target.classList.add("clicked");

    //get the clicked
    let theClicked = e.target.innerHTML.toLowerCase();
    //the chosen word

    lettersAndSpace.forEach((wordLetter, index) => {
      if (theClicked == wordLetter) {
        //SET STATUS CORRECT
        theStatus = true;
        rightClicked.push(theClicked);
        // e.target.classList.add("trueLetter");
        // loop over guses spans
        guessSpans.forEach((span, spanIndex) => {
          if (index === spanIndex) {
            span.innerHTML = theClicked;
          }
        });
      }
    });

    if (theStatus !== true) {
      wrongAttempts++;
      theDraw.classList.add(`wrong-${wrongAttempts}`);

      //*play fail sound (not added yet)
      if (wrongAttempts === 8) {
        endGame();

        lettersContainer.classList.add("finished");
      }
    }
    // let allTrue = document.querySelectorAll(".trueLetter");
    if (theStatus === true && rightClicked.length === lettersAndSpace.length) {
      successGame();

      lettersContainer.classList.add("finished");
    }
  }
});
let divText;
function successGame() {
  let div = document.createElement("div");
  if (wrongAttempts > 0) {
    divText = document.createTextNode(
      `Congratulations you consume only ${wrongAttempts} wrong trial out of 8`
    );
  } else {
    divText = document.createTextNode(
      `Awesome You didn't consume any wrong Trials ! Congratulations`
    );
  }
  div.appendChild(divText);

  div.className = "popup";

  document.body.appendChild(div);
}

function endGame() {
  let div = document.createElement("div");

  let divText = document.createTextNode(
    `Game Over, The word was ${randomValueValue}`
  );

  div.appendChild(divText);

  div.className = "popup";

  document.body.appendChild(div);
}
