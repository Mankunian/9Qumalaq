import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from '../service/http.service';

@Component({
	selector: 'app-news-page',
	templateUrl: './news-page.component.html',
	styleUrls: ['./news-page.component.css']
})
export class NewsPageComponent implements OnInit {
	newsElement: any;

	constructor(private router: Router, private http: HttpService) { }

	ngOnInit(): void {
		let newsId = sessionStorage.getItem('newsId');
		console.log(newsId)
		this.getNewsById(newsId)
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

	scrollToElement() { }

	getNewsById(id) {
		this.http.getNewsByIdService(id).subscribe((data: any) => {
			console.log(typeof (data))
			this.newsElement = [];
			this.newsElement.push(data)
		})
	}

}
