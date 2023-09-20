import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { LeagueService } from './league.service';

describe('LeagueService', () => {
  let service: LeagueService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ LeagueService ]
    });
    service = TestBed.inject(LeagueService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get fixture by team', fakeAsync(() => {
    const leagueId = '39';
    service.getLeague(leagueId).subscribe(league => {
      tick();
      expect(league.length > 0).toBeTruthy();
    })
  }));
});
