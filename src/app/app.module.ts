import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { MapComponent } from './map/map.component';
import { LogComponent } from './log/log.component';
import { LogItemComponent } from './log-item/log-item.component';
import { MapItemComponent } from './map-item/map-item.component';

@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    LogComponent,
    LogItemComponent,
    MapItemComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
