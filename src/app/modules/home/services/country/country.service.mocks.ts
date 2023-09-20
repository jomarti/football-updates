import { Observable, of, map, shareReplay } from "rxjs";
import { COUNTRY_ENABLES } from "../../constants";
import { getCountries } from "../../mocks";
import { Country } from "../../models";

export class CountryServiceMock {
    getCountries(): Observable<Country[]> {
        return of(getCountries())
        .pipe(
          map(data => data.response),
          map(countries => countries.filter(country => COUNTRY_ENABLES.includes(country.name))),
          shareReplay()
        );
    }
}