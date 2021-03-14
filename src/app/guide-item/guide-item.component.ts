import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from '../service/http.service';
import { GlobalConfig } from "../../global";

@Component({
	selector: 'app-guide-item',
	templateUrl: './guide-item.component.html',
	styleUrls: ['./guide-item.component.css']
})
export class GuideItemComponent implements OnInit {
	leadershipItem: any;

	constructor(private http: HttpService, private router: Router) { }

	ngOnInit(): void {
		let leadershipId = sessionStorage.getItem('leadershipId');
		let countryId = sessionStorage.getItem('countryId');
		let regionId = sessionStorage.getItem('regionId');
		if (regionId) {
			this.getLeadershipByCity(leadershipId)
		} else if (countryId) {
			this.getLeadershipByCountry(leadershipId)
		}
	}

	redirectToAuth() {
		window.location.href = GlobalConfig.ADMIN_URL;
	}

	getLeadershipByCity(id) {
		this.http.getLeadershipByCityService(id).subscribe((data: any) => {
			console.log(data);
			this.leadershipItem = [];
			this.leadershipItem.push(data)
		})
	}

	getLeadershipByCountry(id) {
		this.http.getLeadershipByIdCountryService(id).subscribe((data: any) => {
			console.log(data);
			this.leadershipItem = [];
			this.leadershipItem.push(data);
		})
	}

	goSlideDown(item) {
		if (item === 'partners') {
			this.router.navigate(['/kazakhstan'], { fragment: 'partners' });
		} else if (item === 'contacts') {
			this.router.navigate(['/kazakhstan'], { fragment: 'contacts' });
		}
	}

}
