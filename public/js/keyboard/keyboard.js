export default class Keyboard {

    constructor(lettersService) {
        this.keyboardContainerId = "keyboard-container";
        this.lettersService = lettersService
        this.lettersElements = {}
    }

    updateColors() {
        for (let letter in this.lettersElements) {
            let score = this.lettersService.getScore(letter)
            let hue = score * 120
            this.lettersElements[letter].style.backgroundColor = "hsl(" + hue + ", 50%, 50%)"
        }
    }

    generateKeyboard() {
        let letters = this.lettersService.getAllLetters()

        while (letters.length !== 0) {
            let lineLetters = letters.slice(0, lineWidth)
            letters = letters.slice(lineWidth, letters.length)

            this._generateLine(lineLetters)
        }
    }

    _generateLine(letters) {
        let line = document.createElement("div");
        line.className = "keyline"

        letters.forEach(letter => {
            let key = document.createElement("div")
            key.className = "key"
            key.id = letter
            key.innerText = letter

            line.appendChild(key)
            this.lettersElements[letter] = key
        })

        document.getElementById(this.keyboardContainerId).appendChild(line)
    }
}