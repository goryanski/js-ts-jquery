import { defaultCityToSearch, log } from '../environment/environment';
import { cityService } from '../services/city.service';
import { CurrentCityModel } from '../models/current.city.model';
import { UI, $ } from '../ui/uiElements';
import { renderWeatherToday,
    renderWeather5days,
    renderError404
 } from './render';

export async function loadDefaultWeather() {
    try {
        let localWeather = await cityService.getWeatherByCurrentLocation();
        startRender(localWeather);
    } catch (error) {
        let cityWeather = await cityService.getCityWeather(defaultCityToSearch);
        startRender(cityWeather);
    }
}

export function startRender(weather: CurrentCityModel) {
    log('startRender', weather);
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