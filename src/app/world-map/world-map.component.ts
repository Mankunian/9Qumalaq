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

	constructor(private http: HttpService, private router: Router) { }

	ngOnInit(): void {
		this.getCountryList();
		this.getLeadershipList();
		// this.getJsonCountry();
		this.getCountryList();
	}

	getJsonCountry() {
		this.jsonCountry = [
			{ id: 1, name: 'Австрия' },
			{ id: 2, name: 'Андорра' },
			{ id: 3, name: 'Австралия' },
			{ id: 4, name: 'Ангола' },
			{ id: 5, name: 'Амстердам' },
			{ id: 6, name: 'Венгрия' },
			{ id: 7, name: 'Болгария' },
			{ id: 8, name: 'Румыня' },
			{ id: 9, name: 'Италия' },
			{ id: 10, name: 'Англия' }
		]
	}

	getCountryList() {
		this.http.getCountryListService().subscribe(data => {
			console.log(data)
			this.jsonCountry = data;
		})
	}

	getLeadershipList() {

	}

	redirect(item) {
		console.log(item)
		let countryId = item.id;
		sessionStorage.setItem('countryId', countryId);
		sessionStorage.removeItem('regionId')
		this.router.navigate(['/region-info'])
	}

}
