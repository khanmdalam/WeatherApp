// 🔥 SAME LOGIC (NO CHANGE)
const API_KEY = "36d3aefe98d943256e1e5362ababe853";

window.onload = () => {
    getLocation();
};

function getWeather() {
    const city = document.getElementById("city").value;
    if (!city) return showError("Enter city name");
    fetchWeather(city);
}

function getLocation() {
    if (!navigator.geolocation) {
        showError("Geolocation not supported");
        return;
    }

    navigator.geolocation.getCurrentPosition(
        position => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;

            fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`)
                .then(res => res.json())
                .then(data => fetchWeather(data.name));
        },
        error => {
            showError("Allow location permission ❌");
        }
    );
}

function fetchWeather(city) {

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`)
        .then(res => res.json())
        .then(data => {

            document.getElementById("cityName").innerText = data.name;
            document.getElementById("temp").innerText = data.main.temp + "°C";
            document.getElementById("desc").innerText = data.weather[0].description;

            document.getElementById("icon").src =
                `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

            document.getElementById("humidity").innerText =
                data.main.humidity + "%";

            document.getElementById("wind").innerText =
                data.wind.speed + " km/h";
        });

    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`)
        .then(res => res.json())
        .then(data => {

            let html = "";
            for(let i=0;i<data.list.length;i+=8){
                const d = data.list[i];

                html += `
                <div class="day">
                    <div>${new Date(d.dt_txt).toLocaleDateString('en-US',{weekday:'short'})}</div>
                    <img src="https://openweathermap.org/img/wn/${d.weather[0].icon}.png">
                    <div>${Math.round(d.main.temp)}°</div>
                </div>`;
            }

            document.getElementById("forecast").innerHTML = html;
        });
}

function showError(msg){
    document.getElementById("error").innerText = msg;
}