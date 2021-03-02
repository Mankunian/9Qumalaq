import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
	selector: 'app-news-page',
	templateUrl: './news-page.component.html',
	styleUrls: ['./news-page.component.css']
})
export class NewsPageComponent implements OnInit {

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

}
