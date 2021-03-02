import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
	selector: 'app-page-champ-info',
	templateUrl: './page-champ-info.component.html',
	styleUrls: ['./page-champ-info.component.css']
})
export class PageChampInfoComponent implements OnInit {

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
