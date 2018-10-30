import { Component, OnInit, Input } from '@angular/core';
import { IAppAdEvent } from '../ad.service';

@Component({
  selector: 'app-log-item',
  templateUrl: './log-item.component.html',
  styleUrls: ['./log-item.component.scss']
})
export class LogItemComponent {
  @Input() item: IAppAdEvent;

  get isImage(): boolean {
    return this.item.type === 'IMAGE';
  }
}
