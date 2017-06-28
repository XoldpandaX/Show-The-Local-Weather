/**
 * Created by Den on 08.05.2017.
 */
var temp, loc, icon, humidity, wind, condition;
var APPID = '970fbd585b568cc29b91073dfb8b9ea5';
// http://api.openweathermap.org/data/2.5/weather?lat=55&lon=63&appid=970fbd585b568cc29b91073dfb8b9ea5

window.onload = function() {

    var i = 0;

    temp = document.getElementById("temperature");
    loc = document.getElementById("location");
    icon = document.getElementById("icon");
    humidity = document.getElementById("humidity");
    wind = document.getElementById("wind");
    condition = document.getElementById("condition");

    // updateByZip(630000, 'ru');
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        var zip = window.prompt("Мы не смогли определить ваше местоположение, укажити свой почтовый индекс");
        updateByZip(zip, 'ru');
    }

    document.querySelector('#a').onclick = function() {

        if (i == 0) {
            temp.innerHTML = Math.round( (temp.innerHTML * 1.8) + 32);
            document.getElementById('metrica').innerHTML = '&nbsp;F&deg;&nbsp;&nbsp;';
            i++;
        } else {
            temp.innerHTML = Math.round( (temp.innerHTML - 32) / 1.8);
            document.getElementById('metrica').innerHTML = '&nbsp;C&deg;&nbsp;&nbsp;';
            i--;
        }

    };

};

function update(weather) {

    temp.innerHTML = weather.temp;
    loc.innerHTML = weather.loc;
    icon.src = "http://openweathermap.org/img/w/"+ weather.icon + ".png";
    humidity.innerHTML = weather.humidity;
    wind.innerHTML = weather.wind;
    condition.innerHTML = weather.condition;

}

function updateByZip(zip, region) {

    var url = 'http://api.openweathermap.org/data/2.5/weather?' +
        'zip=' + zip +
        ',' + region + '&appid=' + APPID;

    sendRequest(url);

}

function updateByGeo(lat, lon) {
    var url = 'http://api.openweathermap.org/data/2.5/weather?lat=' + lat + "&lon=" + lon + '&appid=' + APPID;

    sendRequest(url);

}

function sendRequest(url) {

    var xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = function() {

        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var data = JSON.parse(xmlhttp.responseText);
            var weather = {};
            var apiImg = data.weather[0].id;

            weather.icon = toImg(apiImg);
            weather.humidity = data.main.humidity;
            weather.wind = data.wind.speed;
            weather.loc = data.name;
            weather.temp = data.main.temp - 273.15;
            weather.condition = data.weather[0].description;
            console.log(data);
            update(weather);
        }

    };
    xmlhttp.open("GET", url, true);
    xmlhttp.send();

}

function toImg(apiImg) {

    if (apiImg >= 200 && apiImg <= 232) {
        apiImg = '11d';
    } else if (apiImg >= 300 && apiImg <= 321) {
        apiImg = '09d';
    } else if (apiImg == 800) {
        apiImg = '01d'
    } else if (apiImg == 801) {
        apiImg = '02d';
    } else if (apiImg == 802) {
        apiImg = '03d';
    } else if (apiImg == 803 || apiImg == 804) {
        apiImg = '04d';
    } else if (apiImg >= 500 && apiImg <= 504) {
        apiImg = '10d';
    } else if (apiImg >= 520 && apiImg <= 531) {
        apiImg = '09d';
    } else if (apiImg == 511 || apiImg >= 600 && apiImg <= 622) {
        apiImg = '13d';
    } else {
        apiImg = '50d';
    }

    return apiImg;

}

function showPosition(position) {

    updateByGeo(position.coords.latitude, position.coords.longitude);

}


