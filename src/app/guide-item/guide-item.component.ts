import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from '../service/http.service';

@Component({
	selector: 'app-guide-item',
	templateUrl: './guide-item.component.html',
	styleUrls: ['./guide-item.component.css']
})
export class GuideItemComponent implements OnInit {
	leadershipItem: any;

	constructor(private http: HttpService, private router: Router) { }

	ngOnInit(): void {
		let guideId = sessionStorage.getItem('guideId');
		if (guideId) {
			this.getLeadershipItem(guideId)
		}
	}

	redirectToAuth() {
		window.location.href = "http://78.40.108.85/api/admin/login/?next=/api/admin/"
	}

	getLeadershipItem(id) {
		this.http.getLeadershipByIdService(id).subscribe((data: any) => {
			console.log(data);
			this.leadershipItem = [];
			this.leadershipItem.push(data)
		})
	}

	goSlideDown(item) {
		if (item === 'partners') {
			this.router.navigate(['/kazakhstan'], { fragment: 'partners' });
		} else if (item === 'contacts') {
			this.router.navigate(['/kazakhstan'], { fragment: 'contacts' });
		}
	}

}
