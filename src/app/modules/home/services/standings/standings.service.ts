import { Injectable } from '@angular/core';
import { StandingsServiceModule } from './standings.service.module';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map, of, shareReplay } from 'rxjs';
import { getStandings } from '../../mocks';
import { StandingLeague } from '../../models/standing.model';
import { API_KEY, API_URL_PREFIX } from '../../constants';

@Injectable({
  providedIn: StandingsServiceModule
})
export class StandingsService {

  constructor(private http: HttpClient) { }

  getStandingsLeague(leagueId: string, year: string): Observable<StandingLeague[]> {
    const url = `${API_URL_PREFIX}/standings?league=${leagueId}&season=${year}`;
    const HEADER_OPTIONS = {
      headers: new HttpHeaders({
        'x-apisports-key': API_KEY,
      })
    };
    
    /*
    return this.http.get<ApiStandingLeagueResponse>(url, <Object>HEADER_OPTIONS)
    */
   return of(getStandings())
    .pipe(
      map(data => data.response),
      shareReplay()
    );
  }
}