var a = [];
var city;
if (localStorage.getItem("cities")) {
    a = JSON.parse(localStorage.getItem("cities"))
};
for (var i = 0; i < a.length; i++) {
    $(".cityHistory").append(`
        <button class="cityButton"> ${a[i]} </button>
    `)
}

function getweatherData() {
    var key = "67b9879b2c60fa4a3b20f137287b873a";
    //var city = a[0];
    var queryUrl = "https://api.openweathermap.org/data/2.5/forecast?units=imperial&q=" + city + "&appid=" + key;


    $.ajax({
        url: queryUrl, //API Call
        method: "GET"
    }).then(function (response) {
        console.log(response.list)
        for (var i = 0; i < response.list.length; i++) {
            console.log(moment(response.list[i].dt_txt).format('H'))
            if (moment(response.list[i].dt_txt).format('H') === "9") {
                console.log(response.list[i])
            }
        }

        $("cityDisplay").text(response.city.name)
        $("#tempDisplay").text(response.list[0].main.temp + "F")
        $("#humDisplay").text(JSON.stringify(response.list[0].main.humidity + "%"))
        $("#windDisplay").text(JSON.stringify(response.list[0].wind.speed + "MPH"))
        var dayLength = 5;
        $(".card-deck").empty();

        $.ajax({
            url: "http://api.openweathermap.org/data/2.5/uvi/forecast?appid=" + key + "&lat={lat}&lon={lon}",
            method: "GET"
        }).then(function (data) {
            console.log(data);
        })

        for (var i = 0; i < dayLength; i++) {
            var dayForecast = $("<div>").addClass("card");
            var forecastBody = $("<div>").addClass("card-body");
            var cardTitle = $("<h5>").addClass("card-title").text(moment().add(i + 1, 'days').format('l'));
            var dayTemp = $("<p>").text("Temperature:" + (response.list[i + 1].main.temp + "F"));
            var dayHumid = $("<p>").text("Humidity:" + (JSON.stringify(response.list[i + 1].main.humidity) + "%"));
            forecastBody.append(cardTitle);
            forecastBody.append(dayTemp);
            forecastBody.append(dayHumid);

            dayForecast.append(forecastBody);
            $(".card-deck").append(dayForecast);

        }
    })
}

$("#search").click(function () {

    city = $(this).prev().val();
    if (($.inArray(city, a) === -1 && city !== "")) {
        a.unshift(city);
    }
    localStorage.setItem("cities", JSON.stringify(a));
    getweatherData();
})

$(".cityButton").click(function () {
    city = $(this).text();
    console.log("The city being clicked is " + city);
    getweatherData()
});
