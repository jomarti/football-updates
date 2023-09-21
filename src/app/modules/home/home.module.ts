import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { HomeContainerComponent } from './pages/home-container/home-container.component';
import { HeaderComponent } from './components/header/header.component';
import { StandingsComponent } from './components/standings/standings.component';
import { TeamResultsComponent } from './pages/team-results/team-results.component';
import { CountryServiceModule, StandingsServiceModule, LeagueServiceModule, FixtureServiceModule } from './services';

@NgModule({
  declarations: [
    HomeContainerComponent,
    HeaderComponent,
    StandingsComponent,
    TeamResultsComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    CountryServiceModule,
    StandingsServiceModule,
    LeagueServiceModule,
    FixtureServiceModule
  ],
  providers: [CountryServiceModule, FixtureServiceModule, LeagueServiceModule, StandingsServiceModule]
})
export class HomeModule { }
