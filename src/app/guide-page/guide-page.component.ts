import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
	selector: 'app-guide-page',
	templateUrl: './guide-page.component.html',
	styleUrls: ['./guide-page.component.css']
})
export class GuidePageComponent implements OnInit {

	constructor(private router: Router) { }

	ngOnInit(): void {
	}

	goSlideDown(item) {
		if (item === 'partners') {
			this.router.navigate(['/kazakhstan'], { fragment: 'partners' });
		} else if (item === 'contacts') {
			this.router.navigate(['/kazakhstan'], { fragment: 'contacts' });
		}
	}

	redirectToAuth() {
		window.location.href = "http://78.40.108.85/api/admin/login/?next=/api/admin/"
	}
}
