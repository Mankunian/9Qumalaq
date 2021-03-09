import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from "../service/http.service";

@Component({
	selector: 'app-main',
	templateUrl: './main.component.html',
	styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
	kazFed: any;
	worldFed: any;

	constructor(public router: Router, private http: HttpService) { }

	ngOnInit(): void {
		this.getCountryList()
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
		sessionStorage.setItem('worldFederation', JSON.stringify(this.worldFed))
	}

	redirectToAuth() {
		window.location.href = "http://78.40.108.85/api/admin/login/?next=/api/admin/"
	}

}
