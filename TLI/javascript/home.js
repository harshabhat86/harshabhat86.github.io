Parse.initialize("vSo04vEpbyviumU65MZFyuaj8zPx0aOhBfpTrAB0",
    "kz4KisAWl3Xc8QRWbgpVU2FrnGoMh5BIL0I3V0c1");

$(document).ready(function () {
    $('#home_Image').height($(window).height());
    $('#home_Image').width($(window).width());

    $('.carousel_image').height($(window).height());
    $('.carousel_image').width($(window).width());

    $(window).on('resize', function () {
        $('.carousel_image').height($(window).height());
        $('.carousel_image').width($(window).width());
        $('#home_Image').height($(window).height());
        $('#home_Image').width($(window).width());


    });


    $("#spotFixes").on("click", function (e) {
        e.preventDefault();

        $("body, html").animate({
            scrollTop: $("#carousel-example-generic").offset().top
        }, 600);
    });

    $("#glyph").on("click", function (e) {
        e.preventDefault();

        $("body, html").animate({
            scrollTop: $("#carousel-example-generic").offset().top
        }, 600);
    });

    $(".success.thumbnail").on("mouseenter", function () {

        $(this).css("background-color", "#1ABC9C");
        $(this).css("color", "#ffffff");
    });


    $(".success.thumbnail").on("mouseleave", function () {

        $(this).css("background-color", "#ffffff");
        $(this).css("color", "rgb(22, 160, 133)");
    });


    $("#loginUsingFb").on("hover", function () {
        $('#loginUsingFb').tooltip('show');
    });

    $("#planASpotFix").on("clicl", function () {

    });

});


