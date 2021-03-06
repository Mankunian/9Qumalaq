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

	constructor(public router: Router, private http: HttpService, private sharedService: SharedService) {
	}

	ngOnInit(): void {
		this.getCityList()
	}


	redirect(item) {
		console.log(item)
		let regionId = item;
		sessionStorage.setItem('regionId', regionId);
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


}
