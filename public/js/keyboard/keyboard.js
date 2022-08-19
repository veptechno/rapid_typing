export default class Keyboard {

    constructor(lettersService) {
        this.keyboardContainerId = "keyboard-container";
        this.lettersService = lettersService
        this.lettersElements = {}
    }

    updateColors() {
        for (let letter in this.lettersElements) {
            let score = this.lettersService.getScore(letter)
            // let x = score * 10
            // let hue = -0.2443 * x * x * x + 4.37 * x * x + 4.6215 * x - 3.886
            // if (hue < 0) {
            //     hue = 0
            // }
            // if (hue > 240) {
            //     hue = 240
            // }
            let hue = score * 240
            this.lettersElements[letter].style.backgroundColor = "hsl(" + hue + ", 50%, 50%)"
            this.lettersElements[letter].innerText = letter + " " + score.toFixed(1)
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
