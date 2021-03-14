import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { HttpService } from '../service/http.service';
import { SharedService } from '../service/shared.service';

@Component({
	selector: 'app-region-info',
	templateUrl: './region-info.component.html',
	styleUrls: ['./region-info.component.css'],
	providers: [NgbCarouselConfig]  // add NgbCarouselConfig to the component providers

})
export class RegionInfoComponent implements OnInit {
	regionId: any;
	regionName: any;
	winnersList: any;
	newsList: any;
	leadershipList: any;
	noLeadershipList: boolean;
	noNewsList: boolean;
	noWinnersList: boolean;

	// images = [700, 800, 807].map((n) => `https://picsum.photos/id/${n}/900/500`);

	constructor(
		config: NgbCarouselConfig,
		private router: Router,
		private sharedService: SharedService,
		private http: HttpService) {
		config.interval = 5000;
		config.keyboard = true;
		config.pauseOnHover = true;
	}

	ngOnInit(): void {
		this.getRegionIdMap()
		this.getCountryIdMap();
	}


	// Метод получения id региона если есть в sessionStorage
	getRegionIdMap() {
		let regionId = sessionStorage.getItem('regionId');
		if (regionId) {
			this.getNewsByCity(regionId);
			this.getLeadershipsByCity(regionId);
			this.getWinnersByCity(regionId);
			this.getCityList(regionId);
		}
	}

	// Метод получения id страны если есть в sessionStorage
	getCountryIdMap() {
		let countryId = sessionStorage.getItem('countryId');
		if (countryId) {
			this.getNewsByCountry(countryId);
			this.getLeadershipByCountry(countryId);
			this.getWinnersByCountry(countryId);
			this.getCountryList(countryId)
		}
	}

	goSlideDown(item) {
		if (item === 'partners') {
			this.router.navigate(['/kazakhstan'], { fragment: 'partners' });
		} else if (item === 'contacts') {
			this.router.navigate(['/kazakhstan'], { fragment: 'contacts' });
		}
	}

	// City API
	getNewsByCity(regionId) {
		this.http.getNewsService(regionId).subscribe((data: any) => {
			console.log(data)
			if (data.length === 0) {
				this.noNewsList = true;
			} else {
				this.newsList = data;
				this.newsList.forEach(element => {
					let time = Date.parse(element.published)
					console.log(time)

					let s = new Date(time).toLocaleDateString();
					element.published = s;
				});
			}
		})
	}

	getLeadershipsByCity(regionId) {
		this.http.getLeadershipsService(regionId).subscribe((data: any) => {
			console.log(data)
			if (data.length === 0) {
				this.noLeadershipList = true;
			} else {
				this.leadershipList = data;
			}
		})
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


	getCityList(regionId) {
		this.http.getCityListService().subscribe((data: any) => {
			console.log(data)
			data.forEach(element => {
				if (regionId * 1 === element.id) {
					this.regionName = element.name
				}
			});
		})
	}



	// Country API

	getCountryList(countryId) {
		this.http.getCountryListService().subscribe((data: any) => {
			data.forEach(element => {
				if (countryId * 1 === element.id) {
					this.regionName = element.name
				}
			});
		})
	}


	getNewsByCountry(countryId) {
		this.http.getNewsByCountryService(countryId).subscribe((data: any) => {
			console.log(data)
			if (data.length === 0) {
				this.noNewsList = true;
			} else {
				this.newsList = data;
				this.newsList.forEach(element => {
					let time = Date.parse(element.published)
					console.log(time)

					let s = new Date(time).toLocaleDateString();
					element.published = s;
				});
			}
		})
	}

	getLeadershipByCountry(countryId) {
		this.http.getLeadershipByCountryService(countryId).subscribe((data: any) => {
			if (data.length === 0) {
				this.noLeadershipList = true;
			} else {
				this.leadershipList = data;
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

	redirectNewsPage(item) {
		let newsId = item.id;
		sessionStorage.setItem('newsId', newsId)
		this.router.navigate(['/news-page'])
	}

	redirectToWinnersPage(item) {
		let winnerId = item.id;
		sessionStorage.setItem('winnerId', winnerId);
		this.router.navigate(['/champ-page-info'])
	}

	redirectGuideItem(item) {
		console.log(item);
		let leadershipId = item.id;
		sessionStorage.setItem('leadershipId', leadershipId);
		this.router.navigate(['/guide-item'])
	}

}
