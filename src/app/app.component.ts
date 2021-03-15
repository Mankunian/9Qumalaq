import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
	system: System = new System();
	langs = Array<Lang>();
	constructor(public router: Router, public translate: TranslateService) { }

	redirectToAuth() { }

	ngOnInit() {
		this.getLangs();
	}

	getLangs() {
		this.langs = Array<Lang>();
		// this.colours.push(new Colour(-1, 'Выберите язык', 'select'));
		this.langs.push(new Lang(1, 'РУС', 'ru'));
		this.langs.push(new Lang(2, 'ENG', 'en'));
		this.langs.push(new Lang(2, 'ҚАЗ', 'kaz'));

		this.system = new System();
		this.system.lang = this.langs[0];

		let systemLang = this.system.lang.code;
		sessionStorage.setItem('lang', systemLang)
		this.translate.use(systemLang);
	}

	selectLang(e) { }

	scrollToElement($element, sectionName) { }
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