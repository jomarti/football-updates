import { Component, OnDestroy, OnInit } from '@angular/core';
import { Country } from '../../models/country.model';
import { CountryService, LeagueService, StandingsService } from '../../services';
import { Subject, concatMap, shareReplay, takeUntil } from 'rxjs';
import { LEAGUES_IDS } from '../../constants/league.constant';

import { SimpleLeague } from '../../models/league.model';
import { ActivatedRoute } from '@angular/router';
import { Standing } from '../../models/standing.model';

@Component({
  selector: 'app-home-container',
  templateUrl: './home-container.component.html',
  styleUrls: ['./home-container.component.scss']
})
export class HomeContainerComponent implements OnInit, OnDestroy {
  
  public countries: Country[] = [];
  public countrySelected!: string;
  public standings!: Standing[];
  public league!: SimpleLeague;
  public leagueId!: string;
  public currentYear!: string;

  private ngUnsubscribe: Subject<void> = new Subject<void>();

  constructor(
    private activatedRoute: ActivatedRoute,
    private countryService: CountryService,
    private standingsService: StandingsService,
    private leagueService: LeagueService
  ) {}
  
  ngOnInit(): void {
    this.activatedRoute.queryParams
      .subscribe(params => {
        this.leagueId = params['leagueId'];
        this.currentYear = params['currentYear'];
        if(this.leagueId && this.currentYear) {
          this.loadLeague();
        }
      }
    );
    this.getInfoData();
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  onSelectCountry(country: Country): void {
    this.leagueId = this.getLeagueId(country.name);
    this.countrySelected = country.name;
    this.loadLeague();
  }

  private loadLeague(): void {
    this.leagueService.getLeague(this.leagueId)
    .pipe(
      concatMap((leagueInfo) => {
        this.currentYear = `${leagueInfo[0].seasons[0].year}`;
        return this.standingsService.getStandingsLeague(this.leagueId, this.currentYear)
      }),
      shareReplay(),
      takeUntil(this.ngUnsubscribe)
    ).subscribe(standings => {
      const league = standings[0].league;
      this.countrySelected = league.country
      this.standings = league.standings[0];
    })
  }

  private getInfoData(): void {
    this.countryService.getCountries()
    .pipe(takeUntil(this.ngUnsubscribe))
    .subscribe((countries) => {
      this.countries = countries;
    })
  }
    
  private getLeagueId(countryName: string): string {
    const selectedLeagues = LEAGUES_IDS.filter(league => league.name === countryName);
    const leagueId = selectedLeagues[0].id;
    return `${leagueId}`;
  }
}
