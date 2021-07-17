import { log } from '../config/environment.js';
import { queriesService } from '../services/queries.service.js';
import { NearestCity } from '../models/nearestCity.js';
import { CurrentCity } from '../models/currentCity.js';

export class CityService {
    constructor() {
        this.remoteData = null;
    }

    async getCityWeather(city) {
        let cityWeatherQuery = queriesService.getCityWeatherQuery(city);
        let data = await this.getApiResponse(cityWeatherQuery);
        
        if(data != null) {
            let currentCityData = new CurrentCity(data);
            this.remoteData = currentCityData;
            return currentCityData;
        }
        else {
            return null;
        }
    }

    async getWeatherByCurrentLocation() {
        let position = await getPosition();
        let localWeatherQuery = queriesService.getWeatherByCurrentLocationQuery(position.coords.latitude, position.coords.longitude);
        let city = await this.getApiResponse(localWeatherQuery);
        return await this.getCityWeather(city.name);
    }

    async getWeatherNearby(latitude, longitude, citiesCount) {
        let weatherNearbyQuery = queriesService.getWeatherNearbyQuery(latitude, longitude, citiesCount);
        let data = await this.getApiResponse(weatherNearbyQuery);
        if(data != null) {
            return getNearestCities(data);
         }
         else {
             return null;
         }
    }
    
    async getApiResponse(query) {
        try {
            const response = await fetch(query);
            if(response.status === 200) {
                log('getApiResponse cod 200!');
                return await response.json();
            }
            else {
                // 401, 404
                log('getApiResponse error 401 or 404');
                return null;
            }
        } catch(err) {
            // if error in API.url or something else
            log('getApiResponse error on catch', err);
            return null;
        }
    }
}

export const cityService = new CityService();




function getPosition() {
    return new Promise((res, rej) => {
        navigator.geolocation.getCurrentPosition(res, rej);
    });
}

function getNearestCities(res) {
    return [
        // list[0] is the same as current city, so skip it
        new NearestCity(res.list[1].name, res.list[1].weather[0].icon, res.list[1].main.temp),
        new NearestCity(res.list[2].name, res.list[2].weather[0].icon, res.list[2].main.temp),
        new NearestCity(res.list[3].name, res.list[3].weather[0].icon, res.list[3].main.temp),
        new NearestCity(res.list[4].name, res.list[4].weather[0].icon, res.list[4].main.temp)
    ];
}