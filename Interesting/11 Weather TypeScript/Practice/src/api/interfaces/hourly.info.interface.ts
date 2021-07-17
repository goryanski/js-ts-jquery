import { TemperatureInfo } from './temperature.info.interface';
import { WeatherInfo } from './weather.info.interface';
import { WindInfo } from './wind.info.interface';

export interface HourlyInfo {
    clouds: Object;
    dt: number
    dt_txt: string;
    main: TemperatureInfo;
    pop: number;
    rain: Object;
    sys: Object;
    visibility: number;
    weather: Array<WeatherInfo>;
    wind: WindInfo;
    proto: Object;
}