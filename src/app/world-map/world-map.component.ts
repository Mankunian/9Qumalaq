import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { HttpService } from '../service/http.service';

@Component({
	selector: 'app-world-map',
	templateUrl: './world-map.component.html',
	styleUrls: ['./world-map.component.css']
})
export class WorldMapComponent implements OnInit {
	countryId: any;
	jsonCountry: any;
	leadershipList: any;
	newsList: any;
	winnerList: any;
	noLeadershipList: boolean;
	noNewsList: boolean;
	noWinnersList: boolean;

	system: System = new System();
	langs = Array<Lang>();

	constructor(public router: Router, private http: HttpService, public translate: TranslateService) {
		translate.setDefaultLang('ru');
	}

	ngOnInit(): void {
		this.getCountryList();
		this.getWorldFedElem();
		this.getLangsList();
	}

	scrollToElement($element, sectionName) {
		if (sectionName === 'about') {
			$element.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' })
		}
		else if (sectionName === 'guide') {
			$element.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' })
		}
		else if (sectionName === 'news') {
			$element.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' })
		}
		else if (sectionName === 'champs') {
			$element.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' })
		}
		else if (sectionName === 'partners') {
			$element.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' })
		}
		else if (sectionName === 'contacts') {
			$element.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' })
		}
	}

	getLangsList() {
		this.langs = Array<Lang>();
		this.langs.push(new Lang(1, 'РУС', 'ru'));
		this.langs.push(new Lang(2, 'ENG', 'en'));
		this.langs.push(new Lang(2, 'ҚАЗ', 'kaz'));
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
		sessionStorage.setItem('lang', e.code)
	}

	getWorldFedElem() {
		let worldId = JSON.parse(sessionStorage.getItem('worldFederation'))
		if (worldId) {
			let countryId = worldId.id;
			this.countryId = countryId;
			this.getLeadershipListByWorld(countryId);
			this.getNewsListByWorld(countryId);
			this.getWinnersListByWorld(countryId);
		}
	}

	getCountryList() {
		this.http.getCountryListService().subscribe(data => {
			console.log(data)
			this.jsonCountry = data;
		})
	}

	getLeadershipListByWorld(id) {
		this.http.getLeadershipByCountryService(id).subscribe((data: any) => {
			console.log(data);
			if (data.length === 0) {
				this.noLeadershipList = true;
			} else {
				this.leadershipList = data;
			}
		})
	}

	getNewsListByWorld(id) {
		this.http.getNewsByCountryService(id).subscribe((data: any) => {
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

	getWinnersListByWorld(id) {
		this.http.getWinnersByCountryService(id).subscribe((data: any) => {
			console.log(data);
			if (data.length === 0) {
				this.noWinnersList = true;
			} else {
				this.winnerList = data;
			}
		})
	}

	// Redirect Methods

	redirectLeadershipItem(item) {
		this.setSessionStorage();
		let leadershipId = item.id;
		sessionStorage.setItem('leadershipId', leadershipId);
		this.router.navigate(['/guide-item'])
	}

	redirectByClickMap(item) {
		let countryObj = {
			type: 'country',
			id: item.id
		}
		sessionStorage.removeItem('cityObj')
		sessionStorage.setItem('countryObj', JSON.stringify(countryObj));
		this.router.navigate(['/country', countryObj.id])
	}

	redirectNewsPage(item) {
		this.setSessionStorage();
		let newsId = item.id;
		sessionStorage.setItem('newsId', newsId)
		this.router.navigate(['/news-page'])
	}

	redirectToWinnersPage(item) {
		this.setSessionStorage();
		let winnerId = item.id;
		sessionStorage.setItem('winnerId', winnerId);
		this.router.navigate(['/country/winners', winnerId]);
	}

	redirectToAuth() {
		window.location.href = "http://back.aqyl.host/api/admin/login/?next=/api/admin/"
	}


	setSessionStorage() {
		let countryObj = {
			type: 'country',
			id: this.countryId
		}
		sessionStorage.setItem('countryObj', JSON.stringify(countryObj));
		sessionStorage.removeItem('cityObj');
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