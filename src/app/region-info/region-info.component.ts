import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { GlobalConfig } from 'src/global';
import { HttpService } from '../service/http.service';
import { SharedService } from '../service/shared.service';

@Component({
	selector: 'app-region-info',
	templateUrl: './region-info.component.html',
	styleUrls: ['./region-info.component.css'],
	providers: [NgbCarouselConfig]  // add NgbCarouselConfig to the component providers

})
export class RegionInfoComponent implements OnInit {
	regionId: any;
	regionName: any;
	winnersList: any;
	newsList: any;
	leadershipList: any;
	noLeadershipList: boolean;
	noNewsList: boolean;
	noWinnersList: boolean;
	type: any;
	locationId: any;
	cityObj: any;
	countryObj: any;

	system: System = new System();
	langs = Array<Lang>();

	constructor(
		config: NgbCarouselConfig,
		private router: Router,
		private http: HttpService, public translate: TranslateService) {
		config.interval = 5000;
		config.keyboard = true;
		config.pauseOnHover = true;

		translate.setDefaultLang('ru');
	}

	ngOnInit(): void {
		this.getLangsList();
		this.checkSessionStorage();
		if (sessionStorage.cityObj) {
			this.getRegionIdMap();
		} else if (sessionStorage.countryObj) {
			this.getCountryIdMap();
		}
	}

	getLangsList() {
		this.langs = Array<Lang>();
		this.langs.push(new Lang(1, 'РУС', 'ru'));
		this.langs.push(new Lang(2, 'ENG', 'en'));
		this.langs.push(new Lang(2, 'ҚАЗ', 'kz'));
		this.system = new System();

		// set lang to select option
		this.setLangSelectOption();
	}

	setLangSelectOption() {
		let lang = sessionStorage.getItem('lang');
		if (lang) {
			this.langs.forEach((element, index) => {
				if (element.code === lang) {
					this.system.lang = this.langs[index]
					this.translate.use(element.code);
				}
			});
		} else {
			this.system.lang = this.langs[0];
		}
	}

	selectLang(e): void {
		this.translate.use(e.code);
		sessionStorage.setItem('lang', e.code);
		this.checkSessionStorage();
		if (sessionStorage.cityObj) {
			this.getRegionIdMap();
		} else if (sessionStorage.countryObj) {
			this.getCountryIdMap();
		}
	}

	checkSessionStorage() {
		if (sessionStorage.cityObj) {
			let city = JSON.parse(sessionStorage.cityObj);
			this.cityObj = city;
			this.type = city.type;
			this.locationId = city.id;
		} else if (sessionStorage.countryObj) {
			let country = JSON.parse(sessionStorage.countryObj);
			this.countryObj = country;
			this.type = country.type;
			this.locationId = country.id;
		}
	}

	// Метод получения id региона если есть в sessionStorage
	getRegionIdMap() {
		let regionId = this.locationId;
		this.getNewsByCity(regionId);
		this.getLeadershipsByCity(regionId);
		this.getWinnersByCity(regionId);
		this.getCityList(regionId);
	}

	// Метод получения id страны если есть в sessionStorage
	getCountryIdMap() {
		let countryId = this.locationId;
		this.getNewsByCountry(countryId);
		this.getLeadershipByCountry(countryId);
		this.getWinnersByCountry(countryId);
		this.getCountryList(countryId)
	}

	goSlideDown(item) {
		if (this.cityObj) {
			this.router.navigate(['/kazakhstan'], { fragment: item })
		} else {
			this.router.navigate(['/world-map'], { fragment: item })
		}

	}

	// City API
	getNewsByCity(regionId) {
		this.http.getNewsService(regionId).subscribe((data: any) => {
			console.log(data)
			if (data.length === 0) {
				this.noNewsList = true;
			} else {
				this.newsList = data;
				this.newsList.forEach(element => {
					let time = Date.parse(element.published)
					console.log(time)

					let s = new Date(time).toLocaleDateString();
					element.published = s;
				});
			}
		})
	}

	getLeadershipsByCity(regionId) {
		this.http.getLeadershipsService(regionId).subscribe((data: any) => {
			console.log(data)
			if (data.length === 0) {
				this.noLeadershipList = true;
			} else {
				this.leadershipList = data;
			}
		})
	}

	getWinnersByCity(regionId) {
		this.http.getWinnersService(regionId).subscribe((data: any) => {
			console.log(data)
			if (data.length === 0) {
				this.noWinnersList = true;
			} else {
				this.winnersList = data;
			}
		})
	}


	getCityList(regionId) {
		this.http.getCityListService().subscribe((data: any) => {
			console.log(data)
			data.forEach(element => {
				if (regionId * 1 === element.id) {
					this.regionName = element.name
				}
			});
		})
	}



	// Country API

	getCountryList(countryId) {
		this.http.getCountryListService().subscribe((data: any) => {
			data.forEach(element => {
				if (countryId * 1 === element.id) {
					this.regionName = element.name
				}
			});
		})
	}


	getNewsByCountry(countryId) {
		this.http.getNewsByCountryService(countryId).subscribe((data: any) => {
			console.log(data)
			if (data.length === 0) {
				this.noNewsList = true;
			} else {
				this.newsList = data;
				this.newsList.forEach(element => {
					let time = Date.parse(element.published)
					console.log(time)

					let s = new Date(time).toLocaleDateString();
					element.published = s;
				});
			}
		})
	}

	getLeadershipByCountry(countryId) {
		this.http.getLeadershipByCountryService(countryId).subscribe((data: any) => {
			if (data.length === 0) {
				this.noLeadershipList = true;
			} else {
				this.leadershipList = data;
			}
		})
	}


	getWinnersByCountry(countryId) {
		this.http.getWinnersByCountryService(countryId).subscribe((data: any) => {
			console.log(data)
			if (data.length === 0) {
				this.noWinnersList = true;
			} else {
				this.winnersList = data;
			}
		})
	}

	redirectNewsPage(item) {
		let newsId = item.id;
		sessionStorage.setItem('newsId', newsId)
		this.router.navigate(['/news-page'])
	}

	redirectToWinnersPage(item) {
		let winnerId = item.id;
		sessionStorage.setItem('winnerId', winnerId);
		if (sessionStorage.cityObj) {
			let cityObj = JSON.parse(sessionStorage.cityObj);
			this.router.navigate(['/' + cityObj.type + '/winners' + '/' + winnerId])
		} else {
			let countryObj = JSON.parse(sessionStorage.countryObj);
			this.router.navigate(['/' + countryObj.type + '/winners' + '/' + winnerId]);
		}
	}

	redirectGuideItem(item) {
		console.log(item);
		let leadershipId = item.id;
		sessionStorage.setItem('leadershipId', leadershipId);
		this.router.navigate(['/guide-item'])
	}

	redirectToAuth() {
		window.location.href = GlobalConfig.ADMIN_URL;
	}


	// Redirect from navbar menu


	redirectNewsList() {
		this.router.navigate(['/' + this.type + '/' + this.locationId + '/' + 'news'])
	}

	redirectWinnersList() {
		this.router.navigate(['/' + this.type + '/' + this.locationId + '/' + 'winners'])
	}

}

export class System {
	lang: Lang;
}

export class Lang {
	constructor(id: number, name: string, code: string) {
		this.id = id;
		this.name = name;
		this.code = code;
	}

	id: number;
	name: string;
	code: string;
}