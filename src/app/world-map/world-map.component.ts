import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

	constructor(private http: HttpService, private router: Router) { }

	ngOnInit(): void {
		let worldId = JSON.parse(sessionStorage.getItem('worldFederation'))
		if (worldId) {
			let countryId = worldId.id;
			this.getCountryList();
			this.getLeadershipList(countryId);
			this.getNewsList(countryId);
			this.getWinnersList(countryId);
		}
	}

	redirect(item) {
		console.log(item)
		let countryId = item.id;
		sessionStorage.setItem('countryId', countryId);
		sessionStorage.removeItem('regionId')
		this.router.navigate(['/world', countryId])
	}


	getCountryList() {
		this.http.getCountryListService().subscribe(data => {
			console.log(data)
			this.jsonCountry = data;
		})
	}

	getLeadershipList(id) {
		this.http.getLeadershipByCountryService(id).subscribe((data: any) => {
			console.log(data);
			if (data.length === 0) {
				this.noLeadershipList = true;
			} else {
				this.leadershipList = data;
			}
		})
	}

	getNewsList(id) {
		this.http.getNewsByCountryService(id).subscribe((data: any) => {
			console.log(data)
			if (data.length === 0) {
				this.noNewsList = true;
			} else {
				this.newsList = data;
			}
		})
	}

	getWinnersList(id) {
		this.http.getWinnersByCountryService(id).subscribe((data: any) => {
			console.log(data);
			if (data.length === 0) {
				this.noWinnersList = true;
			} else {
				this.winnerList = data;
			}
		})
	}

	redirectGuideItem(item) {
		console.log(item);
		let guideId = item.id;
		sessionStorage.setItem('guideId', guideId);
		this.router.navigate(['/guide-item'])
	}

}
