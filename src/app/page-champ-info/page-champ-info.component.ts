import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from '../service/http.service';

@Component({
	selector: 'app-page-champ-info',
	templateUrl: './page-champ-info.component.html',
	styleUrls: ['./page-champ-info.component.css']
})
export class PageChampInfoComponent implements OnInit {
	winnerElement: any;
	description: any;

	constructor(private router: Router, private http: HttpService) { }

	ngOnInit(): void {
		let winnerId = sessionStorage.getItem('winnerId');
		console.log(winnerId)
		this.getWinnerById(winnerId)
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

	getWinnerById(id) {
		this.http.getWinnerByIdService(id).subscribe((data: any) => {
			console.log(typeof (data))
			this.winnerElement = [];
			this.winnerElement.push(data)
			this.winnerElement.forEach(element => {
				// console.log(element.description)
				let description = element.description;

				description = description.split(".")
				console.log(description[0])
				console.log(description[1])

				this.description = description;

				// for (let i = 0; i < description.length; i++) {
				// 	description[i] = "- " + description[i] + "\n";
				// }


				// for (let i = 0; i < description.length; i++) {
				// 	description[i] = "- " + description[i] + "\n";
				// }
				// description = description.join("");

				// document.getElementById("ovde").innerHTML = description;



			});
		})
	}

}
