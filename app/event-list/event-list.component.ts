namespace EVENT_LIST {

    interface ICalendarFactory {
        hideForm: boolean
    }

    interface IMyScope extends ng.IScope {
        calendarFactory: ICalendarFactory
    }

    interface IEventListController {
        eventList: ICalendarFactory
        deleteEvent(id: number): void
        findDay(value: string, elem: boolean): void
    }

    class EventListController implements IEventListController {
        eventList: ICalendarFactory
        constructor(
            private $rootScope,
            private $scope: IMyScope,
            private calendarFactory: ICalendarFactory,
            private lsService: any
        ) {
            this.$scope.calendarFactory = this.calendarFactory
            this.eventList = this.lsService
        }

        deleteEvent = function (id: number): void {
            let array = this.lsService
            _.remove(array, function (item: any): boolean {
                return item.id === id
            })
            localStorage.setItem('events', JSON.stringify(array))
            this.eventList = this.lsService
            this.$rootScope.check = !this.$rootScope.check
        }
        
        findDay = function (value: string, elem: any): void {
            if (elem.$valid) {
                location.href = '#!/calendar/days/' + value.split('.').join('.')
            }
        }
    }

    class EventListComponent implements ng.IComponentOptions {
        public controller: any = EventListController;
        public controllerAs: string = '$ctrl';
        public templateUrl: string = 'event-list/event-list.template.html';
    }


    angular.
        module('eventList').
        component('eventList', new EventListComponent())
}
