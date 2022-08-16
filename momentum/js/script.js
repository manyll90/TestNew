window.addEventListener('beforeunload', setLocalStorage);
window.addEventListener('load', getLocalStorage);
window.addEventListener('load', getWeather);
window.addEventListener('load', getQuotes);
window.addEventListener('load',placeholderTranslate);
window.addEventListener('load',StartSettingLanguge);
window.addEventListener('load',changeSettingLanguage);


//   Start language function

const language = document.querySelector('.button-language');
let languageNow = '';
let lang = '';
if (localStorage.getItem('lang') === '' || localStorage.getItem('lang') === undefined || localStorage.getItem('lang') === null) {
	lang = 'en-US';
} else {
	lang = localStorage.getItem('lang');
}

if (lang === 'ru-Ru') {
	languageNow = 'Ru';
} else {
	languageNow = 'Eng';
}

/*let lang = 'en-US';*/
/*let lang = 'ru-Ru';*/
function changeLang() {
    if (languageNow != 'Eng') {
		translate();
		showNowDate();
		getTimeOfDay();
		getQuotes();
		getWeather();
		placeholderTranslate()
		StartSettingLanguge()
		return languageNow = 'Eng'
	} else {
		translate();
		showNowDate();
		getTimeOfDay();
		getQuotes();
		getWeather();
		placeholderTranslate()
		StartSettingLanguge()
		return languageNow = 'Ru'
	}
   
}

function translate() {
    if (languageNow != 'Eng') {
		return lang = 'en-US';
	} else {
		return lang = 'ru-Ru';
	}
   
}

language.addEventListener('click', changeLang)


//    Start time and date function

const time = document.querySelector('.time');
const dateNow = document.querySelector('.date');
/*let lang = 'en-US';*/
/*let lang = 'ru-Ru';*/


function showNowTime() {
    setTimeout(showNowTime, 1000);
    const date = new Date();
    const currentTime = date.toLocaleTimeString('ru-Ru');
    time.textContent = currentTime;
    showNowDate();
    getTimeOfDay();
	getFolderRu();
   
}

function showNowDate() {
    const date = new Date();
    const options = {weekday: 'long', month: 'long', day: 'numeric'};
    const currentDate = date.toLocaleDateString(lang, options);
    dateNow.textContent = currentDate;
}

//    End time and date function

//    Start greeting function

const greeting = document.querySelector('.greeting');
const name = document.querySelector('.name');

function placeholderTranslate() {
if (lang === 'en-US') {
	name.setAttribute('placeholder', '[Enter your name]');
} else {
	name.setAttribute('placeholder', '[Введите ваше имя]');
}
}


function getTimeOfDay() {
    const date = new Date();
    const hours = date.getHours();
    let timeOfDayNow = '';
	let timeOfDayFolder = '';
	if (lang === 'en-US') {
		if (hours === 0 || hours < 6) {
			timeOfDayNow = 'night';
		} else if (hours >= 6 && hours < 12) {
			timeOfDayNow = 'morning';
		} else if (hours >= 12 && hours < 18) {
			timeOfDayNow = 'afternoon';
		} else {
			timeOfDayNow = 'evening';
		}
		greeting.textContent = `Good ${timeOfDayNow}`;
	} else {
		if (hours === 0 || hours < 6) {
			timeOfDayNow = 'й ночи';
		} else if (hours >= 6 && hours < 12) {
			timeOfDayNow = 'го утра';
		} else if (hours >= 12 && hours < 18) {
			timeOfDayNow = 'го дня';
		} else {
			timeOfDayNow = 'го вечера';
		}
		greeting.textContent = `Добро${timeOfDayNow}`;
	}
    return timeOfDayNow;
}


function getFolderRu() {
    const date = new Date();
    const hours = date.getHours();
	let timeOfDayFolder = '';
	if (hours === 0 || hours < 6) {
		timeOfDayFolder = 'night';
	} else if (hours >= 6 && hours < 12) {
		timeOfDayFolder = 'morning';
	} else if (hours >= 12 && hours < 18) {
		timeOfDayFolder = 'afternoon';
	} else {
		timeOfDayFolder = 'evening';
	}
	return timeOfDayFolder;
}

showNowTime();

function setLocalStorage() {
    localStorage.setItem ('name', name.value);
    localStorage.setItem('city', city.value);
	localStorage.setItem('lang', lang);
  }

function getLocalStorage() {
    if (localStorage.getItem ('name')) {
        name.value = localStorage.getItem('name');
    }
    if (localStorage.getItem('city') === '' || localStorage.getItem('city') === undefined ) {
        city.value = 'Minsk';
		getWeather();
    } else {
        city.value = localStorage.getItem('city');
    }
	if (localStorage.getItem('lang') === '' || localStorage.getItem('lang') === undefined || localStorage.getItem('lang') === null) {
		lang = 'en-US';
    } else {
        lang = localStorage.getItem('lang');
    }
}

//    End greeting function
/*localStorage.clear();*/

//    Start slider function

let body = document.querySelector('body');
const slidePrev = document.querySelector('.slide-prev');
const sliderNext = document.querySelector('.slide-next');
let randomNum = getRandomNum(1, 20);
let bgNum = String(randomNum);

function getRandomNum(min, max) {
	return (min + Math.floor(Math.random() * (max)))
}

function setBg() {
	const img = new Image();
	if (lang === 'en-US') {
		img.src = `https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${getTimeOfDay()}/${bgNum.padStart(2,0)}.jpg`
		img.onload = () => {
			body.style.backgroundImage = `url('https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${getTimeOfDay()}/${bgNum.padStart(2,0)}.jpg')`;
		}
	} else {
		img.src = `https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${getFolderRu()}/${bgNum.padStart(2,0)}.jpg`
		img.onload = () => {
			body.style.backgroundImage = `url('https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${getFolderRu()}/${bgNum.padStart(2,0)}.jpg')`;
		}
	}
	sliderNext.addEventListener('click', getSliderNext);
	slidePrev.addEventListener('click', getSlidePrev);
}

function getSliderNext() {
	sliderNext.removeEventListener('click', getSliderNext);
	if (randomNum < 20) {
        bgNum = String(++randomNum);
    } else {
        randomNum = 1;
        bgNum = String(randomNum);
    }
	setTimeout(setBg, 500)
}

function getSlidePrev() {
	slidePrev.removeEventListener('click', getSlidePrev);
    if (randomNum > 1) {
        bgNum = String(--randomNum);
    } else {
        randomNum = 20;
        bgNum = String(randomNum);
    }
	setTimeout(setBg, 500)
}

setBg()

//    End slider function


//   Start weater function

const city = document.querySelector('.city');
const weatherIcon = document.querySelector('.weather-icon');
const tempereture = document.querySelector('.temperature');
const weatherDiscription = document.querySelector('.weather-description');
const humidity = document.querySelector('.humidity');
const wind = document.querySelector('.wind');
const weatherError = document.querySelector('.weather-error');

city.addEventListener('change', getWeather);

async function getWeather() {
	try {
		let url = ""
		if (lang === 'en-US') {
			/*if (localStorage.getItem('city') === '' || localStorage.getItem('city') === undefined ) {
				city.value = 'Minsk'; 
			} else {
				city.value = localStorage.getItem('city');
			}*/
			url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=en&appid=f83a26f8a527a8e847e4f568ec0f383d&units=metric`;
		} else {
			/*if (localStorage.getItem('city') === '' || localStorage.getItem('city') === undefined ) {
				city.value = 'Минск'; 
			} else {
				city.value = localStorage.getItem('city');
			}*/
			url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=ru&appid=f83a26f8a527a8e847e4f568ec0f383d&units=metric`;
		}
		let res = await fetch(url);
		let data = await res.json();
		weatherIcon.className = 'weather-icon owf';
		weatherIcon.classList.add(`owf-${data.weather[0].id}`);
		if (lang === 'en-US') {
			tempereture.textContent = `${Math.floor(data.main.temp)}°C`;
			weatherDiscription.textContent = data.weather[0].description;
			wind.textContent = `Wind speed: ${Math.floor(data.wind.speed)} m/s`;
			humidity.textContent = `Humidity: ${Math.floor(data.main.humidity)}%`;
		}  else {
			tempereture.textContent = `${Math.floor(data.main.temp)}°C`;
			weatherDiscription.textContent = data.weather[0].description;
			wind.textContent = `Скорость ветра: ${Math.floor(data.wind.speed)} м/с`;
			humidity.textContent = `Влажность: ${Math.floor(data.main.humidity)}%`;
		}
		weatherError.textContent = '';
		city.addEventListener('change', getWeather);
	} catch {
		tempereture.textContent = '';
		weatherDiscription.textContent = '';
		wind.textContent = '';
		humidity.textContent = '';
		if (lang === 'en-US') {
			if (city.value) {
				weatherError.textContent = `Error! City ${city.value} not found!`;
			} else {
				weatherError.textContent = `Error! Enter the city!`;
			}
		} else {
			if (city.value) {
				weatherError.textContent = `Ошибка! Город ${city.value} не найден!`;
			} else {
				weatherError.textContent = `Ошибка! Введите город!`;
			}
		}
	}
}

//   End weather function



//   Start quotes function

const quote = document.querySelector('.quote');
const author = document.querySelector('.author');
const quoteButton = document.querySelector('.change-quote');
let randomQuotes = getRandomNum(0, 10);

async function getQuotes() {
	let quotes = ''
	if (lang === 'en-US') {
		quotes = 'quotesEn.json';
	} else {
		quotes = 'quotesRU.json';
	}
	const res = await fetch(quotes);
	const data = await res.json();
	quote.textContent = (data[randomQuotes].text);
	author.textContent = (data[randomQuotes].author);
	quoteButton.addEventListener('click', changeQuote);
}

function changeQuote() {
	quoteButton.removeEventListener('click', changeQuote)
	if (randomQuotes === 10) {
        randomQuotes = 0;
    } else {
        randomQuotes++;
    }
	setTimeout(getQuotes, 500)
}

//   Start player function

const playNext = document.querySelector('.play-next');
const playPrev = document.querySelector('.play-prev');
const playList = document.querySelector('.play-list');
const play = document.querySelector('.play');
const audio = new Audio();
let isPlay = false;
let playNow = 0;

const trackList = ['Aqua Caelestis', 'Ennio Morricone', 'River Flows In You', 'Summer Wind'];

for(let i = 0; i < trackList.length; i++) {
	const li = document.createElement('li');
	li.classList.add('sound');
	li.textContent = trackList[i];
	playList.append(li);
  }

const sound = document.querySelectorAll('.sound');

function playAudio() {
	audio.src = `../momentum/assets/sounds/${trackList[playNow]}.mp3`;
	audio.currentTime = 0;
}

playAudio()

function starStopPlayer() {
	if (!isPlay) {
		audio.play();
		isPlay = true;
		sound[playNow].classList.add('sound-active');
		play.classList.toggle('pause');
	} else {
		audio.pause();
		isPlay = false;
		play.classList.toggle('pause');
	};
}

function letsPlayNext() {
	sound[playNow].classList.remove('sound-active');
	if (playNow < trackList.length - 1) {
		playNow++;
	} else {
		playNow = 0;
	}
	sound[playNow].classList.toggle('sound-active');
	playAudio();
	if (isPlay == true) {
		audio.play();
	}
}

function letsPlayPrev() {
	sound[playNow].classList.remove('sound-active');
	if (playNow > 0) {
		playNow--;
	} else {
		playNow = trackList.length - 1;
	}
	sound[playNow].classList.toggle('sound-active');
	playAudio();
	if (isPlay == true) {
		audio.play();
	}
}

play.addEventListener('click', starStopPlayer)
playNext.addEventListener('click', letsPlayNext)
playPrev.addEventListener('click', letsPlayPrev)
audio.addEventListener('ended', letsPlayNext)

//   End  player function

//   Start settings

const settings = document.querySelector('.settings-button');
const setingsInner = document.querySelector('.settings-inner');
const setingTime = document.querySelector('.button-time');
const setingDate = document.querySelector('.button-date');
const greetingContainer = document.querySelector('.greeting-container');
const setingGreeting = document.querySelector('.button-greeting');
const weather = document.querySelector('.weather');
const setingWeather = document.querySelector('.button-weather');
const player = document.querySelector('.player');
const setingPlayer = document.querySelector('.button-player');
const setingQuotes = document.querySelector('.button-quotes');
const footer = document.querySelector('.footer');

const textLanguage = document.querySelector('.text-language');
const textTime = document.querySelector('.text-time');
const textData = document.querySelector('.text-data');
const textGreeting = document.querySelector('.text-greeting');
const textWeather = document.querySelector('.text-weather');
const textPlayer = document.querySelector('.text-player');
const textQuotes = document.querySelector('.text-quotes');



function openSettings() {
	setingsInner.classList.toggle('open');
	settings.classList.toggle('open');
}

function changeSettingLanguage() {
	if (lang === 'ru-Ru') {
		if (language.textContent === 'Русский') {
			language.textContent = 'English';
		} else {
			language.textContent = 'Русский';
		}
	} else {
			language.textContent = 'English';
	}

}

function changeSettingTime() {
	time.classList.toggle('close');
	setingTime.classList.toggle('close');
	checkOptions (setingTime)
}

function changeSettingDate() {
	dateNow.classList.toggle('close');
	setingDate.classList.toggle('close');
	checkOptions (setingDate)
}

function changeSettingGreeting() {
	greetingContainer.classList.toggle('close');
	setingGreeting.classList.toggle('close');
	checkOptions (setingGreeting)
}

function changeSettingWeather() {
	weather.classList.toggle('close');
	setingWeather.classList.toggle('close');
	checkOptions (setingWeather)
}

function changeSettingPlayer() {
	player.classList.toggle('close');
	setingPlayer.classList.toggle('close');
	checkOptions (setingPlayer)
}

function changeSettingQuotes() {
	footer.classList.toggle('close');
	setingQuotes.classList.toggle('close');
	checkOptions (setingQuotes)
}

function checkOptions (value) {
	if (lang === 'ru-Ru') {
		if (value.classList.contains('close')) {
			value.textContent = 'Включить';
		} else if (value.textContent === 'Выключить') {
			value.textContent = 'Включить';
		} else {
			value.textContent = 'Выключить';
		}
	} else {
		if (value.classList.contains('close')) {
			value.textContent = 'Enable';
		} else if (value.textContent === 'Disable') {
			value.textContent = 'Enable';
		} else {
			value.textContent = 'Disable';
		}
	}
}

/*function checkOptions (value) {
	if (lang === 'ru-Ru') {
		if (value.textContent === 'Выключить') {
			value.textContent = 'Включить';
		} else {
			value.textContent = 'Выключить';
		}
	} else {
		if (value.textContent === 'Disable') {
			value.textContent = 'Enable';
		} else {
			value.textContent = 'Disable';
		}
	}
}*/

async function StartSettingLanguge() {
	checkOptions (setingTime)
	checkOptions (setingDate)
	checkOptions (setingGreeting)
	checkOptions (setingWeather)
	checkOptions (setingPlayer)
	checkOptions (setingQuotes)
	if (lang === 'ru-Ru') {
		settings.textContent = 'Настройки';
		textLanguage.textContent = 'Язык';
		textTime.textContent = 'Время';
		textData.textContent = 'Дата';
		textGreeting.textContent = 'Приветствие';
		textWeather.textContent = 'Погода';
		textPlayer.textContent = 'Плеер';
		textQuotes.textContent = 'Цитаты';
		localStorage.setItem('city', city.value);
		if (city.value === 'Minsk') {
			city.value = 'Минск' 
		} else if (city.value === 'minsk') {
			city.value = 'минск'
		} else {
			city.value = localStorage.getItem('city');
		}
	} else {
		settings.textContent = 'Settings';
		textLanguage.textContent = 'Language';
		textTime.textContent = 'Time';
		textData.textContent = 'Date';
		textGreeting.textContent = 'Greeting';
		textWeather.textContent = 'Weather';
		textPlayer.textContent = 'Player';
		textQuotes.textContent = 'Quotes';
		localStorage.setItem('city', city.value);
		if (city.value === 'Минск') {
			city.value = 'Minsk' 
		} else if (city.value === 'минск') {
			city.value = 'minsk'
		} else {
			city.value = localStorage.getItem('city');
		}
	}
}




/*function changeSettingLanguage() {
	if (language.textContent === 'English') {
		language.textContent = 'Russian';
	} else {
		language.textContent = 'English';
	}
}

function changeSettingTime() {
	time.classList.toggle('close');
	checkOptions (setingTime)
}

function changeSettingDate() {
	dateNow.classList.toggle('close');
	checkOptions (setingDate)
}

function changeSettingGreeting() {
	greetingContainer.classList.toggle('close');
	checkOptions (setingGreeting)
}

function changeSettingWeather() {
	weather.classList.toggle('close');
	checkOptions (setingWeather)
}

function changeSettingPlayer() {
	player.classList.toggle('close');
	checkOptions (setingPlayer)
}

function changeSettingQuotes() {
	footer.classList.toggle('close');
	checkOptions (setingQuotes)
}

function checkOptions (value) {
	if (value.textContent === 'Disable') {
		value.textContent = 'Enable';
	} else {
		value.textContent = 'Disable';
	}
}*/


/*async function SettingLanguge() {
	if (lang === 'ru-Ru') {

} else (

)*/


settings.addEventListener('click', openSettings);
setingTime.addEventListener('click', changeSettingTime);
setingDate.addEventListener('click', changeSettingDate);
setingGreeting.addEventListener('click', changeSettingGreeting);
setingWeather.addEventListener('click', changeSettingWeather);
setingPlayer.addEventListener('click', changeSettingPlayer);
setingQuotes.addEventListener('click', changeSettingQuotes);
language.addEventListener('click', changeSettingLanguage)