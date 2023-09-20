import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamResultsComponent } from './team-results.component';
import { ActivatedRoute, Router } from '@angular/router';
import { ActivatedRouteMock } from 'src/app/modules/shared';
import { FixtureService } from '../../services';
import { FixtureServiceMock } from '../../services/fixture/fixture.service.mocks';

describe('TeamResultsComponent', () => {
  let component: TeamResultsComponent;
  let fixture: ComponentFixture<TeamResultsComponent>;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TeamResultsComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useClass: ActivatedRouteMock,
        },
        {
          provide: FixtureService,
          useClass: FixtureServiceMock,
        }
      ]
    });
    fixture = TestBed.createComponent(TeamResultsComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should back to home', () => {
    const spy = spyOn(router, 'navigate');
    component.goToHome();
    expect(spy).toHaveBeenCalledWith(
      ['/home'], 
      { queryParams: { leagueId: '39', currentYear: '2023'} }
    );
  });
});
