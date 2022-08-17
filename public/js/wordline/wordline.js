
import Keyboard from '../keyboard/keyboard';
import WordGenerator from "./word_generator";

export default class Wordline {
    constructor(keyboard, generator, lettersService) {

        this.inputline = $('.inputline');
        this.wordline = $('.wordline');

        this.inputline.val('')

        this.keyboard = keyboard;
        this.generator = generator;
        this.lettersService = lettersService;
        this.letters = '';

        this.untypedClass = 'untyped';
        this.wrongClass = 'wrong';

        this.bindEvents();

        this.active = false
        this.timeStart = Date.now();
    }

    bindEvents() {
        this.inputline.off();

        this.inputline.keypress(e => {
            if (!this.active && e.keyCode === 13) {
                this.activate()
                return
            }

            let timeEnd = Date.now()

            let letter = String.fromCharCode(e.charCode);
            let isOk = this.check(letter);

            this.lettersService.setLatencyMs(letter, timeEnd - this.timeStart)
            this.lettersService.setCorrectness(letter, isOk)

            if (!isOk) {
                this.letters.length ? this.highlightMistake() : this.fill();
            }

            this.timeStart = Date.now();
            this.keyboard.updateColors()
        });
    }

    highlightMistake() {
        let untyped = $(`.${this.untypedClass}`);

        untyped.addClass(this.wrongClass)
        this.inputline.addClass(this.wrongClass);

        setTimeout(() => {
            this.inputline.removeClass(this.wrongClass)
            untyped.removeClass(this.wrongClass)
        }, 200);

        // this.errorCounter.up();

        return false
    }

    clean() {
        this.letters = [];
        this.wordline.text('');
        this.inputline.val('');
    }

    check(letter) {
        let untyped = $(`.${this.untypedClass}`);

        let output = false;

        if (letter == untyped.eq(0).text()) {
            untyped.eq(0).removeClass(this.untypedClass);
            output = true;
        }

        if (untyped.length == 0 && letter == ' ') {
            output = false
            this.clean();
        }

        return output;
    }

    fill() {
        this.letters = this.generator.generate().join(' ');

        let markup = '';
        for (let letter of this.letters)
            markup += `<span class="untyped letter">${letter}</span>`

        this.wordline.html(markup);

        this.inputline.width(this.wordline.width());
    }

    setFocus() {
        this.inputline.focus();
    }

    activate() {
        this.active = true
        this.timeStart = Date.now();
    }
}
