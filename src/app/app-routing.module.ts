import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { KazakhstanComponent } from './kazakhstan/kazakhstan.component';
import { WorldMapComponent } from './world-map/world-map.component';

const routes: Routes = [
	{ path: 'main', component: MainComponent },
	{ path: 'kazakhstan', component: KazakhstanComponent },
	{ path: 'world-map', component: WorldMapComponent },
	{ path: '**', component: MainComponent },
	{ path: '', component: MainComponent },

];

@NgModule({
	declarations: [],
	imports: [
		CommonModule,
		RouterModule.forRoot(routes)
	],
	exports: [RouterModule]
})
export class AppRoutingModule { }
