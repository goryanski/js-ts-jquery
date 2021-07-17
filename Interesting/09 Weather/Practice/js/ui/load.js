import { cityService } from '../services/city.service.js';
import { defaultCityToSearch } from '../config/environment.js';
import { UI } from './uiElements.js'
import { 
    renderWeatherToday,
    renderWeather5days,
    renderError404
 } from './render.js';

export async function loadDefaultWeather() {
    try {
        let localWeather = await cityService.getWeatherByCurrentLocation();
        startRender(localWeather);
    } catch (error) {
        let cityWeather = await cityService.getCityWeather(defaultCityToSearch);
        startRender(cityWeather);
    }
}

export function startRender(weather) {
    if(weather != null) {
        // set city name to input (only first time)
        if(UI.inputSearch.val() === '') {
            UI.inputSearch.val(weather.name);
        } 
        
        // set html content
        if(UI.btnWeatherToday.hasClass('selected-foreecast')) {
            renderWeatherToday(weather);
        }
        else {
            renderWeather5days(weather.extraInfo);
        }
    }
    else {
        $('main').html(renderError404());
    }
}