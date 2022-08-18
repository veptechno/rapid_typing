export default class SpeedStats {
    constructor() {
        this.averageMsEl = $('.average-ms');
        this.averageStatsEl = $('.speed-average');
        this.averageStatsEl.text('---');
    }

    updateAverage(lettersService) {
        let averageLatencyMs = lettersService.getAverageLatencyMs();
        this.averageMsEl.text(averageLatencyMs.toFixed(3) + 's')
        this.averageStatsEl.text(Math.round(60 / averageLatencyMs) + ' lps')
    }
}
