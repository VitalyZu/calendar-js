"use strict";
var CALENDAR;
(function (CALENDAR) {
    class CalendarController {
        constructor($scope, calendarFactory, lsService, LanguageService) {
            this.$scope = $scope;
            this.calendarFactory = calendarFactory;
            this.lsService = lsService;
            this.LanguageService = LanguageService;
            this.r = 1;
            this.tableHeader = '<table><tr><th>Mo</th><th>Tu</th><th>We</th><th>Th</th><th>Fr</th><th>Sa</th><th>Su</th></tr><tr>';
            this.headerCheck = false;
            this.$scope.calendarFactory = calendarFactory;
            this.calendarElement = document.getElementById('calendar');
            this.month = new Date().getMonth() + 1;
            this.year = new Date().getFullYear();
            this.hideForm = true;
        }
        translate() {
            let switchbtn = document.getElementById('switchbtn');
            let addbtn = document.getElementById('addbtn');
            if (!this.headerCheck) {
                let promise = this.LanguageService;
                let that = this;
                promise.then(function (res) {
                    that.tableHeader = res.data.tableHeaderRU;
                    that.headerCheck = true;
                    switchbtn.innerHTML = res.data.switchBtn;
                    addbtn.innerHTML = res.data.addbtn;
                });
            }
            else {
                this.headerCheck = false;
                this.tableHeader = '<table><tr><th>Mo</th><th>Tu</th><th>We</th><th>Th</th><th>Fr</th><th>Sa</th><th>Su</th></tr><tr>';
                switchbtn.innerHTML = 'Swich Language';
                addbtn.innerHTML = 'Add event';
            }
        }
        createCalendar(elem, year, month) {
            let mon = month - 1;
            let d = new Date(year, mon);
            this.r = Date.parse(String(d));
            let table = this.tableHeader;
            for (let i = 0; i < this.getDay(d); i++) {
                table += '<td></td>';
            }
            while (d.getMonth() == mon) {
                let eventDay = _.map(this.lsService, function (v) {
                    return Date.parse(v.date);
                });
                let day = new Date(this.year + '.' + this.month + '.' + d.getDate());
                let mess = '';
                this.lsService.forEach(function (v) {
                    Date.parse(v.date) === Date.parse(String(day)) ? mess += ("<button><a href='#!/calendar/" + v.id + "'>" + v.title + "</a></button>") : '';
                });
                if (_.includes(eventDay, Date.parse(String(day)))) {
                    table += '<td class="red"><div class="eventday"><span>' + d.getDate() + '</span>' + mess + '</div></td>';
                }
                else {
                    table += '<td class="blue">' + '<span>' + d.getDate() + '</span>' + '</td>';
                }
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
        getDay(date) {
            let day = date.getDay();
            if (day == 0)
                day = 7;
            return day - 1;
        }
        prevMonth() {
            if (this.month === 1) {
                this.year = --this.year;
                this.month = 12;
            }
            else {
                this.month = --this.month;
            }
        }
        nextMonth() {
            if (this.month === 12) {
                this.year = ++this.year;
                this.month = 1;
            }
            else {
                this.month = ++this.month;
            }
        }
        pickDate(e) {
            let date; //padStart
            if (e.target.tagName === 'SPAN') {
                date = +e.target.innerHTML;
                this.calendarFactory.hideForm = false;
                let year = this.year;
                let month = this.month;
                if (date > 0) {
                    this.calendarFactory.date = `${year}.${month.toString().padStart(2, '0')}.${date.toString().padStart(2, '0')}`;
                }
            }
        }
        createEvent() {
            this.calendarFactory.hideForm = !this.calendarFactory.hideForm;
            let d = new Date();
            let a = d.getMonth() + 1; //padStart
            this.calendarFactory.date = `${d.getFullYear()}.${a.padStart(2, '0')}.${d.getDate()}`;
        }
    }
    class CalendarComponent {
        constructor() {
            this.controller = CalendarController;
            this.controllerAs = '$ctrl';
            this.templateUrl = 'calendar/calendar.template.html';
        }
    }
    angular.
        module('calendar').
        component('calendar', new CalendarComponent());
})(CALENDAR || (CALENDAR = {}));
