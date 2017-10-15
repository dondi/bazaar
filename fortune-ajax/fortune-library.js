window.FortuneLibrary = {
    setupFortuneButton: (buttonId, outputId, feedbackId, fortuneServiceUrl) => {
        let buttonIdSelector = "#" + buttonId;
        let outputIdSelector = "#" + outputId;
        let feedbackIdSelector = "#" + feedbackId;

        return () => {
            $(buttonIdSelector).click(() => {
                $(feedbackIdSelector).show();
                $.get(fortuneServiceUrl).done(data => {
                    $(outputIdSelector).html(data);
                    $(feedbackIdSelector).hide();
                });
            });

            $(feedbackIdSelector).hide();
        };
    }
};
