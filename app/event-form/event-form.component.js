angular.module('eventForm')
    .component('eventForm', {
        templateUrl: 'event-form/event-form.template.html',
        controller: ['$scope', 'calendarFactory', 'lsService', function eventForm($scope, calendarFactory, lsService) {
            $scope._ = _
            $scope.calendarFactory = calendarFactory
            this.hourSelect = document.getElementById('hour-select')
            this.minSelect = document.getElementById('min-select')
            this.events = lsService
            this.re = /\W/
            this.submitForm = function () {
                console.log($scope.form)
                $scope.date ? calendarFactory.date = $scope.date : ''
                if (!(calendarFactory.date && $scope.title)) { return }
                let date = calendarFactory.date
                date = date.split(this.re)
                date.forEach(function(v,i,a){
                    a[i] = v.padStart(2,0)
                })
                this.events.push(
                    {
                        id: new Date().getTime(),
                        title: $scope.title,
                        time: this.hourSelect.value.padStart(2, 0) + ':' + this.minSelect.value.padStart(2, 0),
                        date: date.join('.'),
                        users: $scope.users,
                        desc: $scope.desc
                    })
                localStorage.setItem('events', JSON.stringify(this.events))
                $scope.title = ''
                $scope.date = ''
                $scope.users = ''
                $scope.desc = ''
                calendarFactory.hideForm = true
            }
            this.hideForm = function (e) {
                e.target.id === 'modal' ? calendarFactory.hideForm = true : ''
            }
        }]
    })