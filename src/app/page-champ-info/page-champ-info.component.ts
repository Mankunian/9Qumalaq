import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from '../service/http.service';
import { GlobalConfig } from "../../global";

@Component({
	selector: 'app-page-champ-info',
	templateUrl: './page-champ-info.component.html',
	styleUrls: ['./page-champ-info.component.css']
})
export class PageChampInfoComponent implements OnInit {
	winnerElement: any;
	description: any;

	constructor(private router: Router, private http: HttpService) { }

	ngOnInit(): void {
		let winnerId = sessionStorage.getItem('winnerId');
		if (sessionStorage.cityObj) {
			// let regionId = JSON.parse(sessionStorage.cityObj.id);
			this.getWinnerItemByRegion(winnerId)
		} else {
			// let countryId = JSON.parse(sessionStorage.countryObj.id);
			this.getWinnerItemByCountry(winnerId);
		}
	}

	goSlideDown(item) {
		if (item === 'partners') {
			this.router.navigate(['/kazakhstan'], { fragment: 'partners' });
		} else if (item === 'contacts') {
			this.router.navigate(['/kazakhstan'], { fragment: 'contacts' });
		}
	}

	redirectToAuth() {
		window.location.href = GlobalConfig.ADMIN_URL;
	}

	getWinnerItemByRegion(winnerId) {
		this.http.getWinnerByIdService(winnerId).subscribe((data: any) => {
			console.log(typeof (data))
			this.winnerElement = [];
			this.winnerElement.push(data)
			this.winnerElement.forEach(element => {
				let description = element.description;
				description = description.split(".")
				this.description = description;
			});
		})
	}

	getWinnerItemByCountry(winnerId) {
		this.http.getWinnerByIdCountryService(winnerId).subscribe((data: any) => {
			console.log(data);
			this.winnerElement = [];
			this.winnerElement.push(data)
			this.winnerElement.forEach(element => {
				let description = element.description;
				description = description.split(".")
				this.description = description;
			});
		})
	}

}
