import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map, of, shareReplay } from 'rxjs';
import { CountryServiceModule } from './country.service.module';
import { API_KEY, API_URL_PREFIX, COUNTRY_ENABLES } from '../../constants';
import { Country } from '../../models';
import { getCountries } from '../../mocks';

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
    /*
    return this.http.get<ApiCountryResponse>(url, <Object>HEADER_OPTIONS)
    */
    return of(getCountries())
    .pipe(
      map(data => data.response),
      map(countries => countries.filter(country => COUNTRY_ENABLES.includes(country.name))),
      shareReplay()
    );
  }
}

