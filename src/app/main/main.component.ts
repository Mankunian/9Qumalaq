import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from "../service/http.service";

@Component({
	selector: 'app-main',
	templateUrl: './main.component.html',
	styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

	constructor(public router: Router, private http: HttpService) { }

	ngOnInit(): void {
		this.getCountryList()
	}

	openKazMap() {
		this.router.navigate(['/kazakhstan'])
	}

	openWorldMap() {
		this.router.navigate(['/world-map'])
	}

	redirectToAuth() {
		window.location.href = "http://78.40.108.85/api/admin/login/?next=/api/admin/"
	}

	getCountryList() {
		this.http.getCountryService().subscribe(data => {
			console.log(data)
		})
	}

}
