import { CityInfo } from './city.info.interface';
import { HourlyInfo } from './hourly.info.interface';

export interface CityWeather {
    city: CityInfo;
    cnt: number;
    cod: number;
    list: Array<HourlyInfo>;
    message: number;
    proto: Object;
}