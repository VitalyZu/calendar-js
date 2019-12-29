angular.
  module('dayEvent').
  component('dayEvent', {
    templateUrl: 'day-event/day-event.template.html',
    controller: ['$routeParams', 'lsService',
      function PhoneDetailController($routeParams, lsService) {
        this.day = $routeParams.day;
        this.event = _.filter(lsService, ['date', this.day.toString()])
      }
    ]
  });