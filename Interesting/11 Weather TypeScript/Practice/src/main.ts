import { subscribe } from './ui/events';
import { loadDefaultWeather } from './ui/load';

(async function() {
    await loadDefaultWeather();
    subscribe();
}());