
namespace EVENT_FORM {

    interface IEvent {
        id: number
        title: string
        time: string
        date: string
        users?: string
        desc?: string
    }

    interface IFormView {
        date: boolean
        title: boolean
        time: boolean
        time1: boolean
        users: boolean
        direction: boolean
        description: boolean
    }

    interface IEventFormController {
        hourSelect: HTMLInputElement
        minSelect: HTMLInputElement
        events: any[]
        re: RegExp
        formInputs: IFormView
        eventType: string
        submitForm(): void
        hideForm(e: IFormEvent): void
        eventAlarm(): void
        eventMeeting(): void
        eventChain(): void
    }

    interface ICalendarFactory {
        hideForm: boolean
        date: string
    }

    interface IMyScope extends ng.IScope {
        _: any
        calendarFactory: ICalendarFactory
        date: string
        title: string
        users: string
        desc: string
    }

    interface IFormEvent {
        target: any;
    }

    class EventFormController implements IEventFormController {
        hourSelect: HTMLInputElement
        minSelect: HTMLInputElement
        hour1Select: HTMLInputElement
        min1Select: HTMLInputElement
        events: any[]
        re: RegExp
        formInputs: IFormView = {
            date: false,
            title: false,
            time: false,
            time1: true,
            users: true,
            direction: true,
            description: false
        }
        eventType = 'alarm'
        constructor(
            private $scope: IMyScope,
            private calendarFactory: ICalendarFactory,
            private lsService: Array<any>
        ) {
            this.$scope._ = _
            this.$scope.calendarFactory = calendarFactory
            this.hourSelect = <HTMLInputElement>document.getElementById('hour-select')!
            this.minSelect = <HTMLInputElement>document.getElementById('min-select')!
            this.hour1Select = <HTMLInputElement>document.getElementById('hour1-select')!
            this.min1Select = <HTMLInputElement>document.getElementById('min1-select')!
            this.events = this.lsService
            this.re = /\W/
        }
        submitForm(): void {
            this.$scope.date ? this.calendarFactory.date = this.$scope.date : ''
            if (!(this.calendarFactory.date && this.$scope.title)) { return }
            let dateSplit: string = this.calendarFactory.date
            let date: string[] = dateSplit.split(this.re)
            date.forEach(function (v: string, i: number, a: string[]) {
                a[i] = v
            })

            class Event {
                constructor(
                    private type: string,
                    private id: number,
                    private date: string,
                    private title: string,
                    private time: string,
                    private desc: string) { }
            }

            class Meet extends Event {
                constructor(type, id, date, title, time, desc, private time1: string) {
                    super(type, id, date, title, time, desc)
                }
            }
            let eventObject
            if (this.eventType === 'alarm') {
                eventObject = new Event(
                    'Alarm',
                    new Date().getTime(),
                    date.join('.'),
                    this.$scope.title,
                    this.hourSelect.value + ':' + this.minSelect.value,
                    this.$scope.desc
                )
            } else if (this.eventType === 'meet') {
                eventObject = new Meet(
                    'Meet',
                    new Date().getTime(),
                    date.join('.'),
                    this.$scope.title,
                    this.hourSelect.value + ':' + this.minSelect.value,
                    this.$scope.desc,
                    this.hour1Select.value + ':' + this.min1Select.value,
                )
            }
            this.events.push(eventObject)
            localStorage.setItem('events', JSON.stringify(this.events))
            this.$scope.title = ''
            this.$scope.date = ''
            this.$scope.users = ''
            this.$scope.desc = ''
            this.calendarFactory.hideForm = true
        }
        hideForm(e: IFormEvent): void {
            if (e.target.id === 'modal') {
                this.$scope.title = ''
                this.$scope.date = ''
                this.$scope.users = ''
                this.$scope.desc = ''
                this.calendarFactory.hideForm = true
            }
        }
        eventAlarm() {
            this.eventType = 'alarm'
            this.formInputs.users = true
            this.formInputs.time1 = true
            this.formInputs.direction = true
        }
        eventMeeting() {
            this.eventType = 'meet'
            this.formInputs.users = false
            this.formInputs.time1 = false
            this.formInputs.direction = false
        }
        eventChain() {
            this.eventType = 'chain'
            this.formInputs.users = false
        }
        change(){
            console.log('change')
        }
    }

    class EventFormComponent implements ng.IComponentOptions {
        public controller: any = EventFormController;
        public controllerAs: string = '$ctrl';
        public templateUrl: string = 'event-form/event-form.template.html';
    }


    angular.
        module('eventForm').
        component('eventForm', new EventFormComponent())
}

