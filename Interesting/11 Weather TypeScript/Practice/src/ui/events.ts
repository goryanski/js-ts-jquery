import { cityService } from '../services/city.service';
import { startRender } from './load';
import { UI } from './uiElements';
import { renderWeather5days,
    renderWeatherToday
} from './render';

export function subscribe() {
    // search for a city when you click on the search icon in the input
    UI.btnSearch.click(async() => {
        let cityWeather = await cityService.getCityWeather(UI.inputSearch.val());
        startRender(cityWeather);
    });

    UI.btnWeatherToday.click(() => {
        UI.btnWeatherToday.addClass('selected-foreecast');
        UI.btnWeather5days.removeClass('selected-foreecast');
        renderWeatherToday(cityService.data);
        UI.inputSearch.val(cityService.data.name);
    });

    UI.btnWeather5days.click(() => {
        UI.btnWeather5days.addClass('selected-foreecast');
        UI.btnWeatherToday.removeClass('selected-foreecast');
        renderWeather5days(cityService.data.extraInfo);
        UI.inputSearch.val(cityService.data.name);
    });
}