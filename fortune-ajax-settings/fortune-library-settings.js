var FortuneLibrary = {
    setupFortuneButton : function (settings) {
        var buttonIdSelector = "#" + settings.buttonId,
            outputIdSelector = "#" + settings.outputId,
            feedbackIdSelector = "#" + settings.feedbackId;

        return function () {
            $(buttonIdSelector).click(function () {
                $(feedbackIdSelector).show();
                $.ajax({
                    url : settings.fortuneServiceUrl,
                    success : function (data) {
                        $(outputIdSelector).html(data);
                        $(feedbackIdSelector).hide();
                    }
                });
            });

            $(feedbackIdSelector).hide();
        };
    }
};
