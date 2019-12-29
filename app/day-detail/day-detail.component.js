angular.
  module('dayDetail').
  component('dayDetail', {
    templateUrl: 'day-detail/day-detail.template.html',
    controller: ['$routeParams', 'lsService',
      function PhoneDetailController($routeParams, lsService) {
        that = this
        this.day = +$routeParams.day;
        this.event = _.find(lsService, ['id', this.day])
        this.days = _.filter(lsService, ['date', this.event.date])
        this.deleteEvent = function (id) {
          let array = lsService
          _.remove(array, function (item) {
            return item.id === id
          })
          localStorage.setItem('events', JSON.stringify(array))
          this.days = _.filter(lsService, ['date', this.event.date])
        }
      }
    ]
  });