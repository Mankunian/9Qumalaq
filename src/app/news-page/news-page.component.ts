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


	// Main section
	getNewsItem() {
		let newsId = sessionStorage.getItem('newsId');
		if (sessionStorage.countryObj) {
			this.getNewsItemByCountry(newsId);
		} else if (sessionStorage.cityObj) {
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
		if (sessionStorage.cityObj) {
			let city = JSON.parse(sessionStorage.cityObj)
			this.getNewsByRegion(city.id);
		} else {
			let country = JSON.parse(sessionStorage.countryObj)
			this.getNewsByCountry(country.id);
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
