export default class ErrorStats {
    constructor() {
        this.averageStatsEl = $('.error-average');
        this.averageStatsEl.text('0.00%');
    }

    updateAverage(lettersService) {
        this.averageStatsEl.text(lettersService.getAverageCorrectness().toFixed(2) + '%');
    }
}
