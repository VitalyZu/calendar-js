"use strict";
var EVENT_LIST;
(function (EVENT_LIST) {
    class EventListController {
        constructor($rootScope, $scope, calendarFactory, lsService) {
            this.$rootScope = $rootScope;
            this.$scope = $scope;
            this.calendarFactory = calendarFactory;
            this.lsService = lsService;
            this.deleteEvent = function (id) {
                let array = this.lsService;
                _.remove(array, function (item) {
                    return item.id === id;
                });
                localStorage.setItem('events', JSON.stringify(array));
                this.eventList = this.lsService;
                this.$rootScope.check = !this.$rootScope.check;
            };
            this.findDay = function (value, elem) {
                if (elem.$valid) {
                    location.href = '#!/calendar/days/' + value.split('.').join('.');
                }
            };
            this.$scope.calendarFactory = this.calendarFactory;
            this.eventList = this.lsService;
        }
    }
    class EventListComponent {
        constructor() {
            this.controller = EventListController;
            this.controllerAs = '$ctrl';
            this.templateUrl = 'event-list/event-list.template.html';
        }
    }
    angular.
        module('eventList').
        component('eventList', new EventListComponent());
})(EVENT_LIST || (EVENT_LIST = {}));
