import { WeatherHearby } from '../api/interfaces/weather.nearby.interface';
import { ApiService } from '../api/services/api.service';
import { QueriesService } from '../api/services/queries.service';
import { Coords } from '../interfaces/coords.interface';
import { CurrentCityModel } from '../models/current.city.model';
import { NearestCity } from '../models/nearest.city.model';

export class CityService {
    private remoteData: CurrentCityModel;
    private apiService: ApiService;
    private queriesService: QueriesService;

    constructor() {
        this.remoteData = null;
        this.apiService = new ApiService();
        this.queriesService = new QueriesService();
    }

    get data() {
        return this.remoteData;
    }

    async getCityWeather(cityName: string) {
        let cityWeatherQuery = this.queriesService.getCityWeatherQuery(cityName);
        let data = await this.apiService.getApiResponse(cityWeatherQuery);

        if(data != null) {
            let currentCityData = new CurrentCityModel(data);
            this.remoteData = currentCityData;
            return currentCityData;
        }
        else {
            return null;
        }
    }

    async getWeatherByCurrentLocation() {
        let position = await getPosition();
        let localWeatherQuery = this.queriesService.getWeatherByCurrentLocationQuery(position.lat, position.lng);

        let localCityName =  await this.apiService.getLocalWeatherResponse(localWeatherQuery);
        return await this.getCityWeather(localCityName);
    }

    async getWeatherNearby(latitude: number, longitude: number, citiesCount: number) {
        let weatherNearbyQuery = this.queriesService.getWeatherNearbyQuery(latitude, longitude, citiesCount);
        let data = await this.apiService.getWeatherNearbyResponse(weatherNearbyQuery);

        if(data != null) {
            return getNearestCities(data);
         }
         else {
             return null;
         }
    }
}

export const cityService = new CityService();



function getPosition()  {
    return new Promise<Coords>((resolve) => {
        navigator.geolocation.getCurrentPosition((res) => {
            resolve({
                lat: res.coords.latitude,
                lng: res.coords.longitude
            });
        });
    });
}

function getNearestCities(res: WeatherHearby) {
    return [
        // list[0] is the same as current city, so skip it
        new NearestCity(res.list[1].name, res.list[1].weather[0].icon, res.list[1].main.temp),
        new NearestCity(res.list[2].name, res.list[2].weather[0].icon, res.list[2].main.temp),
        new NearestCity(res.list[3].name, res.list[3].weather[0].icon, res.list[3].main.temp),
        new NearestCity(res.list[4].name, res.list[4].weather[0].icon, res.list[4].main.temp)
    ];
}