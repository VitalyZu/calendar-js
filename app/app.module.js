"use strict";
class LanguageService {
    constructor($http, $q) {
        this.$http = $http;
        this.$q = $q;
        var deferred = this.$q.defer();
        deferred.resolve(this.$http.get('http://127.0.0.1:8888/lang.config.ru.json'));
        return deferred.promise;
    }
}
angular.module('calendarApp', ['ngRoute', 'calendar', 'eventForm', 'eventList', 'dayDetail', 'dayEvent'])
    .constant('_', window._)
    .factory('calendarFactory', function () {
    return { hideForm: true };
})
    .factory('lsService', function () {
    const lStorage = localStorage.getItem('events');
    console.log(lStorage && !(lStorage !== 'undefined'));
    if (lStorage && !(lStorage === 'undefined')) {
        return JSON.parse(localStorage.events);
    }
    else {
        localStorage.setItem('events', '[]');
        return JSON.parse(localStorage.events);
    }
})
    .service('LanguageService', LanguageService)
    .run(function ($rootScope) {
    $rootScope.eventsCheck = true;
});
