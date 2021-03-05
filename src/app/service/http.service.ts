import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
@Injectable({
	providedIn: 'root'
})
export class HttpService {
	BASE_API_URL = 'http://78.40.108.85/api'

	constructor(private http: HttpClient) { }

	getCountryService() {
		return this.http.get(this.BASE_API_URL + '/country/country/')
	}
}
