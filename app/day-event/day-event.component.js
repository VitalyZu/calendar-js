"use strict";
var DAY_EVENT;
(function (DAY_EVENT) {
    class DayEventController {
        constructor($routeParams, lsService) {
            this.$routeParams = $routeParams;
            this.lsService = lsService;
            this.day = this.$routeParams.day;
            this.event = _.filter(this.lsService, ['date', this.day.toString()]);
        }
    }
    class DayEventComponent {
        constructor() {
            this.controller = DayEventController;
            this.controllerAs = '$ctrl';
            this.templateUrl = 'day-event/day-event.template.html';
        }
    }
    angular.
        module('dayEvent').
        component('dayEvent', new DayEventComponent());
})(DAY_EVENT || (DAY_EVENT = {}));
