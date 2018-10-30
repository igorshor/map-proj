import { Component, OnInit } from '@angular/core';
import { AdService, IAppAdEvent, SEC } from '../ad.service';

@Component({
  selector: 'app-log',
  templateUrl: './log.component.html',
  styleUrls: ['./log.component.scss']
})
export class LogComponent implements OnInit {
  start: string;
  end: string;

  private _filterdLogs: IAppAdEvent[];
  private _subscription: any;

  get logs(): IAppAdEvent[] {
    if (this._filterdLogs) {
      return this._filterdLogs;
    }

    return this.adService.events;
  }

  filter() {
    if (this._subscription) {
      clearTimeout(this._subscription);
    }

    this._subscription = setTimeout(() => {
      this._filterdLogs = this.adService.filter(this.start, this.end, this._filterdLogs);
      this._subscription = null;
    }, SEC);
  }

  constructor(private adService: AdService) { }

  ngOnInit() {
  }

}
