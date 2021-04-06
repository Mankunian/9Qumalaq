import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { KazakhstanComponent } from './kazakhstan/kazakhstan.component';
import { AppRoutingModule } from './app-routing.module';
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
import { HttpService } from './service/http.service';
// import { PartnersPageComponent } from './partners-page/partners-page.component';
import { HttpClientModule, HttpClient } from '@angular/common/http';


// import ngx-translate and the http loader
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { NewsListOnlyComponent } from './news-list-only/news-list-only.component';

@NgModule({
	declarations: [
		AppComponent,
		MainComponent,
		KazakhstanComponent,
		WorldMapComponent,
		AboutUsComponent,
		GuidePageComponent,
		SignInComponent,
		NewsPageComponent,
		RegionInfoComponent,
		GuidePageInfoComponent,
		ChampPageComponent,
		PageChampInfoComponent,
		GuideItemComponent,
		NewsListOnlyComponent,
	],
	imports: [
		BrowserModule,
		NgbModule,
		AppRoutingModule,
		HttpClientModule,
		FormsModule,
		TranslateModule.forRoot({
			loader: {
				provide: TranslateLoader,
				useFactory: HttpLoaderFactory,
				deps: [HttpClient],
			},
			useDefaultLang: false,
		})
	],
	providers: [HttpService],
	bootstrap: [AppComponent]
})
export class AppModule { }

// required for AOT compilation
export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
	return new TranslateHttpLoader(http);
}
