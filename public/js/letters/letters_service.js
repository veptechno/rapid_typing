export default class LettersService {

    constructor() {
        this.letters = initialLetters;

        this.lettersCorrectness = {}
        this.lettersLatencyMs = {}
        this.letters.forEach(letter => {
            this.lettersCorrectness[letter] = Array(lettersServiceSize).fill(false)
            this.lettersLatencyMs[letter] = Array(lettersServiceSize).fill(maxLetterLatencyMs)
        })
    }

    getAllLetters() {
        return this.letters
    }

    setLatencyMs(letter, latencyMs) {
        if (!this.lettersCorrectness.hasOwnProperty(letter)) {
            console.log(letter)
            return
        }

        this.lettersLatencyMs[letter].shift()
        this.lettersLatencyMs[letter].push(latencyMs)
    }

    setCorrectness(letter, correctness) {
        if (!this.lettersCorrectness.hasOwnProperty(letter)) {
            console.log(letter)
            return
        }

        this.lettersCorrectness[letter].shift()
        this.lettersCorrectness[letter].push(correctness)
    }

    getWorstLetters(count) {
        this.letters.sort((a, b) => this.getScore(a) - this.getScore(b))
        return this.letters.slice(0, count)
    }

    getScore(letter) {
        let latencyScore = this._getLatencyScore(letter)
        let correctnessScore = this._getCorrectnessScore(letter)
        return Math.sqrt(latencyScore * latencyScore + correctnessScore * correctnessScore) / Math.sqrt(2)
    }

    _getLatencyScore(letter) {
        if (!this.lettersLatencyMs.hasOwnProperty(letter)) {
            console.log(letter)
            return
        }

        let averageLatencyMs = this.lettersLatencyMs[letter].reduce((a, b) => a + b, 0) / this.lettersLatencyMs[letter].length

        return 1 - averageLatencyMs / maxLetterLatencyMs
    }

    _getCorrectnessScore(letter) {
        if (!this.lettersCorrectness.hasOwnProperty(letter)) {
            console.log(letter)
            return
        }

        let score = .0
        let scorePartition = 1.0 / lettersServiceSize
        this.lettersCorrectness[letter].forEach(correctness => {
            if (correctness)
                score += scorePartition
        })

        return score
    }
}
