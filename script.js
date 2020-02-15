function getweatherData() {
    var key = "67b9879b2c60fa4a3b20f137287b873a";
    var city = "New%20York";
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

        $("citiesDisplay").append(JSON.stringify)
        $("#tempDisplay").append(JSON.stringify(parseInt((response.list[0].main.temp) - 273.15) * 9 / 5 + 32 + String.fromCharCode(176) + 'F'))
        $("#humDisplay").append(JSON.stringify(response.list[0].main.humidity + "%"))
        $("#windDisplay").append(JSON.stringify(response.list[0].wind.speed))
        $(".card-content").append(JSON.stringify(parseInt((response.list[i].main.temp) - 273.15) * 9 / 5 + 32 + String.fromCharCode(176) + 'F'))


    })
}

getweatherData() 
