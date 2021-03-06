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

	// images = [700, 800, 807].map((n) => `https://picsum.photos/id/${n}/900/500`);

	constructor(
		config: NgbCarouselConfig,
		private router: Router,
		private sharedService: SharedService,
		private http: HttpService) {
		config.interval = 2000;
		config.keyboard = true;
		config.pauseOnHover = true;
	}

	ngOnInit(): void {
		this.getRegionIdMap()
	}


	getRegionIdMap() {
		this.sharedService.sharedMessage.subscribe(message => {
			console.log(message)
			this.regionId = message;
			let regionId = message;
			this.getNewsByRegion(regionId)
		})
	}

	goSlideDown(item) {
		if (item === 'partners') {
			this.router.navigate(['/kazakhstan'], { fragment: 'partners' });
		} else if (item === 'contacts') {
			this.router.navigate(['/kazakhstan'], { fragment: 'contacts' });
		}
	}

	getNewsByRegion(regionId) {
		this.http.getNewsService(regionId).subscribe(data => {
			console.log(data)
		})
	}


}
