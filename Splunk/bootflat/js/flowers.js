/*

Harsha:

Taking modular approach.
My module Flowers will have an array of objects as the data (derived from data.js)

Then will define operations on those. The data will be private!



Methods:

filter(text, key) --Search on a specific key. If key is null/ undefined, then search on all columns
renderData : Renders the data as a table or as raw data
renderChart: Renders the charts.
indexify : Creates a new property for object which indexes all the objects. Delimited by "|". Assumption: The search wont contain a "|"


*/

var Flowers = (function (data) {
    
    var CHART_X_AXIS = 'date';
    var CHART_Y_AXIS = 'quantity-sold';
    var INDEX_DELIMITER = "|"

    var originalData = data;

    //This is the data that we use to search and everything else.
    var dataForSearch = data;

    //Skeleton to render the table. Keeping it outside of my core logic, in case we need to change this in future.
    var renderSkeleton = {
        start: '<table class="table table-striped table-bordered"> ',
        end: ' </tbody> </table>',
        beginTHead: '<thead>',
        endTHead: '</thead><tbody>',
        endTBody: '</tbody>',
        beginTRow: '<tr>',
        endTRow: '</tr>'

    };

    var distinctColumns = {};

    /*
    Create an index for all the columns

    */
    var indexify = function () {

        for (var i = 0; i < dataForSearch.length; i++) {
            var idx = '|';
            for (vals in dataForSearch[i]) {
                if (!dataForSearch[i].hasOwnProperty(vals)) {
                    //The current property is not a direct property of p
                    continue;
                }
                
                idx += dataForSearch[i][vals] + INDEX_DELIMITER;

                distinctColumns[vals] = distinctColumns[vals] || [];
                if (distinctColumns[vals].indexOf(dataForSearch[i][vals]) == -1) {
                    distinctColumns[vals].push(dataForSearch[i][vals]);
                }
            }
            dataForSearch[i].idx = idx;
        }

    };

    //Pass a string "text" and get filtered set on all the data.
    var filter = function (text, key) {
        //If you need to reset filter, just pass null.
        if (text == null || text == undefined || text == "") {
            dataForSearch = originalData;
        }
        
        
        var filteredData = [];
        //if key is null or undefined, search on all the columns.
        key = key || 'idx';
        for (var i = 0; i < dataForSearch.length; i++) {

            if (dataForSearch[i][key].indexOf(text) > -1) {
                filteredData.push(dataForSearch[i]);
            }

        }
        dataForSearch = filteredData;
    };


    
    /*
    **A redundant method**
    Instead of filtering on the default data, this method can filter on any data provided.
    dataStore is the third parameter which has data.
    
    */
    var filterOnData = function (text, key, dataStore) {

        if (text == null || text == undefined || text == "") {
            tempDataStore = dataStore;
        }
        var filteredData = [];
        //if key is null or undefined, search on all the columns.
        key = key || 'idx';
        for (var i = 0; i < dataStore.length; i++) {

            if (dataStore[i][key].indexOf(text) > -1) {
                filteredData.push(dataStore[i]);
            }

        }
        return filteredData;
    };

    
/*
Returns the Key for the JSON object, for identifying the table header dynamically.
*/
    var getHeaders = function () {
        var keys = [];
        //assuming all json objects have the same keys and are of same type..
        var arr = dataForSearch[0];
        for (key in arr) {
            if (arr.hasOwnProperty(key) && key != 'idx') {
                keys.push(key);
            }

        }
        return keys;
    };

    /*
    If you want to render as Raw, pass True to second param.
    Element Id is the DOM element ID where the data is rendered.
    
    */
    var renderData = function (elementId, isRaw) {
        if (isRaw) {
            for (var i = 0; i < dataForSearch.length; i++)
                $('#' + elementId).html($('#' + elementId).html() + "<br>" + JSON.stringify(dataForSearch[i], undefined, 2));
        } else {

            //Get the header for table.
            var header = getHeaders();
            var data = [renderSkeleton.start, renderSkeleton.beginTHead];
            data.push('<th>' + header.join('</th><th>') + '</th>');
            data.push(renderSkeleton.endTHead);
            var i, j;
            //Start rendering the data! It's all dynamic hence no config / hardcoding needed.
            for (j = 0; j < dataForSearch.length; j++) {

                data.push(renderSkeleton.beginTRow);
                for (i = 0; i < header.length; i++) {

                    data.push('<td>' + dataForSearch[j][header[i]] + '</td>');

                }
                data.push(renderSkeleton.endTRow);



            }
            data.push(renderSkeleton.endTBody);
            data.push(renderSkeleton.end);

            $('#' + elementId).html(data.join(''));

        }

    };



/*
Methods looks big, but is simple.

Take the highcharts api for different charts and render them as needed.

Element Id is the DOM element ID where the data is rendered.
itemName is the "Flower name". This is for the stacked bar chart

Two charts are rendered based on the param passed and the element name.



*/

    var renderCharts = function (elementId, itemName) {


        var xAxisCatg = distinctColumns[CHART_X_AXIS].sort();


        var seriesData = [];
        var tempData = [];
        var i, j;
        
        //Preparing the data for rendering on chart.
        if (elementId == 'chart') {
            filter("");
            var chartData = distinctColumns.flower;
            for (i = 0; i < chartData.length; i++) {
                //Take each flower and get the quantity sold and push it in an array.
                var dataStore = filterOnData(chartData[i], 'flower', originalData);
                for (j = 0; j < xAxisCatg.length; j++) {
                    var oneObject = filterOnData(xAxisCatg[j], 'date', dataStore);
                    tempData.push(parseFloat(oneObject[0]['quantity-sold']));
                }

                //Each row of data is being prepared for high charts format.
                seriesData.push({
                    name: chartData[i],
                    data: tempData
                });
                tempData = [];
            }

            //Render the line chart using the above data.
            $('#' + elementId).highcharts({
                title: {
                    text: 'Flower Sales',
                    x: -20 //center
                },
                xAxis: {
                    categories: xAxisCatg
                },
                yAxis: {
                    title: {
                        text: CHART_Y_AXIS
                    },
                    plotLines: [{
                        value: 0,
                        width: 1,
                        color: '#808080'
            }]
                },
                tooltip: {
                    valueSuffix: ''
                },
                legend: {
                    layout: 'vertical',
                    align: 'right',
                    verticalAlign: 'middle',
                    borderWidth: 0
                },
                series: seriesData
            });


        } else {

            //If the chart needed is bar chart, prepare data for that.
            var seriesData_soldUnsoldChart = [];
            
            //These are the columns we are considering for stacked bar chart!.
            var tempData_soldUnsoldChart = {
                'quantity-sold': [],
                'quantity-unsold': []
            };


            filter("");

            //Flower is taken as a parameter and passed to this chart.
            var flower_name = itemName;
            
            var dataStore = filterOnData(flower_name, 'flower', originalData);
            for (j = 0; j < xAxisCatg.length; j++) {
                //Prepare the data for rendering in highcharts for the selected flower. 
                //Collect info about quantity-sold and quantity - unsold.
                var oneObject = filterOnData(xAxisCatg[j], 'date', dataStore);
                tempData_soldUnsoldChart['quantity-sold'].push(parseFloat(oneObject[0]['quantity-sold']));
                tempData_soldUnsoldChart['quantity-unsold'].push(parseFloat(oneObject[0]['quantity-unsold']));

            }

            //Each row of data is being prepared for high charts format.
            seriesData_soldUnsoldChart.push({
                name: 'quantity-sold',
                data: tempData_soldUnsoldChart['quantity-sold']
            });

            seriesData_soldUnsoldChart.push({
                name: 'quantity-unsold',
                data: tempData_soldUnsoldChart['quantity-unsold']
            });



            //Render data on highcharts
            $('#' + elementId).highcharts({
                chart: {
                    type: 'column'
                },
                title: {
                    text: 'Sales for ' + flower_name
                },
                xAxis: {
                    categories: xAxisCatg
                },
                yAxis: {
                    min: 0,
                    title: {
                        text: 'Total ' + flower_name + ' Sales'
                    },
                    stackLabels: {
                        enabled: true,
                        style: {
                            fontWeight: 'bold',
                            color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray'
                        }
                    }
                },
                legend: {
                    align: 'right',
                    x: -70,
                    verticalAlign: 'top',
                    y: 20,
                    floating: true,
                    backgroundColor: (Highcharts.theme && Highcharts.theme.background2) || 'white',
                    borderColor: '#CCC',
                    borderWidth: 1,
                    shadow: false
                },
                tooltip: {
                    formatter: function () {
                        return '<b>' + this.x + '</b><br/>' +
                            this.series.name + ': ' + this.y + '<br/>' +
                            'Total: ' + this.point.stackTotal;
                    }
                },
                plotOptions: {
                    column: {
                        stacking: 'normal',
                        dataLabels: {
                            enabled: true,
                            color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'white',
                            style: {
                                textShadow: '0 0 3px black, 0 0 3px black'
                            }
                        }
                    }
                },
                series: seriesData_soldUnsoldChart
            });

        }


        //var xAxisCatg = distinctColumns[CHART_X_AXIS].sort();


    };

    //My module is returned to the battlefield.
    return {
        indexify: indexify,
        filter: filter,
        renderData: renderData,
        renderCharts: renderCharts

    };





})(data);