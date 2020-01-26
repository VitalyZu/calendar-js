"use strict";
var EVENT_FORM;
(function (EVENT_FORM) {
    class EventFormController {
        constructor($scope, calendarFactory, lsService) {
            this.$scope = $scope;
            this.calendarFactory = calendarFactory;
            this.lsService = lsService;
            this.formInputs = {
                date: false,
                title: false,
                time: false,
                time1: true,
                users: true,
                direction: true,
                description: false
            };
            this.eventType = 'alarm';
            this.$scope._ = _;
            this.$scope.calendarFactory = calendarFactory;
            this.hourSelect = document.getElementById('hour-select');
            this.minSelect = document.getElementById('min-select');
            this.hour1Select = document.getElementById('hour1-select');
            this.min1Select = document.getElementById('min1-select');
            this.events = this.lsService;
            this.re = /\W/;
        }
        submitForm() {
            this.$scope.date ? this.calendarFactory.date = this.$scope.date : '';
            if (!(this.calendarFactory.date && this.$scope.title)) {
                return;
            }
            let dateSplit = this.calendarFactory.date;
            let date = dateSplit.split(this.re);
            date.forEach(function (v, i, a) {
                a[i] = v;
            });
            class Event {
                constructor(type, id, date, title, time, desc) {
                    this.type = type;
                    this.id = id;
                    this.date = date;
                    this.title = title;
                    this.time = time;
                    this.desc = desc;
                }
            }
            class Meet extends Event {
                constructor(type, id, date, title, time, desc, time1) {
                    super(type, id, date, title, time, desc);
                    this.time1 = time1;
                }
            }
            let eventObject;
            if (this.eventType === 'alarm') {
                eventObject = new Event('Alarm', new Date().getTime(), date.join('.'), this.$scope.title, this.hourSelect.value + ':' + this.minSelect.value, this.$scope.desc);
            }
            else if (this.eventType === 'meet') {
                eventObject = new Meet('Meet', new Date().getTime(), date.join('.'), this.$scope.title, this.hourSelect.value + ':' + this.minSelect.value, this.$scope.desc, this.hour1Select.value + ':' + this.min1Select.value);
            }
            this.events.push(eventObject);
            localStorage.setItem('events', JSON.stringify(this.events));
            this.$scope.title = '';
            this.$scope.date = '';
            this.$scope.users = '';
            this.$scope.desc = '';
            this.calendarFactory.hideForm = true;
        }
        hideForm(e) {
            if (e.target.id === 'modal') {
                this.$scope.title = '';
                this.$scope.date = '';
                this.$scope.users = '';
                this.$scope.desc = '';
                this.calendarFactory.hideForm = true;
            }
        }
        eventAlarm() {
            this.eventType = 'alarm';
            this.formInputs.users = true;
            this.formInputs.time1 = true;
            this.formInputs.direction = true;
        }
        eventMeeting() {
            this.eventType = 'meet';
            this.formInputs.users = false;
            this.formInputs.time1 = false;
            this.formInputs.direction = false;
        }
        eventChain() {
            this.eventType = 'chain';
            this.formInputs.users = false;
        }
        change() {
            console.log('change');
        }
    }
    class EventFormComponent {
        constructor() {
            this.controller = EventFormController;
            this.controllerAs = '$ctrl';
            this.templateUrl = 'event-form/event-form.template.html';
        }
    }
    angular.
        module('eventForm').
        component('eventForm', new EventFormComponent());
})(EVENT_FORM || (EVENT_FORM = {}));
