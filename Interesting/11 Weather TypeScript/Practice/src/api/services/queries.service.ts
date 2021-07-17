import { API } from '../../environment/environment';

export class QueriesService {
    getCityWeatherQuery(sityName: string) {
        return `${API.url}/forecast?q=${sityName}&units=metric&appid=${API.key}`;
    }
    getWeatherByCurrentLocationQuery(latitude: number, longitude: number) {
        return `${API.url}/weather?lat=${latitude}&lon=${longitude}&appid=${API.key}`;
    }
    getWeatherNearbyQuery(latitude: number, longitude: number, citiesCount: number) {
        return `${API.url}/find?lat=${latitude}&lon=${longitude}&units=metric&cnt=${citiesCount}&appid=${API.key}`;
    }
}