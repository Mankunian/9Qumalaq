import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
	selector: 'app-region-info',
	templateUrl: './region-info.component.html',
	styleUrls: ['./region-info.component.css']
})
export class RegionInfoComponent implements OnInit {

	constructor(public router: Router) { }

	ngOnInit(): void {
	}

	route() {
		this.router.navigateByUrl('region-info/' + '#about-us');
	}

}
