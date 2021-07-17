export class CurrentCity {
    constructor(data) {     
        this.name = data.city.name
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

    convertTime(unixTime){
        let dt = new Date(unixTime * 1000);
        let h = dt.getHours();
        let m = "0" + dt.getMinutes();
        let t = h + ":" + m.substr(-2);
        return t;
    }
}