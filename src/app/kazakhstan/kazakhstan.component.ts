import { AfterViewChecked, Component, OnInit } from '@angular/core';
import { Router, Scroll } from '@angular/router';
import { HttpService } from '../service/http.service';
import { SharedService } from '../service/shared.service';

@Component({
	selector: 'app-kazakhstan',
	templateUrl: './kazakhstan.component.html',
	styleUrls: ['./kazakhstan.component.css']
})
export class KazakhstanComponent implements OnInit {
	regionName: any;
	winnersList: any;
	leadershipList: any;
	newsList: any;
	noNews: boolean;
	noLeaderships: boolean;
	noWinners: boolean;

	constructor(public router: Router, private http: HttpService, private sharedService: SharedService) {
	}

	ngOnInit(): void {
		this.getCityList();
		this.getKazFedElem();
	}

	getKazFedElem() {
		let kazFederation = JSON.parse(sessionStorage.getItem('kazFederation'))
		if (kazFederation) {
			let kazId = kazFederation.id;
			this.getLeaderships(kazId);
			this.getNews(kazId);
			this.getWinners(kazId);
		}
	}



	redirect(item) {
		console.log(item)
		let regionId = item;
		sessionStorage.setItem('regionId', regionId);
		sessionStorage.removeItem('countryId');
		this.router.navigate(['/region-info'])
	}

	redirectToAuth() {
		window.location.href = "http://78.40.108.85/api/admin/login/?next=/api/admin/"
	}

	scrollToElement($element, sectionName) {
		if (sectionName === 'about') {
			$element.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' })
		}
		else if (sectionName === 'guide') {
			$element.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' })
		}
		else if (sectionName === 'news') {
			$element.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' })
		}
		else if (sectionName === 'champs') {
			$element.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' })
		}
		else if (sectionName === 'partners') {
			$element.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' })
		}
		else if (sectionName === 'contacts') {
			$element.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' })
		}
	}

	getCityList() {
		this.http.getCityListService().subscribe(data => {
			console.log(data)
		})
	}

	getLeaderships(id) {
		this.http.getLeadershipByCountryService(id).subscribe((data: any) => {
			console.log(data)
			if (data.length === 0) {
				this.noLeaderships = true;
			} else {
				this.leadershipList = data;
			}
		})
	}

	getNews(id) {
		this.http.getNewsByCountryService(id).subscribe((data: any) => {
			console.log(data);
			if (data.length === 0) {
				this.noNews = true;
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

	getWinners(id) {
		this.http.getWinnersByCountryService(id).subscribe((data: any) => {
			console.log(data)
			if (data.length === 0) {
				this.noWinners = true;
			} else {
				this.winnersList = data;
			}
		})
	}


}
