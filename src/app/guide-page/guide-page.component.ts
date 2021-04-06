import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalConfig } from 'src/global';
import { HttpService } from '../service/http.service';

@Component({
	selector: 'app-guide-page',
	templateUrl: './guide-page.component.html',
	styleUrls: ['./guide-page.component.css']
})
export class GuidePageComponent implements OnInit {
	noLeadershipList: boolean;
	leadershipList: any;
	cityObj: any;

	constructor(private router: Router, private http: HttpService) { }

	ngOnInit(): void {
		this.checkSessionStorage();
	}

	checkSessionStorage() {
		if (sessionStorage.cityObj) {
			let city = JSON.parse(sessionStorage.cityObj);
			this.cityObj = city;
			let cityId = city.id;
			this.getLeadershipListByCity(cityId)
		} else {
			let country = JSON.parse(sessionStorage.countryObj);
			let countryId = country.id;
			this.getLeadershipListByCountry(countryId)
		}
	}

	getLeadershipListByCity(cityId) {
		this.http.getLeadershipsService(cityId).subscribe((data: any) => {
			console.log(data)
			if (data.length === 0) {
				this.noLeadershipList = true;
			} else {
				this.leadershipList = data;
			}
		})
	}

	getLeadershipListByCountry(countryId) {
		this.http.getLeadershipByCountryService(countryId).subscribe((data: any) => {
			if (data.length === 0) {
				this.noLeadershipList = true;
			} else {
				this.leadershipList = data;
			}
		})
	}

	goSlideDown(item) {
		if (this.cityObj) {
			this.router.navigate(['/kazakhstan'], { fragment: item })
		} else {
			this.router.navigate(['/world-map'], { fragment: item })
		}
	}

	redirectToAuth() {
		window.location.href = GlobalConfig.ADMIN_URL;
	}

	redirectGuideItem(item) {
		console.log(item)
		let leadershipId = item.id;
		sessionStorage.setItem('leadershipId', leadershipId);
		sessionStorage.setItem('regionId', this.cityObj.id);
		this.router.navigate(['/guide-item'])
	}
}
