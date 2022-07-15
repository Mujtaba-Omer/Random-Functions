const inputs = document.querySelector('.inputs'),
resetBtn = document.querySelector('button'),
wordHint = document.querySelector('.hint span'),
typingInput = document.querySelector('.typing-input'),
remainGuess = document.querySelector('.remain-guess span'),
wrongLetters = document.querySelector('.wrong-letters span')
let word = '', remaining, wrong = [], correct = []

function randomWord() {
    let randomObj = wordList[Math.floor(Math.random() * wordList.length)]
    word = randomObj.word
    hint = randomObj.hint
    remaining = 8; wrong = []; correct = []
    let option = ''
    for (let i = 0; i < word.length; i++) {
        option += `<input type="text" class="inputLetter" disabled>`
    }
    inputs.innerHTML = option
    wordHint.innerText = hint
    remainGuess.innerText = remaining
    wrongLetters.innerText = ''
}

function initGame(e) {
    key = e.target.value
    if (key.match(/^[A-Za-z]+$/) && !correct.includes(key) && !wrong.includes(` ${key}`)) {
        if (word.includes(key)) {
            for (let i = 0; i < word.length; i++) {
                if (word[i] === key) {
                    inputs.querySelectorAll('input')[i].value = key
                    correct.push(key)
                }
            }
        }
        else{
            wrong.push(` ${key}`)
            remaining--
            remainGuess.innerText = remaining
            wrongLetters.innerText = `${wrong}`
        }
    }
    typingInput.value = ''
    setTimeout(() => {
        if (correct.length === word.length) {
            alert(`Congrats! you find the word ${word.toUpperCase()}`)
            randomWord()
        }
        else if (remaining < 1) {
            for (let i = 0; i < word.length; i++) {
                inputs.querySelectorAll('input')[i].value = word[i]
            }
            return alert("Game Over, You Don't Remaining Guesses")
        }
    })    
}

resetBtn.addEventListener('click', randomWord)
typingInput.addEventListener('input', initGame)
document.addEventListener('keydown', () => typingInput.focus())
randomWord()

