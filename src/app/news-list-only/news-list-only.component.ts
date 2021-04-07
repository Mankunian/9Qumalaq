import { Component, OnInit } from '@angular/core';
import { HttpService } from '../service/http.service';

@Component({
	selector: 'app-news-list-only',
	templateUrl: './news-list-only.component.html',
	styleUrls: ['./news-list-only.component.css']
})
export class NewsListOnlyComponent implements OnInit {
	noNewsList: boolean;
	newsList: any;

	constructor(private http: HttpService) { }

	ngOnInit(): void {
		if (sessionStorage.cityObj) {
			let cityObj = JSON.parse(sessionStorage.cityObj)
			let cityId = cityObj.id;
			this.getNewsByCity(cityId)
		} else {
			let countryObj = JSON.parse(sessionStorage.countryObj);
			let countryId = countryObj.id;
			this.getNewsByCountry(countryId);
		}
	}

	getNewsByCountry(countryId) {
		this.http.getNewsByCountryService(countryId).subscribe((data: any) => {
			console.log(data)
			if (data.length === 0) {
				this.noNewsList = true;
			} else {
				this.newsList = data;
				this.newsList.forEach(element => {
					let time = Date.parse(element.published);

					let s = new Date(time).toLocaleDateString();
					element.published = s;
				});
			}
		})
	}

	getNewsByCity(regionId) {
		this.http.getNewsService(regionId).subscribe((data: any) => {
			console.log(data)
			if (data.length === 0) {
				this.noNewsList = true;
			} else {
				this.newsList = data;
				this.newsList.forEach(element => {
					let time = Date.parse(element.published)
					console.log(time)

					let s = new Date(time).toLocaleDateString();
					element.published = s;
				});
			}
		})
	}

	redirectNewsPage() { }

	redirectToAuth() { }

	goSlideDown(item) { }

}
