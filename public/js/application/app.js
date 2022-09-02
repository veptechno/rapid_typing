import SpeedKeyboard from "../keyboard/speed_keyboard";
import CorrectnessKeyboard from "../keyboard/correctness_keyboard";
import LettersService from "../letters/letters_service";
import WordGenerator from "../wordline/word_generator";
import Wordline from "../wordline/wordline";

export default class Application {
    constructor() {
        this.lettersService = new LettersService()
        this.speedKeyboard = new SpeedKeyboard(this.lettersService)
        this.correctnessKeyboard = new CorrectnessKeyboard(this.lettersService)
        this.wordGenerator = new WordGenerator(this.lettersService)
        this.wordLine = new Wordline(this.speedKeyboard, this.correctnessKeyboard, this.wordGenerator, this.lettersService)

        this._init()
    }

    _init() {
        this.speedKeyboard.generateKeyboard()
        this.speedKeyboard.updateColors()
        this.correctnessKeyboard.generateKeyboard()
        this.correctnessKeyboard.updateColors()

        this.wordLine.fill()
    }
}