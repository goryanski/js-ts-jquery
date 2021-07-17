import { CityWeather } from "../api/interfaces/city.weather.interface";
import { HourlyInfo } from "../api/interfaces/hourly.info.interface";

export class CurrentCityModel {
    name: string;
    sunrise: string;
    sunset: string;
    latitude: number;
    longitude: number;
    weatherDescription: string;
    weatherIcon: string;
    temperature: number;
    realTemperature: number;
    extraInfo: Array<HourlyInfo>;

    constructor(data: CityWeather) {     
        this.name = data.city.name;
        this.sunrise = this.convertTime(data.city.sunrise);
        this.sunset = this.convertTime(data.city.sunset);
        this.latitude = data.city.coord.lat;
        this.longitude = data.city.coord.lon;
        this.weatherDescription = data.list[0].weather[0].description;
        this.weatherIcon = data.list[0].weather[0].icon;
        this.temperature = Math.round(data.list[0].main.temp);
        this.realTemperature = Math.round(data.list[0].main.feels_like);
        this.extraInfo = data.list;
    }

    convertTime(unixTime: number): string {
        let dt = new Date(unixTime * 1000);
        let h = dt.getHours();
        let m = "0" + dt.getMinutes();
        let t = h + ":" + m.substr(-2);
        return t;
    }
}