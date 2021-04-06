import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalConfig } from 'src/global';

@Component({
	selector: 'app-champ-page',
	templateUrl: './champ-page.component.html',
	styleUrls: ['./champ-page.component.css']
})
export class ChampPageComponent implements OnInit {

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
		window.location.href = window.location.href = GlobalConfig.ADMIN_URL;
	}

}
