import { ClosestCity } from "./closest.city.interface";

export interface WeatherHearby {
    cod: string;
    count: number;
    list: Array<ClosestCity>;
    message: string;
    proto: Object;
}