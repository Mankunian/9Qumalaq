import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from '../service/http.service';

@Component({
	selector: 'app-guide-page',
	templateUrl: './guide-page.component.html',
	styleUrls: ['./guide-page.component.css']
})
export class GuidePageComponent implements OnInit {
	noLeadershipList: boolean;
	leadershipList: any;
	cityId: any;

	constructor(private router: Router, private http: HttpService) { }

	ngOnInit(): void {
		this.getLeadershipList();
	}

	getLeadershipList() {
		if (sessionStorage.cityObj) {
			let city = JSON.parse(sessionStorage.cityObj);
			this.cityId = city.id;
			this.http.getLeadershipsService(this.cityId).subscribe((data: any) => {
				console.log(data)
				if (data.length === 0) {
					this.noLeadershipList = true;
				} else {
					this.leadershipList = data;
				}
			})
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
		window.location.href = "http://back.aqyl.host/api/admin/login/?next=/api/admin/"
	}

	redirectGuideItem(item) {
		console.log(item)
		let leadershipId = item.id;
		sessionStorage.setItem('leadershipId', leadershipId);
		sessionStorage.setItem('regionId', this.cityId);
		this.router.navigate(['/guide-item'])
	}
}
