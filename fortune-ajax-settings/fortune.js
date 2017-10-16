(() => {
    window.FortuneLibrary.setupFortuneButton({
        buttonId: "getFortuneButton",
        outputId: "fortune",
        feedbackId: "loadingFeedbackElement",
        fortuneServiceUrl: "http://javascript.cs.lmu.edu/php/fortune.php"
    });
})();
