import { API } from '../config/environment.js';

export class QueriesService {
    getCityWeatherQuery(sityName) {
        return `${API.url}/forecast?q=${sityName}&units=metric&appid=${API.key}`;
    }
    getWeatherByCurrentLocationQuery(latitude, longitude) {
        return `${API.url}/weather?lat=${latitude}&lon=${longitude}&appid=${API.key}`;
    }
    getWeatherNearbyQuery(latitude, longitude, citiesCount) {
        return `${API.url}/find?lat=${latitude}&lon=${longitude}&units=metric&cnt=${citiesCount}&appid=${API.key}`;
    }
}

export const queriesService = new QueriesService();