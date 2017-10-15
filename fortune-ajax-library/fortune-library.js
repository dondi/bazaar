(() => {
    window.FortuneLibrary = {
        setupFortuneButton: (buttonId, outputId, feedbackId, fortuneServiceUrl) => {
            let buttonIdSelector = "#" + buttonId;
            let outputIdSelector = "#" + outputId;
            let feedbackIdSelector = "#" + feedbackId;

            $(buttonIdSelector).click(() => {
                $(outputIdSelector).hide();
                $(feedbackIdSelector).show();
                $.get(fortuneServiceUrl).done(data => {
                    $(outputIdSelector).text(data);
                    $(outputIdSelector).show();
                    $(feedbackIdSelector).hide();
                });
            });

            $([feedbackIdSelector, outputIdSelector].join(",")).hide();
        }
    };
})();
