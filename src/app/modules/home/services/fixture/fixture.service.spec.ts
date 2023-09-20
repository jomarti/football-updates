import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FixtureService } from './fixture.service';

describe('FixtureService', () => {
  let service: FixtureService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [FixtureService ]
    });
    service = TestBed.inject(FixtureService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get fixture by team', fakeAsync(() => {
    const leagueId = 39;
    const teamId = 50;
    const year =  '2023';
    service.getFixtureTeam(leagueId, teamId, year).subscribe(fixture => {
      tick();
      expect(fixture.length > 0).toBeTruthy();
    })
  }));
});
