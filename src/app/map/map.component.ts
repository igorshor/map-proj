import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AdService, SEC } from '../ad.service';
import { IAdEvent } from 'ubimo-fed-home-assigment';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  public displaysEvents: IAdEvent[] = [];
  @ViewChild('map') map: ElementRef;
  constructor(private adService: AdService) { }

  ngOnInit() {
    this.adService.adEvents.subscribe((adEvent: IAdEvent) => {
      this.displaysEvents.push(adEvent);
      setTimeout(() => this.remove(adEvent), 5 * SEC);
    });
  }

  isImage(ad: IAdEvent): boolean {
    return ad.type === 'IMAGE';
  }

  optimizeCoordinate(coordinate: number, width = true, threshold: number = 100) {
    if ((coordinate - threshold) < 0) {
      return threshold;
    }

    const mapWidth = this.map.nativeElement['offset' + width ? 'Width' : 'Height'];

    if ((mapWidth - (coordinate + threshold)) < 0) {
      return mapWidth - threshold;
    }

    return coordinate;
  }

  private remove(adEvent: IAdEvent) {
    const index = this.displaysEvents.indexOf(adEvent);
    if (index >= 0) {
      this.displaysEvents.splice(index, 1);
    }
  }
}
