import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from "../service/http.service";
import { GlobalConfig } from "../../global";

@Component({
	selector: 'app-main',
	templateUrl: './main.component.html',
	styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
	kazFed: any;
	worldFed: any;
	langs: { id: number; name: string; title: string; }[];
	selectedLang: any = { id: 2, name: 'ENG', title: 'eng' };
	// selectedLang: any;

	constructor(public router: Router, private http: HttpService) { }

	ngOnInit(): void {
		console.log(this.selectedLang)
		this.getCountryList();
		this.getLangs();
	}

	getLangs() {
		this.langs = [
			{ id: 1, name: 'РУС', title: 'ru' },
			{ id: 2, name: 'ENG', title: 'eng' },
			{ id: 3, name: 'ҚАЗ', title: 'kaz' }
		]
	}

	selectLang(event) {
		console.log(event)
	}

	getCountryList() {
		this.http.getCountryListService().subscribe((data: any) => {
			console.log(data)
			data.forEach(element => {
				if (element.id === 1) {
					this.kazFed = element;
				} else if (element.id === 2) {
					this.worldFed = element;
				}
			});
		})
	}

	openKazMap() {
		this.router.navigate(['/kazakhstan'])
		if (this.kazFed) {
			sessionStorage.setItem('kazFederation', JSON.stringify(this.kazFed))
		}
	}

	openWorldMap() {
		this.router.navigate(['/world-map'])
		if (this.worldFed) {
			sessionStorage.setItem('worldFederation', JSON.stringify(this.worldFed))
		}
	}

	redirectToAuth() {
		window.location.href = GlobalConfig.ADMIN_URL;
	}

}
