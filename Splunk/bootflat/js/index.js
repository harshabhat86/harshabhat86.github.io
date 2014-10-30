$(document).ready(function () {

    // load initial data.
    Flowers.renderData('searchDump', false);
    Flowers.indexify();

    $("#chart").css("height", "500px");
    //Bind search 
    $("#search").keyup(function () {
        Flowers.filter($("#search").val());
        Flowers.renderData('searchDump', false);
    });

    $("#chartTab").click(function () {

        Flowers.renderCharts('chart');
    });

    $("#soldUnsoldChartTab").click(function () {

        $('#soldUnsoldChart').removeClass('col-md-12').addClass('col-md-9');
        Flowers.renderCharts('soldUnsoldChart', 'tulip');


    });


    $(".theFlowers").click(function () {

        $('#soldUnsoldChart').removeClass('col-md-9').addClass('col-md-12');
        Flowers.renderCharts('soldUnsoldChart', $(this).data('val') || 'tulip');


    });

});