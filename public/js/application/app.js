import Keyboard from "../keyboard/keyboard";
import LettersService from "../letters/letters_service";
import WordGenerator from "../wordline/word_generator";
import Wordline from "../wordline/wordline";

export default class Application {
    constructor() {
        this.lettersService = new LettersService()
        this.keyboard = new Keyboard(this.lettersService)
        this.wordGenerator = new WordGenerator(this.lettersService)
        this.wordLine = new Wordline(this.keyboard, this.wordGenerator, this.lettersService)

        this._init()
    }

    _init() {
        this.keyboard.generateKeyboard()
        this.keyboard.updateColors()

        this.wordLine.fill()
    }
}