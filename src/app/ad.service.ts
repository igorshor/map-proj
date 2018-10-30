import { Injectable } from '@angular/core';
import { adDispatcher, IAdEvent, AdDispatcher } from 'ubimo-fed-home-assigment';
import { Observable } from 'rxjs';
export const SEC = 1000;
export interface IAppAdEvent extends IAdEvent {
  time: number;
}

@Injectable({
  providedIn: 'root'
})
export class AdService {
  public events: IAppAdEvent[] = [];

  get adEvents(): Observable<IAdEvent> {
    return adDispatcher.adEvents$;
  }

  constructor() {
    // tslint:disable-next-line:no-unused-expression
    new AdDispatcher();
    adDispatcher.adEvents$.subscribe((adEvent: IAdEvent) => this.events.push({ ...adEvent, time: Date.now() }));
  }

  filter(startStr: string, endStr: string, prevFilterdLogs: IAppAdEvent[]): IAppAdEvent[] {
    let needToUpdate = false;
    let filterdLogs: IAppAdEvent[];
    const start = +startStr;

    const end = +endStr;
    if (!start && !end) {
      if (prevFilterdLogs) {
        needToUpdate = true;
      }
    } else if (!start) {
      filterdLogs = this.events.filter((ad: IAppAdEvent) => ad.time <= end);
    } else if (!end) {
      filterdLogs = this.events.filter((ad: IAppAdEvent) => ad.time >= start);
    } else {
      filterdLogs = this.events.filter((ad: IAppAdEvent) => ad.time >= start && ad.time <= end);
    }

    if (filterdLogs) {
      if (prevFilterdLogs && prevFilterdLogs.length === filterdLogs.length) {
        needToUpdate = !filterdLogs.every((ad: IAppAdEvent, index: number) => ad === prevFilterdLogs[index]);
      } else {
        needToUpdate = true;
      }
    }

    if (needToUpdate) {
      return needToUpdate ? filterdLogs : prevFilterdLogs;
    }
  }
}
