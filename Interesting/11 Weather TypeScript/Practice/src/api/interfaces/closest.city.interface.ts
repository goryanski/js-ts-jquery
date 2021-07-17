import { ClosestCityTemperature } from "./closest.city.temperature";
import { Geo } from "./geo.interface";
import { WeatherInfo } from "./weather.info.interface";

export interface ClosestCity {
    clouds: Object;
    coord: Geo;
    dt: number;
    id: number;
    main: ClosestCityTemperature;
    name: string;
    rain: Object;
    snow: Object;
    sys: Object;
    weather: Array<WeatherInfo>;
    wind: Object;
    proto: Object;
}