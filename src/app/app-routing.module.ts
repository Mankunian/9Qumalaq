import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes, ExtraOptions } from '@angular/router';
import { MainComponent } from './main/main.component';
import { KazakhstanComponent } from './kazakhstan/kazakhstan.component';
import { WorldMapComponent } from './world-map/world-map.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { GuidePageComponent } from './guide-page/guide-page.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { NewsPageComponent } from './news-page/news-page.component';
import { RegionInfoComponent } from './region-info/region-info.component';
import { GuidePageInfoComponent } from './guide-page-info/guide-page-info.component';

const routes: Routes = [
	{ path: 'main', component: MainComponent },
	{ path: 'kazakhstan', component: KazakhstanComponent },
	{ path: 'world-map', component: WorldMapComponent },
	{ path: 'about-us', component: AboutUsComponent },
	{ path: 'guide-page', component: GuidePageComponent },
	{ path: 'guide-page-info', component: GuidePageInfoComponent },
	{ path: 'sign-in', component: SignInComponent },
	{ path: 'news-page', component: NewsPageComponent },
	{ path: 'region-info', component: RegionInfoComponent },
	{ path: '**', component: MainComponent },
	{ path: '', component: MainComponent },
];

const routerOptions: ExtraOptions = {
	useHash: false,
	anchorScrolling: 'enabled',
	scrollPositionRestoration: 'enabled'
};

@NgModule({
	declarations: [],
	imports: [
		CommonModule,
		RouterModule.forRoot(routes, routerOptions)
	],
	exports: [RouterModule]
})
export class AppRoutingModule { }
