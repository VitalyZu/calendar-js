angular.
  module('calendarApp').
  config(['$routeProvider',
    function config($routeProvider) {
      $routeProvider.
        when('/calendar', {
          template: '<calendar></calendar><event-form></event-form><event-list></event-list>'
        }).
        when('/calendar/:day', {
          template: '<day-detail></day-detail>'
        }).
        when('/calendar/days/:day', {
          template: '<day-event></day-event>'
        }).
        otherwise('/calendar');
    }
  ]);