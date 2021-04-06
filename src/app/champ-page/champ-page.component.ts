import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalConfig } from 'src/global';
import { HttpService } from '../service/http.service';

@Component({
	selector: 'app-champ-page',
	templateUrl: './champ-page.component.html',
	styleUrls: ['./champ-page.component.css']
})
export class ChampPageComponent implements OnInit {
	noWinnersList: boolean;
	winnersList: any;

	constructor(private router: Router, private http: HttpService) { }

	ngOnInit(): void {
		this.checkSessionStorage();
	}

	checkSessionStorage() {
		if (sessionStorage.cityObj) {
			let city = JSON.parse(sessionStorage.cityObj);
			let locationId = city.id;
			this.getWinnersByCity(locationId)
		} else if (sessionStorage.countryObj) {
			let country = JSON.parse(sessionStorage.countryObj);
			let locationId = country.id;
			this.getWinnersByCountry(locationId)
		}
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

	goSlideDown(item) {
		if (item === 'partners') {
			this.router.navigate(['/kazakhstan'], { fragment: 'partners' });
		} else if (item === 'contacts') {
			this.router.navigate(['/kazakhstan'], { fragment: 'contacts' });
		}
	}

	redirectToAuth() {
		window.location.href = window.location.href = GlobalConfig.ADMIN_URL;
	}

}
