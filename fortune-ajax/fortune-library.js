var FortuneLibrary = {
    setupFortuneButton : function (buttonId, outputId, feedbackId, fortuneServiceUrl) {
        var buttonIdSelector = "#" + buttonId,
            outputIdSelector = "#" + outputId,
            feedbackIdSelector = "#" + feedbackId;

        return function () {
            $(buttonIdSelector).click(function () {
                $(feedbackIdSelector).show();
                $.ajax({
                    url : fortuneServiceUrl,
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
