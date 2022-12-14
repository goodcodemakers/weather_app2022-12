// app.js
const API_KEY = "179ceeb11c23a912fefd41421f453ea0";
let city_name = "seoul";
let API_URL = `https://api.openweathermap.org/data/2.5/weather?q=${city_name}&appid=${API_KEY}`;

// 서버에서 불러오는 작업은 비동기 처리(async)
function getWeatherData(cityname = "seoul") {
  city_name = cityname;
  API_URL = `https://api.openweathermap.org/data/2.5/weather?q=${city_name}&appid=${API_KEY}`;
  fetch(API_URL)
    .then(function (응답데이터) {
      return 응답데이터.json();
    })
    .then(function (data) {
      console.log(data);
      showWeather(data);
    });
}
console.log(API_URL);
function showWeather(data) {
  let desc = data.weather[0].main; // 날씨상태 설명
  const weather_icon = data.weather[0].icon; // 아이콘
  const temp = parseInt(data.main.temp - 273.15); // 현재온도,섭씨
  const name = data.name; // 도시명
  console.log(name, desc, weather_icon, temp);
  const bgimgDesc = document.querySelector("body");
  bgimgDesc.style.backgroundImage = `url(./imges/${desc}.jpg)`;
  console.log(desc);
  if (
    desc == "Clear" ||
    desc == "Clouds" ||
    desc == "Dust" ||
    desc == "Rain" ||
    desc == "Snow" ||
    desc == "Thunderstorm"
  ) {
    desc = desc;
  } else {
    desc = "Dust";
  }

  // UI 출력(DOM)
  const citynameEl = document.querySelector(".cityname");
  const iconEl = document.querySelector(".icon");
  const tempEl = document.querySelector(".temp");
  const descEl = document.querySelector(".desc");

  citynameEl.textContent = name;
  iconEl.innerHTML = `<img src='http://openweathermap.org/img/wn/${weather_icon}@2x.png' alt='아이콘'/>`;
  tempEl.innerHTML = `${temp}&deg;`;
  descEl.textContent = desc;
}

//날씨 함수 호출
getWeatherData();

//선택목록(도시명) 변경 이벤트
const select = document.getElementById("select");
select.addEventListener("change", function (e) {
  //console.log("목록변경", this.value);
  console.log(e.target.value);
  const cityname = e.target.value;
  getWeatherData(cityname);
});

//날씨나 시간대 (주간/야간)에 따라 배경 연출 바꾸기
