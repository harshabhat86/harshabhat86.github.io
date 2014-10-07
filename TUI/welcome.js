// this is welcome.js
var incrementalFixes;
var stopAtFixes;
var incrementalPeople;
var stopAtPeople;
var incrementalHours;
var stopAtHours;
function getStats() {
    getFixesCount();
    getPeopleCount();
    getTotalHours();

    $( '.tick-fixes' ).ticker(
        {
            incremental: incrementalFixes,
            delay: 50,
            separators: true,
            stopat: stopAtFixes
        });

    $( '.tick-people' ).ticker(
        {
            incremental: incrementalPeople,
            delay: 50,
            separators: true,
            stopat: stopAtPeople
        });

    $( '.tick-hours' ).ticker(
        {
            incremental: incrementalHours,
            delay: 50,
            separators: true,
            stopat: stopAtHours
        });
}

function getFixesCount() {
    if (window.XMLHttpRequest) {
        var xmlhttp = new XMLHttpRequest();
    } else {
        var xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }

    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
            try {
                var data = JSON.parse(xmlhttp.responseText);
                incrementalFixes = data.count < 50 ? 1 : Math.floor(data.count/50);
                stopAtFixes = data.count;
            } catch (x) {
                console.log("Crashed " + x);
            }
        }
    }

    var myOtherUrl = "https://api.parse.com/1/classes/Spotfix?count=1,limit=0";

    xmlhttp.open("GET", myOtherUrl, false);
    xmlhttp.setRequestHeader("X-Parse-Application-Id", "vSo04vEpbyviumU65MZFyuaj8zPx0aOhBfpTrAB0");
    xmlhttp.setRequestHeader("X-Parse-REST-API-Key", "w5DRAuiB6lg1hyaWYQSD8wr9HZjbXQ9g0wSrwULp");
    xmlhttp.send();
}

function getPeopleCount() {
    if (window.XMLHttpRequest) {
        var xmlhttp = new XMLHttpRequest();
    } else {
        var xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }

    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
            try {
                var data = JSON.parse(xmlhttp.responseText);
                incrementalPeople = data.count < 50 ? 1 : Math.floor(data.count/50);
                stopAtPeople = data.count;
            } catch (x) {
                console.log("Crashed " + x);
            }
        }
    }

    xmlhttp.open("GET", "https://api.parse.com/1/classes/_User?count=1,limit=0", false);
    xmlhttp.setRequestHeader("X-Parse-Application-Id", "vSo04vEpbyviumU65MZFyuaj8zPx0aOhBfpTrAB0");
    xmlhttp.setRequestHeader("X-Parse-REST-API-Key", "w5DRAuiB6lg1hyaWYQSD8wr9HZjbXQ9g0wSrwULp");
    xmlhttp.send();
}

function getTotalHours() {
    if (window.XMLHttpRequest) {
        var xmlhttp = new XMLHttpRequest();
    } else {
        var xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }

    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
            try {
                var data = JSON.parse(xmlhttp.responseText);
                incrementalHours = data.count < 50 ? 1 : Math.floor(data.count/50);
                stopAtHours = data.count;
            } catch (x) {
                console.log("Crashed " + x);
            }
        }
    }

    xmlhttp.open("GET", "https://api.parse.com/1/classes/Spotfix?count=1,limit=0", false);
    xmlhttp.setRequestHeader("X-Parse-Application-Id", "vSo04vEpbyviumU65MZFyuaj8zPx0aOhBfpTrAB0");
    xmlhttp.setRequestHeader("X-Parse-REST-API-Key", "w5DRAuiB6lg1hyaWYQSD8wr9HZjbXQ9g0wSrwULp");
    xmlhttp.send();
}