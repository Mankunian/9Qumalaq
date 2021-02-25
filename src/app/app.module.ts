import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { KazakhstanComponent } from './kazakhstan/kazakhstan.component';
import { AppRoutingModule } from './app-routing.module';
import { WorldMapComponent } from './world-map/world-map.component';
import { WorldMapSvgComponent } from './world-map-svg/world-map-svg.component';
import { KzMapSvgComponent } from './kz-map-svg/kz-map-svg.component';


@NgModule({
	declarations: [
		AppComponent,
		MainComponent,
		KazakhstanComponent,
		WorldMapComponent,
		WorldMapSvgComponent,
		KzMapSvgComponent
	],
	imports: [
		BrowserModule,
		NgbModule,
		AppRoutingModule
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
