angular.module('calendarApp', ['ngRoute','calendar', 'eventForm','eventList','dayDetail','dayEvent'])
    .constant('_', window._)
    .factory('calendarFactory', function () {

            return {
                hideForm: true
            }
    })
    .factory('lsService', function () {
        if (localStorage.events) {
            return JSON.parse(localStorage.events)
        } else {
            localStorage.events = '[]'
            return JSON.parse(localStorage.events)
        }
    })