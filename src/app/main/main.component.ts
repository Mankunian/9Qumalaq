import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from "../service/http.service";
import { GlobalConfig } from "../../global";
import { TranslateService } from '@ngx-translate/core';

@Component({
	selector: 'app-main',
	templateUrl: './main.component.html',
	styleUrls: ['./main.component.css'],
})
export class MainComponent implements OnInit {
	kazFed: any;
	worldFed: any;

	system: System = new System();
	langs = Array<Lang>();
	kazakhstanId: any;
	worldFederationId: any;

	constructor(public router: Router, private http: HttpService, public translate: TranslateService) {
		translate.setDefaultLang('en');
	}

	ngOnInit(): void {
		this.getCountryList();
		this.getLangs();
	}

	getLangs() {
		this.langs = Array<Lang>();
		// this.colours.push(new Colour(-1, 'Выберите язык', 'select'));
		this.langs.push(new Lang(1, 'РУС', 'ru'));
		this.langs.push(new Lang(2, 'ENG', 'en'));
		this.langs.push(new Lang(2, 'ҚАЗ', 'kz'));

		this.system = new System();
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
			let systemLang = this.system.lang.code;
			sessionStorage.setItem('lang', systemLang)
			this.translate.use(systemLang);
		}
	}

	selectLang(e): void {
		this.translate.use(e.code);
		sessionStorage.setItem('lang', e.code)
	}

	getCountryList() {
		this.kazakhstanId = 4;
		this.worldFederationId = 3;
		this.http.getCountryListService().subscribe((data: any) => {
			console.log(data)
			data.forEach(element => {
				if (element.id === this.kazakhstanId) {
					this.kazFed = element;
				} else if (element.id === this.worldFederationId) {
					this.worldFed = element;
				}
			});
		})
	}

	openKazMap() {
		this.router.navigate(['/kazakhstan'])
		if (this.kazFed) {
			let countryObj = {
				type: 'country',
				id: this.kazakhstanId
			}
			sessionStorage.setItem('countryObj', JSON.stringify(countryObj));
			sessionStorage.setItem('kazFederation', JSON.stringify(this.kazFed));
			sessionStorage.removeItem('worldFederation');
		}
	}

	openWorldMap() {
		this.router.navigate(['/world-map'])
		if (this.worldFed) {

			sessionStorage.setItem('worldFederation', JSON.stringify(this.worldFed));
			sessionStorage.removeItem('kazFederation');
		}
	}

	redirectToAuth() {
		window.location.href = GlobalConfig.ADMIN_URL;
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
