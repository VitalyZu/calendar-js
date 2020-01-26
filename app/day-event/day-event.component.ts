namespace DAY_EVENT {
  interface IRouteParamsService {
    [key: string]: string;
  }

  interface IDayEventController {
    day: string
    event: Array<any>
  }



  class DayEventController implements IDayEventController {
    day: string
    event: any[]
    constructor(private $routeParams: IRouteParamsService, private lsService: Array<any>) {
      this.day = this.$routeParams.day
      this.event = _.filter(this.lsService, ['date', this.day.toString()])
    }
  }

  class DayEventComponent implements ng.IComponentOptions {
    public controller: any = DayEventController;
    public controllerAs: string = '$ctrl';
    public templateUrl: string = 'day-event/day-event.template.html';
  }


  angular.
    module('dayEvent').
    component('dayEvent', new DayEventComponent())
}
