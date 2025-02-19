import { Injectable } from "@angular/core";
import { environment } from "environments/environment";

@Injectable()
export class CacheService {
  private _duration: number;

  private readonly millisecondsMultiplier = 1000;
  private readonly durationStorageKey = "duration";

  constructor() {
    const duration = localStorage.getItem(this.durationStorageKey);
    this._duration = duration ? +duration : environment.cacheDuration;
  }

  public get<T>(key: string): T | null {
    const dateTime = Date.now();
    const cache = JSON.parse(localStorage.getItem(key) || "{}");

    if (
      cache &&
      cache.timestamp + this._duration * this.millisecondsMultiplier > dateTime
    ) {
      return cache.data;
    }

    return null;
  }

  public set<T>(key: string, value: T): void {
    const dateTime = Date.now();
    const cache = {
      timestamp: dateTime,
      data: value,
    };
    localStorage.setItem(key, JSON.stringify(cache));
  }

  public get duration(): number {
    return this._duration;
  }

  public set duration(duration: number) {
    this._duration = duration;
    localStorage.setItem(this.durationStorageKey, duration.toString());
  }
}
