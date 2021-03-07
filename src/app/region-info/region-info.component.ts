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
		this.http.getNewsService(regionId).subscribe(data => {
			console.log(data)
		})
	}

	getLeadershipsByCity(regionId) {
		this.http.getLeadershipsService(regionId).subscribe(data => {
			console.log(data)
		})
	}

	getWinnersByCity(regionId) {
		this.http.getWinnersService(regionId).subscribe(data => {
			console.log(data)
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
		this.http.getNewsByCountryService(countryId).subscribe(data => {
			console.log(data)
		})
	}

	getLeadershipByCountry(countryId) {
		this.http.getLeadershipByCountryService(countryId).subscribe(data => {
			console.log(data)
		})
	}


	getWinnersByCountry(countryId) {
		this.http.getWinnersByCountryService(countryId).subscribe(data => {
			console.log(data);
		})
	}



}
