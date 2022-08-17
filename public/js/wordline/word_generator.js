export default class WordGenerator {

    constructor(lettersService) {
        this.lettersService = lettersService
    }

    generate() {
        let letters = this.lettersService.getWorstLetters(differentLettersCountInOneLine)
        let words = []

        for (let i = 0; i < wordCount; i++) {
            words.push(this._generateWord(letters).join(''))
        }

        return words
    }

    _generateWord(letters) {
        let wordLength = this._rand(minWordLength, maxWordLength)
        let word = []

        for (let i = 0; i < wordLength; i++) {
            word.push(this._randElement(letters))
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