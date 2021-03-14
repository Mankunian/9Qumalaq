import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from '../service/http.service';
import { GlobalConfig } from "../../global";

@Component({
	selector: 'app-news-page',
	templateUrl: './news-page.component.html',
	styleUrls: ['./news-page.component.css']
})
export class NewsPageComponent implements OnInit {
	newsElement: any;
	allNews: any;

	constructor(private router: Router, private http: HttpService) { }

	ngOnInit(): void {
		this.getNewsItem();
		this.getAllnews();
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

	scrollToElement() { }

	// getNewsById(id) {
	// 	this.http.getNewsByIdService(id).subscribe((data: any) => {
	// 		console.log(typeof (data))
	// 		this.newsElement = [];
	// 		this.newsElement.push(data)
	// 	})
	// }

	// Main section
	getNewsItem() {
		let newsId = sessionStorage.getItem('newsId');
		let countryId = sessionStorage.getItem('countryId');
		let regionId = sessionStorage.getItem('regionId');

		if (countryId) {
			this.getNewsItemByCountry(newsId);
		} else if (regionId) {
			this.getNewsItemByRegion(newsId);
		}
	}

	getNewsItemByCountry(newsId) {
		this.http.getNewsByIdCountryService(newsId).subscribe((data: any) => {
			this.newsElement = [];
			this.newsElement.push(data)
			this.newsElement.forEach(element => {
				let published = Date.parse(element.published);
				let new_published_time = new Date(published).toLocaleDateString();
				element.published = new_published_time;

				let altered = Date.parse(element.altered);
				let new_altered_time = new Date(altered).toLocaleDateString();
				element.altered = new_altered_time;


			});
		})
	}

	getNewsItemByRegion(newsId) {
		this.http.getNewsByIdService(newsId).subscribe((data: any) => {
			this.newsElement = [];
			this.newsElement.push(data);
			this.newsElement.forEach(element => {
				let published = Date.parse(element.published);
				let new_published_time = new Date(published).toLocaleDateString();
				element.published = new_published_time;


				let altered = Date.parse(element.altered);
				let new_altered_time = new Date(altered).toLocaleDateString();
				element.altered = new_altered_time;
			});
		})
	}



	// Aside section
	getAllnews() {
		let regionId = sessionStorage.getItem('regionId');
		let countryId = sessionStorage.getItem('countryId')
		if (regionId) {
			this.getNewsByRegion(regionId);
		} else {
			this.getNewsByCountry(countryId);
		}
	}

	getNewsByRegion(regionId) {
		this.http.getNewsService(regionId).subscribe(data => {
			console.log(data)
			this.allNews = data;
			this.allNews.forEach(element => {
				let time = Date.parse(element.published)
				console.log(time)

				let s = new Date(time).toLocaleDateString();
				element.published = s;
			});
		})
	}

	getNewsByCountry(id) {
		this.http.getNewsByCountryService(id).subscribe(data => {
			console.log(data)
			this.allNews = data;
			this.allNews.forEach(element => {
				let time = Date.parse(element.published)
				console.log(time)

				let s = new Date(time).toLocaleDateString();
				element.published = s;
			});
		})
	}



}
