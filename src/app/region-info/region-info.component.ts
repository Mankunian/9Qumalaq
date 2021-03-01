import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
	selector: 'app-region-info',
	templateUrl: './region-info.component.html',
	styleUrls: ['./region-info.component.css'],
	providers: [NgbCarouselConfig]  // add NgbCarouselConfig to the component providers

})
export class RegionInfoComponent implements OnInit {

	// images = [700, 800, 807].map((n) => `https://picsum.photos/id/${n}/900/500`);

	constructor(config: NgbCarouselConfig) {
		// 
		config.interval = 2000;
		config.keyboard = true;
		config.pauseOnHover = true;
	}

	ngOnInit(): void {
	}


}
