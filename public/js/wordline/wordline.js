export default class Wordline {
    constructor(speedKeyboard, correctnessKeyboard, generator, lettersService) {

        this.inputline = $('.inputline');
        this.wordline = $('.wordline');

        this.inputline.val('')

        this.speedKeyboard = speedKeyboard;
        this.correctnessKeyboard = correctnessKeyboard;
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
            let activated = false;

            if (!this.active) {
                this.activate()
                activated = true
            }

            let timeEnd = Date.now()

            console.log(timeEnd - this.timeStart)

            let typedLetter = String.fromCharCode(e.charCode);
            let pair = this.check(typedLetter);
            let isOk = pair[0];
            let lastLetter = pair[1];

            if (isOk && !activated) {
                this.lettersService.setLatencyMs(lastLetter, timeEnd - this.timeStart)
            }
            this.lettersService.setCorrectness(lastLetter, isOk)

            if (!isOk) {
                this.letters.length ? this.highlightMistake() : this.fill();
            }

            this.timeStart = Date.now();
            this.speedKeyboard.updateColors()
            this.correctnessKeyboard.updateColors()

            return isOk
        });

        this.inputline.keydown(e => {
            if (e.keyCode === 8) {
                return false
            }
        })
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
        this.active = false;
    }

    check(letter) {
        let untyped = $(`.${this.untypedClass}`);

        let output = false;
        let lastLetter = untyped.eq(0).text()

        if (letter === lastLetter) {
            untyped.eq(0).removeClass(this.untypedClass);
            output = true;
        }

        if (untyped.length === 0 && letter === ' ') {
            output = false
            this.clean();
        }

        return [output, lastLetter];
    }

    fill() {
        this.letters = this.generator.generate().join(' ');

        let markup = '';
        for (let letter of this.letters) {
            if (cyrillic.includes(letter) || cyrillicCapital.includes(letter))
                markup += `<span class="untyped letter ru">${letter}</span>`
            else
                markup += `<span class="untyped letter">${letter}</span>`
        }

        this.wordline.html(markup);

        setTimeout(() => this.inputline.width(this.wordline.width()), 200)
    }

    setFocus() {
        this.inputline.focus();
    }

    activate() {
        this.active = true
        this.timeStart = Date.now();
    }
}
