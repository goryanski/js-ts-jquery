import axios from 'axios';
import { log } from '../../environment/environment';
import { CityWeather } from '../interfaces/city.weather.interface';
import { WeatherHearby } from '../interfaces/weather.nearby.interface';

export class ApiService {
    async getCityWeatherResponse(query: string): Promise<CityWeather> {
        return await this.getApiResponse(query);
    }
    async getLocalWeatherResponse(query: string): Promise<string> {
        const response = await this.getApiResponse(query);
        return response.name;
    }
    async getWeatherNearbyResponse(query: string): Promise<WeatherHearby> {
        return await this.getApiResponse(query);
    }
    async getApiResponse(query: string) {
        try {
            const response = await axios(query);
            if(response.status === 200) {
                return await response.data;
            }
            else {
                return null;
            }
        } 
        catch(err) {
            log('getApiResponse error', err);
            return null;
        }
    }
} 