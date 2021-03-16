import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class ErrorHandlerService {

	constructor() { }

	getError(error) {
		console.log(error.url);
		var noId = error.url.substr(error.url.length - 4); // => "null"

	}
}
