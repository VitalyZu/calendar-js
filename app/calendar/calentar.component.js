angular.module('calendar')
    .component('calendar', {
        templateUrl: 'calendar/calendar.template.html',
        controller: ['$scope', '$http', 'calendarFactory', 'lsService', function calendar($scope, $http, calendarFactory, lsService) {
            $scope.calendarFactory = calendarFactory
            this.calendarElement = document.getElementById('calendar')
            this.month = 12
            this.year = 2019
            this.hideForm = true
            this.createCalendar = function (elem, year, month) {
                let mon = month - 1
                let d = new Date(year, mon);
                this.r = Date.parse(d)
                let table = '<table><tr><th>Mo</th><th>Tu</th><th>We</th><th>Th</th><th>Fr</th><th>Sa</th><th>Su</th></tr><tr>'
                for (let i = 0; i < this.getDay(d); i++) {
                    table += '<td></td>';
                }
                while (d.getMonth() == mon) {
                    let eventDay = _.map(lsService, function (v) {
                        return Date.parse(v.date)
                    })
                    let day = new Date(this.year + '.' + this.month + '.' + d.getDate())
                    let mess = ''
                    lsService.forEach(function (v) {
                        Date.parse(v.date) === Date.parse(day) ? mess += ("<button><a href='#!/calendar/" + v.id + "'>" + v.title + "</a></button>") : ''
                    })
                    if (_.includes(eventDay, Date.parse(day))) { table += '<td class="red"><div class="eventday"><span>' + d.getDate() + '</span>' + mess + '</div></td>' } else { table += '<td class="blue">' + '<span>' + d.getDate() + '</span>' + '</td>' }
                    if (this.getDay(d) % 7 == 6) {
                        table += '</tr><tr>';
                    }
                    d.setDate(d.getDate() + 1);
                }
                if (this.getDay(d) != 0) {
                    for (let i = this.getDay(d); i < 7; i++) {
                        table += '<td></td>';
                    }
                }
                table += '</tr></table>';
                elem.innerHTML = table;
            }

            this.getDay = function (date) {
                let day = date.getDay()
                if (day == 0) day = 7
                return day - 1
            }
            this.prevMonth = function () {
                if (this.month === 1) {
                    this.year = --this.year
                    this.month = 12
                } else {
                    this.month = --this.month
                }
            }
            this.nextMonth = function () {
                if (this.month === 12) {
                    this.year = ++this.year
                    this.month = 1
                } else {
                    this.month = ++this.month
                }
            }
            this.pickDate = function (e) {
                console.log(e.target.tagName)
                let date
                if (e.target.tagName === 'SPAN') {
                    date = +e.target.innerHTML
                    calendarFactory.hideForm = false
                    if (date > 0) {
                        calendarFactory.date = `${this.year}.${this.month.toString().padStart(2, 0)}.${date.toString().padStart(2, 0)}`
                    }
                }
            }
            this.createEvent = function () {
                calendarFactory.hideForm = !calendarFactory.hideForm
                let d = new Date()
                calendarFactory.date = `${d.getFullYear()}.${d.getMonth() + 1}.${d.getDate()}`
            }
        }]
    })