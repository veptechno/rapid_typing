export default class WordGenerator {

    constructor(lettersService) {
        this.lettersService = lettersService
    }

    generate() {
        let worstLetters = this.lettersService.getWorstLetters(worstLettersCountInOneLine)
        let randomLetters = this.lettersService.getRandomLetters(randomLettersCountInOneLine)
        let letters = Array.from(new Set([...worstLetters, ...randomLetters]))
        let words = []

        for (let i = 0; i < wordCount; i++) {
            words.push(this._generateWord(letters).join(''))
        }

        return words
    }

    _generateWord(letters) {
        let wordLength = this._rand(minWordLength, maxWordLength)
        let word = []

        let previousLetter = ''
        for (let i = 0; i < wordLength; i++) {
            let letter = previousLetter
            while (letter === previousLetter) {
                letter = this._randElement(letters)
            }
            word.push(letter)
            previousLetter = letter
        }

        return word
    }

    _randElement(letters) {
        return letters[Math.floor(Math.random() * letters.length)]
    }

    _rand(low, high) {
        return Math.floor((high - low + 1) * Math.random()) + Math.floor(low)
    }
}
