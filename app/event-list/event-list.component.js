angular.module('eventList')
    .component('eventList', {
        templateUrl: 'event-list/event-list.template.html',
        controller: ['$scope', '$http', 'calendarFactory', 'lsService', function eventForm($scope, $http, calendarFactory, lsService) {
            $scope.calendarFactory = calendarFactory
            this.eventList = lsService
            this.deleteEvent = function(id){
                let array = lsService
                _.remove(array,function(item){
                    console.log(item)
                    return item.id === id
                })
                localStorage.setItem('events',JSON.stringify(array))
            }
            this.findDay = function(value,elem) {
                if(elem.$valid){
                    location.href = '#!/calendar/days/'+value.split('.').join('.')
                }
            }

        }]
    })