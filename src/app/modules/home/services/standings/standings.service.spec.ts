import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { StandingsService } from './standings.service';

describe('StandingsService', () => {
  let service: StandingsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ StandingsService ]
    });
    service = TestBed.inject(StandingsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get standings', fakeAsync(() => {
    const leagueId = '39';
    const year =  '2023';
    service.getStandingsLeague(leagueId, year).subscribe(standings => {
      tick();
      expect(standings.length > 0).toBeTruthy();
    })
  }));
});
