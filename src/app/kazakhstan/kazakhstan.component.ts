import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-kazakhstan',
	templateUrl: './kazakhstan.component.html',
	styleUrls: ['./kazakhstan.component.css']
})
export class KazakhstanComponent implements OnInit {

	constructor() { }

	ngOnInit(): void {
	}

	redirect(item) {
		console.log(item)
	}

}
