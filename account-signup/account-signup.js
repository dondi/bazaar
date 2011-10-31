/*
 * Companion JavaScript for sample account signup page.
 *
 * Prerequisite: Load jQuery prior to loading this script.
 */
$(function () {
    /* We will be enabling and disabling this form as the
       user types things in.  For convenience, we put logic
       that we will use a lot in their own functions. */
    var updatePasswordMatchMessages = function () {
        // We leave visibility to the validation code.
        $("#password-match").css({ opacity: 0 });
        
        // Update the match message based on equality.
        if ($("#password").val() === $("#password-repeat").val()) {
            $("#password-match")
                .html("Passwords match!")
                .removeClass("requirement")
                .addClass("approval");
        } else {
            $("#password-match")
                .html("Passwords do not match.")
                .removeClass("approval")
                .addClass("requirement");
        }
    },

    validateSignup = function () {
        // Our three conditions for valid signup are:
        //  - non-empty username
        //  - non-empty password
        //  - matching passwords
        updatePasswordMatchMessages();
        if ($("#username").val() && $("#password").val() &&
                $("#password").val() === $("#password-repeat").val()) {
            // All conditions satisfied.  Submission can continue.
            $("#username-prompt, #password-prompt").css({ opacity: 0 });
            $("#password-match").css({ opacity: 1 });
            
            // And, the user can submit.
            $("#submit").removeAttr("disabled");
        } else {
            // Conditions are not satisfied.  Display the appropriate
            // requirements so the user knows what to do.
            if ($("#username").val()) {
                $("#username-prompt").css({ opacity: 0 });
            } else {
                $("#username-prompt").css({ opacity: 1 });
            }
            
            if ($("#password").val()) {
                if ($("#password-repeat").val()) {
                    $("#password-prompt").css({ opacity: 0 });
                    $("#password-match").css({ opacity: 1 });
                } else {
                    $("#password-prompt")
                        .html("Please repeat your password below.")
                        .css({ opacity: 1 });
                    $("#password-match").css({ opacity: 0 });
                }
            } else {
                $("#password-prompt")
                    .html("Please enter a password.")
                    .css({ opacity: 1 });
                $("#password-match").css({ opacity: 0 });
            }

            // And, the user cannot submit.
            $("#submit").attr({ disabled: "disabled" });
        }
    }

    /* HTML5 alert!  "input" is so new jQuery does not have it yet.
       The bind function is the "backdoor" for things like that.
       Note how, with everything placed in validateSignup, we can
       assign handlers in one fell swoop! */
    $("#username, #password, #password-repeat").bind("input", validateSignup);

    $("#cancel").click(function () {
        if (confirm("Are you sure you want to cancel signup?")) {
            window.location = "http://www.google.com/";
        }
    });

    $("#submit").click(function () {
        // If validateSignup does its job, we can go right into
        // assuming that everything is OK when we get here.
        var input = "<p>Name: " + $("#username").val() + "<br />" + "Gender: " + $("input[@name=sex]:checked").val() + "<br />" + "</p>";

        $('body').append(input);

        if ($('input[type=checkbox]:checked').val() === undefined) {
            $('body').append("<p>" + "You have chosen not to receive emails." + "</p>");
        } else {
            $('body').append("<p>" + "You have chosen to receive emails." + "</p>");
        }
    });
});
