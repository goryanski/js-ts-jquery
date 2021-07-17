import { HourlyInfo } from '../api/interfaces/hourly.info.interface';
import { CurrentCityModel } from '../models/current.city.model';
import { NearestCity } from '../models/nearest.city.model';
import { cityService } from '../services/city.service';
import { $ } from '../ui/uiElements';
import {
    convertWindDir,
    getSeparateDaysWeather,
    getDay,
    getShortDate,
    subscribeDaysToSelect
} from './renderHelper'

export async function renderWeatherToday(data: CurrentCityModel) {
    $('main').html(renderCurrentWeather(data));
    $('main').append(renderHourlyWeather(data.extraInfo));

    let nearestCities = await cityService.getWeatherNearby(data.latitude, data.longitude, 5);
    $('main').html($('main').html() + renderNearbyPlacesWeather(nearestCities));
}
export function renderWeather5days(extraInfo: Array<HourlyInfo>) {
    $('main').html(render5daysWeather(extraInfo));
    subscribeDaysToSelect(extraInfo);
    $('main').append(renderHourlyWeather(extraInfo));
}
export function renderError404() {
    return `<div class="block-404">
                <img src="../../images/404-Page.png" alt="error 404">
                <p>Query could not be found.</p>
                <p>Please enter a different location.</p>
            </div>`;
}

function renderCurrentWeather(data: CurrentCityModel) {
    return `<div class="current-weather-block">
                <div class="block-top">
                    <h2>CURRENT WEATHER</h2>
                    <p class="current-date">${new Date().toLocaleDateString()}</p>
                </div>
                <div class="block-bottom">
                    <div>
                        <img src="http://openweathermap.org/img/wn/${data.weatherIcon}@2x.png" alt="weather-icon"></img>
                        <p class="weather-img-description">${data.weatherDescription}</p>
                    </div>
                    <div>
                        <p class="temperature">${data.temperature}&deg;C</p>
                        <p class="temperature-real-feel">Real Feel ${data.realTemperature}&deg;</p>
                    </div>
                    <div class="extra-info">
                        <p class="sunrise">Sunrise: ${data.sunrise} AM</p>
                        <p class="sunset">Sunset: ${data.sunset} PM</p>
                    </div>
                </div>
            </div>`;
}

export function renderHourlyWeather(data: any, dayNumber: number = null) {
    let data1, data2, data3, data4, data5, data6;
    if(dayNumber != null) {
        data1 = data.six[dayNumber];
        data2 = data.nine[dayNumber];
        data3 = data.twelve[dayNumber];
        data4 = data.fifteen[dayNumber];
        data5 = data.eighteen[dayNumber];
        data6 = data.twentyOne[dayNumber];
    }
    else {
        data1 = data[1];
        data2 = data[2];
        data3 = data[3];
        data4 = data[4];
        data5 = data[5];
        data6 = data[6];
    }
    return `<div class="hourly-weather-block">
                <h2>HOURLY</h2>
                <table>
                    <tr>
                        <td>HOURS</td>
                        <td>${data1.dt_txt.substring(10, 16)}</td>
                        <td>${data2.dt_txt.substring(10, 16)}</td>
                        <td>${data3.dt_txt.substring(10, 16)}</td>
                        <td>${data4.dt_txt.substring(10, 16)}</td>
                        <td>${data5.dt_txt.substring(10, 16)}</td>
                        <td>${data6.dt_txt.substring(10, 16)}</td>
                    </tr>
                    <tr class="images">
                        <td></td>
                        <td><img src="http://openweathermap.org/img/wn/${data1.weather[0].icon}@2x.png" alt="weather-icon"></img></td>
                        <td><img src="http://openweathermap.org/img/wn/${data2.weather[0].icon}@2x.png" alt="weather-icon"></img></td>
                        <td><img src="http://openweathermap.org/img/wn/${data3.weather[0].icon}@2x.png" alt="weather-icon"></img></td>
                        <td><img src="http://openweathermap.org/img/wn/${data4.weather[0].icon}@2x.png" alt="weather-icon"></img></td>
                        <td><img src="http://openweathermap.org/img/wn/${data5.weather[0].icon}@2x.png" alt="weather-icon"></img></td>
                        <td><img src="http://openweathermap.org/img/wn/${data6.weather[0].icon}@2x.png" alt="weather-icon"></img></td>
                    </tr>
                    <tr class="bordered">
                        <td>Forecast</td>
                        <td>${data1.weather[0].main}</td>
                        <td>${data2.weather[0].main}</td>
                        <td>${data3.weather[0].main}</td>
                        <td>${data4.weather[0].main}</td>
                        <td>${data5.weather[0].main}</td>
                        <td>${data6.weather[0].main}</td>
                    </tr>
                    <tr class="bordered">
                        <td>Temp (&deg;C)</td>
                        <td>${Math.round(data1.main.temp)}&deg;</td>
                        <td>${Math.round(data2.main.temp)}&deg;</td>
                        <td>${Math.round(data3.main.temp)}&deg;</td>
                        <td>${Math.round(data4.main.temp)}&deg;</td>
                        <td>${Math.round(data5.main.temp)}&deg;</td>
                        <td>${Math.round(data6.main.temp)}&deg;</td>
                    </tr>
                    <tr class="bordered">
                        <td>RealFeel</td>
                        <td>${Math.round(data1.main.feels_like)}&deg;</td>
                        <td>${Math.round(data2.main.feels_like)}&deg;</td>
                        <td>${Math.round(data3.main.feels_like)}&deg;</td>
                        <td>${Math.round(data4.main.feels_like)}&deg;</td>
                        <td>${Math.round(data5.main.feels_like)}&deg;</td>
                        <td>${Math.round(data6.main.feels_like)}&deg;</td>
                    </tr>
                    <tr>
                        <td>Wind (km/h)</td>
                        <td>${Math.round(data1.wind.speed)} ${convertWindDir(data1.wind.deg)}</td>
                        <td>${Math.round(data2.wind.speed)} ${convertWindDir(data2.wind.deg)}</td>
                        <td>${Math.round(data3.wind.speed)} ${convertWindDir(data3.wind.deg)}</td>
                        <td>${Math.round(data4.wind.speed)} ${convertWindDir(data4.wind.deg)}</td>
                        <td>${Math.round(data5.wind.speed)} ${convertWindDir(data5.wind.deg)}</td>
                        <td>${Math.round(data6.wind.speed)} ${convertWindDir(data6.wind.deg)}</td>
                    </tr>
                </table>
            </div>`;
}

function renderNearbyPlacesWeather(data: NearestCity[]) {
    if(!data) {
        return `<div class="nearby-places-block">
                    <h2>NEARBY PLACES</h2>
                    <p class="not-found">No information :(</p>
                </div>`;
    }
    else {
        return `<div class="nearby-places-block">
                <h2>NEARBY PLACES</h2>
                <div class="places">
                    <div class="block-left">
                        <div>
                            <div>${data[0].name}</div>
                            <div class="icon"><img src="http://openweathermap.org/img/wn/${data[0].icon}@2x.png" alt="weather-icon"></img></div>
                            <div class="degrees">${Math.round(data[0].temperature)}&deg;C</div>
                        </div>
                        <div>
                            <div>${data[1].name}</div>
                            <div class="icon"><img src="http://openweathermap.org/img/wn/${data[1].icon}@2x.png"    alt="weather-icon"></img></div>
                            <div class="degrees">${Math.round(data[1].temperature)}&deg;C</div>
                        </div>
                    </div>
                    <div class="block-right">
                        <div>
                            <div>${data[2].name}</div>
                            <div class="icon"><img src="http://openweathermap.org/img/wn/${data[2].icon}@2x.png"     alt="weather-icon"></img></div>
                            <div class="degrees">${Math.round(data[2].temperature)}&deg;C</div>
                        </div>
                        <div>
                            <div>${data[3].name}</div>
                            <div class="icon"><img src="http://openweathermap.org/img/wn/${data[3].icon}@2x.png"     alt="weather-icon"></img></div>
                            <div class="degrees">${Math.round(data[3].temperature)}&deg;C</div>
                        </div>
                    </div>
                </div>
            </div>`;
    }
}

function render5daysWeather(extraInfo: Array<HourlyInfo>) {
    let days = getSeparateDaysWeather(extraInfo);
    return `<div class="five-day-forecast-block">
                <table>
                    <tr>
                        <td>
                            <div>
                                <p>TODAY</p>
                                <p>${(new Date().toLocaleDateString()).substring(0, 5)}</p>
                                <img src="http://openweathermap.org/img/wn/${extraInfo[0].weather[0].icon}@2x.png" alt="weather-icon"></img>
                                <p>${Math.round(extraInfo[0].main.temp)}&deg;C</p>
                                <p>${extraInfo[0].weather[0].description}</p>
                            </div>
                        </td>
                        <td>
                            <div>
                                <p>${getDay(days[0].dt_txt)}</p>
                                <p>${getShortDate(days[0].dt_txt)}</p>
                                <img src="http://openweathermap.org/img/wn/${days[0].weather[0].icon}@2x.png" alt="weather-icon"></img>
                                <p>${Math.round(days[0].main.temp)}&degC</p>
                                <p>${days[0].weather[0].description}</p>
                            </div>
                        </td>
                        <td>
                            <div>
                                <p>${getDay(days[1].dt_txt)}</p>
                                <p>${getShortDate(days[1].dt_txt)}</p>
                                <img src="http://openweathermap.org/img/wn/${days[1].weather[0].icon}@2x.png" alt="weather-icon"></img>
                                <p>${Math.round(days[1].main.temp)}&degC</p>
                                <p>${days[1].weather[0].description}</p>
                            </div>
                        </td>
                        <td>
                            <div>
                                <p>${getDay(days[2].dt_txt)}</p>
                                <p>${getShortDate(days[2].dt_txt)}</p>
                                <img src="http://openweathermap.org/img/wn/${days[2].weather[0].icon}@2x.png" alt="weather-icon"></img>
                                <p>${Math.round(days[2].main.temp)}&degC</p>
                                <p>${days[2].weather[0].description}</p>
                            </div>
                        </td>
                        <td>
                            <div>
                                <p>${getDay(days[3].dt_txt)}</p>
                                <p>${getShortDate(days[3].dt_txt)}</p>
                                <img src="http://openweathermap.org/img/wn/${days[3].weather[0].icon}@2x.png" alt="weather-icon"></img>
                                <p>${Math.round(days[3].main.temp)}&degC</p>
                                <p>${days[3].weather[0].description}</p>
                            </div>
                        </td>
                    </tr>
                </table>
            </div>`;
}