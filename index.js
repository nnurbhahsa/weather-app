$(document).ready(function(){
    // don't need submit b/c not using form
    $("#submitCity").click(function(){
        
        var city = $("#city").val();

        if(city != ""){

            $.ajax({
                url: "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial" + 
                "&APPID=205875b36b302ba6550cd7fb6668491b",
                type: "GET",
                dataType: "jsonp",
                success: function(data){
                    var widget = show(data);

                    $("#show").html(widget);

                    $("#city").val("");
                }
            });

        }else{
            $("#error").html("<div class='errorMessage'>Field cannot be empty.</div>");
        }
    });
});

function show(data){
    return "<h2>Current Weather for " + data.name + ", " + data.sys.country + "</h2>"+
    "<img src='https://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png'>" + 
    "<h3>Description: " + data.weather[0].description +  "</h3>" + 
    "<h3>Temperature: " + data.main.temp +  "&deg;F</h3>" + 
    "<h3>Pressure: " + data.main.pressure +  " hPa</h3>" +
    "<h3>Humidity: " + data.main.humidity +  "%</h3>" +
    "<h3>Min. Temperature: " + data.main.temp_min +  "&deg;F</h3>" + "<h3>Max. Temperature: " + data.main.temp_max +  "&deg;F</h3>" +
    "<h3>Wind Speed: " + data.wind.speed +  " mph</h3>" + 
    "<h3>Wind Direction: " + data.wind.deg +  "&deg;</h3>";
}