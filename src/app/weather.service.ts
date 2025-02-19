import {
  computed,
  inject,
  Injectable,
  signal,
  Signal,
  WritableSignal,
} from "@angular/core";
import { toSignal, toObservable } from "@angular/core/rxjs-interop";
import { forkJoin, Observable, of } from "rxjs";
import { catchError, map, mergeMap } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";
import { CurrentConditions } from "./current-conditions/current-conditions.type";
import { ConditionsAndZip } from "./conditions-and-zip.type";
import { Forecast } from "./forecasts-list/forecast.type";
import { LocationService } from "./location.service";
import { Conditional } from "@angular/compiler";

@Injectable()
export class WeatherService {
  private static URL = "https://api.openweathermap.org/data/2.5";
  private static APPID = "5a4b2d457ecbef9eb2a71e480b947604";
  private static ICON_URL =
    "https://raw.githubusercontent.com/udacity/Sunshine-Version-2/sunshine_master/app/src/main/res/drawable-hdpi/";
  private readonly currentConditions = signal<ConditionsAndZip[]>([]);
  private readonly http = inject(HttpClient);
  private readonly locationService = inject(LocationService);

  public constructor() {
    toObservable(this.locationService.locations)
      .pipe(
        mergeMap((locations: string[]) => {
          if (locations.length === 0) {
            return of([]);
          }
          return forkJoin(
            locations.map((zip) => this.getCurrentConditionsForZip(zip))
          );
        })
      )
      .subscribe((conditions) => {
        this.currentConditions.set(
          conditions.filter((condition) => condition.data !== null)
        );
      });
  }

  private getCurrentConditionsForZip(
    zipcode: string
  ): Observable<ConditionsAndZip> {
    return this.http
      .get<CurrentConditions>(
        `${WeatherService.URL}/weather?zip=${zipcode},us&units=imperial&APPID=${WeatherService.APPID}`
      )
      .pipe(
        catchError(() => of(null)),
        map((data) => {
          return { zip: zipcode, data };
        })
      );
  }

  public getCurrentConditions(): Signal<ConditionsAndZip[]> {
    return this.currentConditions.asReadonly();
  }

  public getForecast(zipcode: string): Observable<Forecast> {
    // Here we make a request to get the forecast data from the API. Note the use of backticks and an expression to insert the zipcode
    return this.http.get<Forecast>(
      `${WeatherService.URL}/forecast/daily?zip=${zipcode},us&units=imperial&cnt=5&APPID=${WeatherService.APPID}`
    );
  }

  public getWeatherIcon(id: number): string {
    if (id >= 200 && id <= 232)
      return WeatherService.ICON_URL + "art_storm.png";
    else if (id >= 501 && id <= 511)
      return WeatherService.ICON_URL + "art_rain.png";
    else if (id === 500 || (id >= 520 && id <= 531))
      return WeatherService.ICON_URL + "art_light_rain.png";
    else if (id >= 600 && id <= 622)
      return WeatherService.ICON_URL + "art_snow.png";
    else if (id >= 801 && id <= 804)
      return WeatherService.ICON_URL + "art_clouds.png";
    else if (id === 741 || id === 761)
      return WeatherService.ICON_URL + "art_fog.png";
    else return WeatherService.ICON_URL + "art_clear.png";
  }
}
