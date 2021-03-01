import { AfterViewChecked, Component, OnInit } from '@angular/core';
import { Router, Scroll } from '@angular/router';

@Component({
	selector: 'app-kazakhstan',
	templateUrl: './kazakhstan.component.html',
	styleUrls: ['./kazakhstan.component.css']
})
export class KazakhstanComponent implements OnInit {

	constructor(public router: Router) {
	}

	ngOnInit(): void {
	}


	redirect(item) {
		console.log(item)
		this.router.navigate(['/region-info'])
	}

	goDownId(item) {
		console.log(item)
		if (item === 'about') {
			this.router.navigate(['/kazakhstan'], { fragment: 'about' });
		} else if (item === 'guide') {
			this.router.navigate(['/kazakhstan'], { fragment: 'guide' });
		} else if (item === 'news') {
			this.router.navigate(['/kazakhstan'], { fragment: 'news' });
		} else if (item === 'partners') {
			this.router.navigate(['/kazakhstan'], { fragment: 'partners' });
		} else if (item === 'contacts') {
			this.router.navigate(['/kazakhstan'], { fragment: 'contacts' });
		} else if (item === 'champs') {
			this.router.navigate(['kazakhstan'], { fragment: 'champs' })
		}
	}


}
