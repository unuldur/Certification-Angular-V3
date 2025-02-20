import {
  effect,
  Injectable,
  Signal,
  signal,
  WritableSignal,
} from "@angular/core";

export const LOCATIONS: string = "locations";

@Injectable()
export class LocationService {
  private _locations: WritableSignal<string[]> = signal([]);
  public locations: Signal<string[]> = this._locations.asReadonly();

  constructor() {
    const locString = localStorage.getItem(LOCATIONS);
    if (locString) this._locations.set(JSON.parse(locString));

    effect(() => {
      const locations = this._locations();
      localStorage.setItem(LOCATIONS, JSON.stringify(locations));
    });
  }

  public addLocation(zipcode: string): void {
    this._locations.update((locations) => [...locations, zipcode]);
  }

  public removeLocation(zipcode: string): void {
    this._locations.update((locations) => {
      const index = locations.indexOf(zipcode);
      if (index !== -1) locations.splice(index, 1);
      return [...locations];
    });
  }
}
