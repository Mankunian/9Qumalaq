import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
@Injectable({
	providedIn: 'root'
})
export class HttpService {
	BASE_API_URL = 'http://78.40.108.85/api'

	constructor(private http: HttpClient) { }


	getCityListService() {
		return this.http.get(this.BASE_API_URL + '/city/city/')
	}

	getNewsService(regionId) {
		return this.http.get(this.BASE_API_URL + '/city/news/' + regionId)
	}

	getLeadershipsService(regionId) {
		return this.http.get(this.BASE_API_URL + '/city/leadership/' + regionId)
	}

	getWinnersService(regionId) {
		return this.http.get(this.BASE_API_URL + '/city/winners/' + regionId)
	}

	// Country API


	getCountryListService() {
		return this.http.get(this.BASE_API_URL + '/country/country/')
	}

	getLeadershipByCountryService() {
		return this.http.get(this.BASE_API_URL + '/country/country/{id}/leaderships')
	}

}
