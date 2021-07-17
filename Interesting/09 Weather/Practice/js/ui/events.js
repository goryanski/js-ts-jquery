import { UI } from './uiElements.js'
import { startRender } from './load.js';
import { cityService } from '../services/city.service.js';
import { 
    renderWeatherToday,
    renderWeather5days
 } from './render.js';


export function subscribe() {
    //search for a city when you click on the search icon in the input 
    UI.btnSearch.click(async() => {
        
        let cityWeather = await cityService.getCityWeather(UI.inputSearch.val());
        startRender(cityWeather);
    });
    
    UI.btnWeatherToday.click(() => {
        UI.btnWeatherToday.addClass('selected-foreecast');
        UI.btnWeather5days.removeClass('selected-foreecast');
        renderWeatherToday(cityService.remoteData);
        UI.inputSearch.val(cityService.remoteData.name);
    });

    UI.btnWeather5days.click(() => {
        UI.btnWeather5days.addClass('selected-foreecast');
        UI.btnWeatherToday.removeClass('selected-foreecast');
        renderWeather5days(cityService.remoteData.extraInfo);
        UI.inputSearch.val(cityService.remoteData.name);
    });
}



