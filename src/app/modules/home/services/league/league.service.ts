import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map, of, shareReplay } from 'rxjs';
import { LeagueServiceModule } from './league.service.module';
import { LeagueInfo } from '../../models';
import { getLeague } from '../../mocks';
import { API_URL_PREFIX, API_KEY } from '../../constants';

@Injectable({
  providedIn: LeagueServiceModule
})
export class LeagueService {

  constructor(private http: HttpClient) { }

  getLeague(leagueId: string): Observable<LeagueInfo[]> {
    const url = `${API_URL_PREFIX}/leagues?id=${leagueId}&current=true`;
    const HEADER_OPTIONS = {
      headers: new HttpHeaders({
        'x-apisports-key': API_KEY,
      })
    };
    
    /*
    return this.http.get<ApiLeagueResponse>(url, <Object>HEADER_OPTIONS)
    .pipe(
      map(data => data.response),
      shareReplay()
    );
    */
    return of(getLeague())
    .pipe(
      map(data => data.response),
      shareReplay()
    );
  }
}

