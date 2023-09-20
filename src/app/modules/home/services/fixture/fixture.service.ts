import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, of, shareReplay } from 'rxjs';
import { API_URL_PREFIX, API_KEY } from '../../constants';
import { getFixture } from '../../mocks';
import { Fixture } from '../../models';
import { FixtureServiceModule } from './fixture.service.module';

@Injectable({
  providedIn: FixtureServiceModule
})
export class FixtureService {

  constructor(private http: HttpClient) { }

  getFixtureTeam(leagueId: number, teamId: number, year: string): Observable<Fixture[]> {
    const url = `${API_URL_PREFIX}fixtures?league=${leagueId}&season=${year}&team=${teamId}&last=10`;
    const HEADER_OPTIONS = {
      headers: new HttpHeaders({
        'x-apisports-key': API_KEY,
      })
    };
    
    /*
    return this.http.get<ApiFixtureResponse>(url, <Object>HEADER_OPTIONS)
    */
   return of(getFixture())
    .pipe(
      map(data => data.response),
      shareReplay()
    );
  }
}