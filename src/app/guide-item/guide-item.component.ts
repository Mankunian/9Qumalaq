import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from '../service/http.service';
import { GlobalConfig } from "../../global";
import { TranslateService } from '@ngx-translate/core';

@Component({
	selector: 'app-guide-item',
	templateUrl: './guide-item.component.html',
	styleUrls: ['./guide-item.component.css']
})
export class GuideItemComponent implements OnInit {
	leadershipItem: any;

	system: System = new System();
	langs = Array<Lang>();

	constructor(private http: HttpService, private router: Router, public translate: TranslateService) {
		this.getLangsList();
	}

	ngOnInit(): void {
		let leadershipId = sessionStorage.getItem('leadershipId');
		if (sessionStorage.cityObj) {
			this.getLeadershipByCity(leadershipId)
		} else if (sessionStorage.countryObj) {
			this.getLeadershipByCountry(leadershipId)
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
		this.ngOnInit();
	}

	redirectToAuth() {
		window.location.href = GlobalConfig.ADMIN_URL;
	}

	getLeadershipByCity(id) {
		let cityObj = JSON.parse(sessionStorage.cityObj);
		let regionId = cityObj.id;
		if (regionId) {
			this.http.getLeadershipByCityService(id).subscribe((data: any) => {
				console.log(data);
				this.leadershipItem = [];
				this.leadershipItem.push(data)
			})
		}

	}

	getLeadershipByCountry(id) {
		let countryObj = JSON.parse(sessionStorage.countryObj);
		let countryId = countryObj.id;
		if (countryId) {
			this.http.getLeadershipByIdCountryService(id).subscribe((data: any) => {
				console.log(data);
				this.leadershipItem = [];
				this.leadershipItem.push(data);
			})
		}
	}

	goSlideDown(item) {
		if (item === 'partners') {
			this.router.navigate(['/kazakhstan'], { fragment: 'partners' });
		} else if (item === 'contacts') {
			this.router.navigate(['/kazakhstan'], { fragment: 'contacts' });
		}
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