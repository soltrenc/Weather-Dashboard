var a = [];
if (localStorage.getItem("cities")) {
    a = JSON.parse(localStorage.getItem("cities"))
};
for (var i = 0; i < a.length; i++) {
    $(".cityHistory").append(`
        <button class="cityButton"> ${a[i]} </button>
    `)
}

var dayLength = 5;
$(".card-deck").empty();


for (var i = 0; i < dayLength; i++) {
    var dayForecast = $("<div>").addClass("card");
    var forecastBody = $("<div>").addClass("card-body");
    var cardTitle = $("<h5>").addClass("card-title").text(moment().add(i + 1, 'days').format('l'));
    forecastBody.append(cardTitle);



    dayForecast.append(forecastBody);
    $(".card-deck").append(dayForecast);

}

function getweatherData() {
    var key = "67b9879b2c60fa4a3b20f137287b873a";
    var city = a[0];
    var queryUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + key;


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
        $("#tempDisplay").text(JSON.stringify(parseInt((response.list[0].main.temp) - 273.15) * 9 / 5 + 32 + String.fromCharCode(176) + 'F'))
        $("#humDisplay").text(JSON.stringify(response.list[0].main.humidity + "%"))
        $("#windDisplay").text(JSON.stringify(response.list[0].wind.speed + "MPH"))

    })
}

$("#search").click(function () {

    var city = $(this).prev().val();
    if (($.inArray(city, a) === -1 && city !== "")) {
        a.unshift(city);
    }
    localStorage.setItem("cities", JSON.stringify(a));
    getweatherData();
})

// getweatherData()
