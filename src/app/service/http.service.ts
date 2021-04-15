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
		let lang = sessionStorage.getItem('lang');
		return this.http.get(this.BASE_API_URL + '/city/city?lang=' + lang)
	}

	getNewsService(regionId) {
		let lang = sessionStorage.getItem('lang');
		return this.http.get(this.BASE_API_URL + '/city/city/' + regionId + '/news?lang=' + lang)
	}

	getLeadershipsService(regionId) {
		let lang = sessionStorage.getItem('lang');
		return this.http.get(this.BASE_API_URL + '/city/city/' + regionId + '/leaderships?lang=' + lang)
	}

	getWinnersService(regionId) {
		let lang = sessionStorage.getItem('lang');
		return this.http.get(this.BASE_API_URL + '/city/city/' + regionId + '/winners?lang=' + lang)
	}

	getNewsByIdService(newsId) {
		let lang = sessionStorage.getItem('lang');
		return this.http.get(this.BASE_API_URL + '/city/news/' + newsId + '?lang=' + lang)
	}

	getWinnerByIdService(winnerId) {
		let lang = sessionStorage.getItem('lang');
		return this.http.get(this.BASE_API_URL + '/city/winners/' + winnerId + '?lang=' + lang)
	}

	getLeadershipByCityService(leadershipId) {
		let lang = sessionStorage.getItem('lang');
		return this.http.get(this.BASE_API_URL + '/city/leadership/' + leadershipId + '?lang=' + lang)
	}






	// Country API
	getCountryListService() {
		let lang = sessionStorage.getItem('lang');
		return this.http.get(this.BASE_API_URL + '/country/country?lang=' + lang);
		// return this.http.get('assets/json/country.json');
	}

	getLeadershipByCountryService(countryId) {
		let lang = sessionStorage.getItem('lang');
		return this.http.get(this.BASE_API_URL + '/country/country/' + countryId + '/leaderships?lang=' + lang)
	}

	getNewsByCountryService(countryId) {
		let lang = sessionStorage.getItem('lang');
		return this.http.get(this.BASE_API_URL + '/country/country/' + countryId + '/news?lang=' + lang)
	}

	getWinnersByCountryService(countryId) {
		let lang = sessionStorage.getItem('lang');
		return this.http.get(this.BASE_API_URL + '/country/country/' + countryId + '/winners?lang=' + lang)
	}


	// By Id (news, leaderships, winners)

	getLeadershipByIdCountryService(leadershipId) {
		let lang = sessionStorage.getItem('lang');
		return this.http.get(this.BASE_API_URL + '/country/leadership/' + leadershipId + '?lang=' + lang)
	}

	getNewsByIdCountryService(newsId) {
		let lang = sessionStorage.getItem('lang');
		return this.http.get(this.BASE_API_URL + '/country/news/' + newsId + '?lang=' + lang)
	}

	getWinnerByIdCountryService(winnerId) {
		let lang = sessionStorage.getItem('lang');
		return this.http.get(this.BASE_API_URL + '/country/winners/' + winnerId + '?lang=' + lang)
	}



}
