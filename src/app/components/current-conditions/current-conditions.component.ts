import {Component, inject, Signal} from '@angular/core';
import {Router} from "@angular/router";
import { LocationService } from 'app/services/location.service';
import { WeatherService } from 'app/services/weather.service';
import { ConditionsAndZip } from 'app/types/conditions-and-zip.type';

@Component({
  selector: 'app-current-conditions',
  templateUrl: './current-conditions.component.html',
  styleUrls: ['./current-conditions.component.css']
})
export class CurrentConditionsComponent {

  private weatherService = inject(WeatherService);
  private router = inject(Router);
  protected locationService = inject(LocationService);
  protected currentConditionsByZip: Signal<ConditionsAndZip[]> = this.weatherService.getCurrentConditions();

  showForecast(zipcode : string){
    this.router.navigate(['/forecast', zipcode])
  }
}
