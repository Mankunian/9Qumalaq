import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-guide-item',
	templateUrl: './guide-item.component.html',
	styleUrls: ['./guide-item.component.css']
})
export class GuideItemComponent implements OnInit {

	constructor() { }

	ngOnInit(): void {
	}

	redirectToAuth() {
		window.location.href = "http://78.40.108.85/api/admin/login/?next=/api/admin/"
	}

}
