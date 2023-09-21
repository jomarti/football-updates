import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, shareReplay, takeUntil } from 'rxjs';
import { FixtureService } from '../../services';
import { Fixture } from '../../models/fixture.model';

@Component({
  selector: 'app-team-results',
  templateUrl: './team-results.component.html',
  styleUrls: ['./team-results.component.scss']
})
export class TeamResultsComponent implements OnInit, OnDestroy {

  public leagueId!: number;
  public teamId!: number;
  public currentYear!: string;
  public fixtures!: Fixture[];

  private ngUnsubscribe: Subject<void> = new Subject<void>();

  constructor(
    private routeActive: ActivatedRoute,
    private router: Router,
    private fixtureService: FixtureService
  ) {}

  ngOnInit(): void {
    this.routeActive.params.subscribe(params => {
      this.leagueId = params['leagueId'];
      this.teamId = params['teamId'];
      this.currentYear = params['currentYear'];
      this.loadFixtures();
    });
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  goToHome(): void {
    this.router.navigate(
      ['/home'], 
      { queryParams: { leagueId: this.leagueId, currentYear: this.currentYear} }
    );
  }

  trackByItem(index: number, item: Fixture): number {
    return item.teams.home.id + index;
  }

  private loadFixtures(): void {
    this.fixtureService.getFixtureTeam(this.leagueId, this.teamId, this.currentYear)
    .pipe(
      takeUntil(this.ngUnsubscribe),
      shareReplay()
    ).subscribe(fixtures => {
      this.fixtures = fixtures;
    });
  }

}

