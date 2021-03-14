import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from '../service/http.service';

@Component({
	selector: 'app-world-map',
	templateUrl: './world-map.component.html',
	styleUrls: ['./world-map.component.css']
})
export class WorldMapComponent implements OnInit {
	countryId: any;
	jsonCountry: any;
	leadershipList: any;
	newsList: any;
	winnerList: any;
	noLeadershipList: boolean;
	noNewsList: boolean;
	noWinnersList: boolean;

	constructor(private http: HttpService, private router: Router) { }

	ngOnInit(): void {
		this.getCountryList();
		this.getWorldFedElem();
	}

	getWorldFedElem() {
		let worldId = JSON.parse(sessionStorage.getItem('worldFederation'))
		if (worldId) {
			let countryId = worldId.id;
			this.getLeadershipListByWorld(countryId);
			this.getNewsListByWorld(countryId);
			this.getWinnersListByWorld(countryId);
		}
	}

	getCountryList() {
		this.http.getCountryListService().subscribe(data => {
			console.log(data)
			this.jsonCountry = data;
		})
	}

	getLeadershipListByWorld(id) {
		this.http.getLeadershipByCountryService(id).subscribe((data: any) => {
			console.log(data);
			if (data.length === 0) {
				this.noLeadershipList = true;
			} else {
				this.leadershipList = data;
			}
		})
	}

	getNewsListByWorld(id) {
		this.http.getNewsByCountryService(id).subscribe((data: any) => {
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

	getWinnersListByWorld(id) {
		this.http.getWinnersByCountryService(id).subscribe((data: any) => {
			console.log(data);
			if (data.length === 0) {
				this.noWinnersList = true;
			} else {
				this.winnerList = data;
			}
		})
	}

	// Redirect Methods

	redirectLeadershipItem(item) {
		console.log(item);
		let leadershipId = item.id;
		sessionStorage.setItem('leadershipId', leadershipId);
		this.router.navigate(['/guide-item'])
	}

	redirectByClickMap(item) {
		console.log(item)
		let countryId = item.id;
		sessionStorage.setItem('countryId', countryId);
		sessionStorage.removeItem('regionId')
		this.router.navigate(['/world', countryId])
	}

	redirectNewsPage(item) {
		let newsId = item.id;
		sessionStorage.setItem('newsId', newsId)
		this.router.navigate(['/news-page'])
	}

	redirectToWinnersPage(item) {
		let winnerId = item.id;
		sessionStorage.setItem('winnerId', winnerId);
		this.router.navigate(['/champ-page-info'])
	}

}
