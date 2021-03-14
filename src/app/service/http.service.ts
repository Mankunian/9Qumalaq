import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { GlobalConfig } from "../../global";

@Injectable({
	providedIn: 'root'
})
export class HttpService {
	// BASE_API_URL = 'http://78.40.108.85/api'
	BASE_API_URL = GlobalConfig.API_URL;

	constructor(private http: HttpClient) { }

	// City API
	getCityListService() {
		return this.http.get(this.BASE_API_URL + '/city/city/')
	}

	getNewsService(regionId) {
		return this.http.get(this.BASE_API_URL + '/city/city/' + regionId + '/news')
	}

	getLeadershipsService(regionId) {
		return this.http.get(this.BASE_API_URL + '/city/city/' + regionId + '/leaderships')
	}

	getWinnersService(regionId) {
		return this.http.get(this.BASE_API_URL + '/city/city/' + regionId + '/winners')
	}

	getNewsByIdService(newsId) {
		return this.http.get(this.BASE_API_URL + '/city/news/' + newsId)
	}

	getWinnerByIdService(winnerId) {
		return this.http.get(this.BASE_API_URL + '/city/winners/' + winnerId)
	}

	getLeadershipByIdService(leadershipId) {
		return this.http.get(this.BASE_API_URL + '/city/leadership/' + leadershipId + '/')
	}






	// Country API
	getCountryListService() {
		return this.http.get(this.BASE_API_URL + '/country/country/')
	}

	getLeadershipByCountryService(countryId) {
		return this.http.get(this.BASE_API_URL + '/country/country/' + countryId + '/leaderships')
	}

	getNewsByCountryService(countryId) {
		return this.http.get(this.BASE_API_URL + '/country/country/' + countryId + '/news')
	}

	getWinnersByCountryService(countryId) {
		return this.http.get(this.BASE_API_URL + '/country/country/' + countryId + '/winners')
	}


}
