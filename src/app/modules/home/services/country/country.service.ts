import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map, shareReplay } from 'rxjs';
import { CountryServiceModule } from './country.service.module';
import { API_KEY, API_URL_PREFIX, COUNTRY_ENABLES } from '../../constants';
import { ApiCountryResponse, Country } from '../../models';

@Injectable({
  providedIn: CountryServiceModule
})
export class CountryService {

  constructor(private http: HttpClient) { }

  getCountries(): Observable<Country[]> {
    const url = `${API_URL_PREFIX}/countries`;
    const HEADER_OPTIONS = {
      headers: new HttpHeaders({
        'x-apisports-key': API_KEY,
      })
    };
    return this.http.get<ApiCountryResponse>(url, HEADER_OPTIONS)
    .pipe(
      map(data => data.response),
      map(countries => countries.filter(country => COUNTRY_ENABLES.includes(country.name))),
      shareReplay()
    );
  }
}

