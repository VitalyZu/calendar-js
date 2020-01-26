"use strict";
var DAY_DETAIL;
(function (DAY_DETAIL) {
    class DayDetailController {
        constructor($routeParams, lsService) {
            this.$routeParams = $routeParams;
            this.lsService = lsService;
            this.day = +this.$routeParams.day;
            this.event = _.find(this.lsService, ['id', this.day]);
            this.days = _.filter(this.lsService, ['date', this.event.date]);
        }
        deleteEvent(id) {
            let array = this.lsService;
            _.remove(array, function (item) {
                return item.id === id;
            });
            localStorage.setItem('events', JSON.stringify(array));
            this.days = _.filter(this.lsService, ['date', this.event.date]);
        }
    }
    class DayDetailComponent {
        constructor() {
            this.controller = DayDetailController;
            this.controllerAs = '$ctrl';
            this.templateUrl = 'day-detail/day-detail.template.html';
        }
    }
    angular.
        module('dayDetail').
        component('dayDetail', new DayDetailComponent());
})(DAY_DETAIL || (DAY_DETAIL = {}));
