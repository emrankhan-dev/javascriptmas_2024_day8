// The keyboard has been rendered for you
import { renderKeyboard } from '/keyboard'

// Event Listeners 
document.getElementById('keyboard-container').addEventListener('click', checkGuess)

document.getElementById('new-game').addEventListener('click', function() {
    location.reload()
}) 

// Some useful DOM elements
const guessContainer = document.getElementById('guess-container')
const snowmanParts = document.getElementsByClassName('snowman-part')
const sunglasses = document.querySelector('.sunglasses')
const puddle = document.querySelector('.puddle')

// Game State 
const word = "home"
let guesses = 6
const guessArr = Array(word.length).fill("-")
// Fucntions 
function updateSnowman() {
    const partsIndex = 6 - guesses
    if(partsIndex < snowmanParts.length) {
        snowmanParts[partsIndex].style.display = "none"
    } 
    
    if(guesses === 0) {
        Array.from(snowmanParts).forEach(part => {
            part.style.display = "none"
        })
        puddle.style.display = "block"
    }
}

function renderGuess() {
    const guessHtml = guessArr.map((char) => {
        return `<div class="guess-char">${char}</div>`
    })
    guessContainer.innerHTML = guessHtml.join("")
}

function checkGuess(e) {
    if(guesses <= 0 || guessArr.join('') === word) return
    let letter = e.target.textContent.toLowerCase()
    let isMatch = false
    for(let i = 0; i < word.length; i++) {
        if(word[i].includes(letter)) {
            guessArr[i] = letter
            isMatch = true
        }
    }
    
    if(!isMatch) {
        guesses--
        console.log(guesses)
        updateSnowman()
    }
    
    if(guessArr.join('') === word) {
        guessContainer.innerHTML = "<h2>You win</h2>"
        sunglasses.style.display = "block"
        Array.from(snowmanParts).forEach(part => {
            part.style.display = "block"
        })
        
    } else if (guesses === 0){
        guessContainer.innerHTML = "<h2>You Lose</h2>"
        updateSnowman()
        
    } else {
        renderGuess()
    }
}

// Initial Reander 
renderGuess()
renderKeyboard()


