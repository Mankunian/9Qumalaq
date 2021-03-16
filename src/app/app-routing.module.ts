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
import { ChampPageComponent } from './champ-page/champ-page.component';
import { PageChampInfoComponent } from './page-champ-info/page-champ-info.component';
import { GuideItemComponent } from './guide-item/guide-item.component';
// import { PartnersPageComponent } from './partners-page/partners-page.component';

const routes: Routes = [
	{ path: 'main', component: MainComponent },
	{ path: 'kazakhstan', component: KazakhstanComponent },
	{ path: 'world-map', component: WorldMapComponent },
	{ path: 'about-us', component: AboutUsComponent },
	{ path: 'guide-page', component: GuidePageComponent },
	{ path: 'guide-item', component: GuideItemComponent },
	{ path: 'guide-page-info', component: GuidePageInfoComponent },
	{ path: 'sign-in', component: SignInComponent },
	{ path: 'news-page', component: NewsPageComponent },
	// RegionInfo
	{ path: 'city/:id', component: RegionInfoComponent },
	{ path: 'country/:id', component: RegionInfoComponent },

	{ path: 'champ-page', component: ChampPageComponent },
	// Winners-page
	{ path: 'country/winners/:winnerId', component: PageChampInfoComponent },
	{ path: ':type/winners/:winnerId', component: PageChampInfoComponent },
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
