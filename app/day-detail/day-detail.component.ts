namespace DAY_DETAIL {
  interface IRouteParamsService {
    [key: string]: string;
  }

  interface IDayDetailController {
    day: number
    event: IEvent
    days: Array<any>
    deleteEvent(id: number): void
  }

  interface IEvent {
    id: number
    title: string
    time: string
    date: string
    users?: string
    desc?: string
  }

  interface IRemoveElement {
    id: number
  }

  class DayDetailController implements IDayDetailController {
    day: number
    event: IEvent
    days: Array<any>
    constructor(private $routeParams: IRouteParamsService, private lsService: Array<any>) {
      this.day = +this.$routeParams.day;
      this.event = _.find(this.lsService, ['id', this.day])
      this.days = _.filter(this.lsService, ['date', this.event.date])
    }
    deleteEvent(id: number): void {
      let array = this.lsService
      _.remove(array, function (item: IRemoveElement) {
        return item.id === id
      })
      localStorage.setItem('events', JSON.stringify(array))
      this.days = _.filter(this.lsService, ['date', this.event.date])
    }
  }

  class DayDetailComponent implements ng.IComponentOptions {
    public controller: any = DayDetailController;
    public controllerAs: string = '$ctrl';
    public templateUrl: string = 'day-detail/day-detail.template.html';
  }


  angular.
    module('dayDetail').
    component('dayDetail', new DayDetailComponent())

}
