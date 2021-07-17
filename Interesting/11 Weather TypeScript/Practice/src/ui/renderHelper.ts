import { HourlyInfo } from '../api/interfaces/hourly.info.interface';
import { renderHourlyWeather } from './render';
import { $ } from './uiElements';

export function convertWindDir(deg: number) {
    let compass = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW', 'N'];
    let index = Math.round((deg % 360) / 22.5 );
    return compass[index];
}

export function getSeparateDaysWeather(list: Array<HourlyInfo>) {
    let separateDays = [];
    for(let i = 0; i < list.length; i++) {
        if(list[i].dt_txt.substring(11, 16) === '12:00') {
            separateDays.push(list[i]);
        }
    }
    // remove data for today
    if(new Date().getHours() < 12) {
        separateDays.shift();
    }
    return separateDays;
}

export function getDay(date: string) {
    let day = new Date(date).getDay();
    return DAYS[day];
}

export function getShortDate(date: string) {
    let newDate = new Date(date);
    let day = newDate.getDate() > 9 ? newDate.getDate() : '0' + newDate.getDate();
    let month = newDate.getMonth() >= 9 ? Number(newDate.getMonth()) + 1 : '0' + (Number(newDate.getMonth()) + 1);
    return day + '.' + month;
}

const DAYS = [
    'SUN',
    'MON',
    'TUE',
    'WED',
    'THU',
    'FRI',
    'SAT'
  ];





let prevSelectedDay: Element;

// for 5-days forecast, when you select days
export function subscribeDaysToSelect(extraInfo: Array<HourlyInfo>) {
    let daysToSelect = document.querySelectorAll('.five-day-forecast-block table td');
    for(let i = 0; i < daysToSelect.length; i++) {
        daysToSelect[0].classList.add('selected-day');
        prevSelectedDay = daysToSelect[0];
        // change styles
        (daysToSelect[i] as HTMLTableDataCellElement).onclick = function() {
            daysToSelect[i].classList.add('selected-day');
            if(prevSelectedDay !== daysToSelect[i]) {
                prevSelectedDay.classList.remove('selected-day');
            }

            prevSelectedDay =  daysToSelect[i];

            // change hourly weather by click
            if(i === 0) {
                $('main .hourly-weather-block').html(renderHourlyWeather(extraInfo));
            }
            else {
                let fullDaysData = getFullDaysWeather(extraInfo);
                $('main .hourly-weather-block').html(renderHourlyWeather(fullDaysData, i - 1));
            }
        };
    }
}

function getFullDaysWeather(list: Array<HourlyInfo>) {
    let fullDaysData: any = {
        six: [],
        nine: [],
        twelve: [],
        fifteen: [],
        eighteen: [],
        twentyOne: []
    };

    let newDate = new Date();
    for(let i = 0; i < list.length; i++) {
        // from tomorrow
        if(new Date(list[i].dt_txt).getDate() > newDate.getDate()) {
            if(list[i].dt_txt.substring(11, 16) === '06:00') {
                fullDaysData.six.push(list[i]);
            }
            if(list[i].dt_txt.substring(11, 16) === '09:00') {
                fullDaysData.nine.push(list[i]);
            }
            if(list[i].dt_txt.substring(11, 16) === '12:00') {
                fullDaysData.twelve.push(list[i]);
            }
            if(list[i].dt_txt.substring(11, 16) === '15:00') {
                fullDaysData.fifteen.push(list[i]);
            }
            if(list[i].dt_txt.substring(11, 16) === '18:00') {
                fullDaysData.eighteen.push(list[i]);
            }
            if(list[i].dt_txt.substring(11, 16) === '21:00') {
                fullDaysData.twentyOne.push(list[i]);
            }
        }
    }
    return fullDaysData;
}