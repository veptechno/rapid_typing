import ErrorStats from "../wordline/error_stats";
import SpeedStats from "../wordline/speed_stats";

export default class LettersService {

    constructor() {
        this.letters = initialLetters;
        this.errorStats = new ErrorStats()
        this.speedStats = new SpeedStats()

        this._load()
        let newLettersLatencyMs = {}
        let newLettersCorrectness = {}
        this.letters.forEach(letter => {
            if (this.lettersCorrectness.hasOwnProperty(letter)) {
                newLettersCorrectness[letter] = this.lettersCorrectness[letter]
            } else {
                newLettersCorrectness[letter] = Array(lettersServiceSize).fill(false)
            }

            if (this.lettersLatencyMs.hasOwnProperty(letter)) {
                newLettersLatencyMs[letter] = this.lettersLatencyMs[letter]
            } else {
                newLettersLatencyMs[letter] = Array(lettersServiceSize).fill(maxLetterLatencyMs)
            }
        })
        this.lettersLatencyMs = newLettersLatencyMs
        this.lettersCorrectness = newLettersCorrectness

        this._refresh()
    }

    getAllLetters() {
        return this.letters
    }

    setLatencyMs(letter, latencyMs) {
        if (!this.lettersCorrectness.hasOwnProperty(letter)) {
            console.log(letter)
            return
        }

        if (latencyMs > maxLetterLatencyMs) {
            latencyMs = maxLetterLatencyMs
        }

        this.lettersLatencyMs[letter].shift()
        this.lettersLatencyMs[letter].push(latencyMs)
        this._save()
    }

    setCorrectness(letter, correctness) {
        if (!this.lettersCorrectness.hasOwnProperty(letter)) {
            console.log(letter)
            return
        }

        this.lettersCorrectness[letter].shift()
        this.lettersCorrectness[letter].push(correctness)
        this._save()
    }

    getWorstLetters(count) {
        let letters = this._shuffle(this.letters);
        letters.sort((a, b) => this.getScore(a) - this.getScore(b))
        return letters.slice(0, count)
    }

    getRandomLetters(count) {
        return this._shuffle(this.letters).slice(0, count)
    }

    getScore(letter) {
        let latencyScore = this._getLatencyScore(letter)
        let correctnessScore = this._getCorrectnessScore(letter) / 2
        return Math.sqrt(latencyScore * latencyScore + correctnessScore * correctnessScore) / Math.sqrt(1.25)
        // return latencyScore * correctnessScore * 2
    }

    getAverageCorrectness() {
        let sum = .0
        let count = 0
        for (let letter in this.lettersCorrectness) {
            let trueCount = 0
            this.lettersCorrectness[letter].forEach(correctness => {
                if (correctness) trueCount++
            })
            sum += trueCount / this.lettersCorrectness[letter].length * 100
            count++
        }

        return sum / count
    }

    getAverageLatencyMs() {
        let sum = .0
        let count = .0
        for (let letter in this.lettersLatencyMs) {
            this.lettersLatencyMs[letter].forEach(latencyMs => {
                sum += latencyMs
                count++
            })
        }

        return sum / count / 1000.0
    }

    _getLatencyScore(letter) {
        if (!this.lettersLatencyMs.hasOwnProperty(letter)) {
            console.log(letter)
            return
        }

        let averageLatencyMs = this.lettersLatencyMs[letter].reduce((a, b) => a + b, 0) / this.lettersLatencyMs[letter].length

        let lps = 60000 / averageLatencyMs
        return (-0.000002406881 * lps * lps * lps  + 0.001766098485 * lps * lps - 0.073611111111 * lps + 0.636363636383) / 100
        // return 1 - averageLatencyMs / maxLetterLatencyMs
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

    _shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            let temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }

        return array;
    }

    _save() {
        window.localStorage.setItem("lettersCorrectness", JSON.stringify(this.lettersCorrectness))
        window.localStorage.setItem("lettersLatencyMs", JSON.stringify(this.lettersLatencyMs))
        this._refresh()
    }

    _load() {
        this.lettersCorrectness = JSON.parse(window.localStorage.getItem("lettersCorrectness"))
        this.lettersLatencyMs = JSON.parse(window.localStorage.getItem("lettersLatencyMs"))
    }

    _refresh() {
        this.speedStats.updateAverage(this)
        this.errorStats.updateAverage(this)
    }
}
