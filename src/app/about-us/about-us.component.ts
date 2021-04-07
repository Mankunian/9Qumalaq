import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalConfig } from 'src/global';

@Component({
	selector: 'app-about-us',
	templateUrl: './about-us.component.html',
	styleUrls: ['./about-us.component.css']
})
export class AboutUsComponent implements OnInit {
	aboutUsByCity: boolean;
	aboutUsByCountry: boolean;

	constructor(private router: Router) { }

	ngOnInit(): void {
		this.checkSessionStorage();
	}

	checkSessionStorage() {
		if (sessionStorage.cityObj) {
			alert('city')
			this.aboutUsByCity = true;
		} else {
			alert('country')
			this.aboutUsByCountry = true;
		}
	}

	goSlideDown(item) {
		if (item === 'partners') {
			this.router.navigate(['/kazakhstan'], { fragment: 'partners' });
		} else if (item === 'contacts') {
			this.router.navigate(['/kazakhstan'], { fragment: 'contacts' });
		}
	}

	redirectToAuth() {
		window.location.href = GlobalConfig.ADMIN_URL;
	}

}
