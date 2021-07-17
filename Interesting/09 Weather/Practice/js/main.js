'use strict';
import { loadDefaultWeather } from './ui/load.js';
import { subscribe } from './ui/events.js';

(async function(){
    loadDefaultWeather();
    subscribe();
}())

