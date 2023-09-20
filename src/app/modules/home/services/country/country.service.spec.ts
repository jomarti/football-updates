import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { CountryService } from './country.service';

describe('CountryService', () => {
  let service: CountryService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ CountryService ]
    });
    service = TestBed.inject(CountryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get fixture by team', fakeAsync(() => {
    service.getCountries().subscribe(countries => {
      tick();
      expect(countries.length > 0).toBeTruthy();
    })
  }));
});
