import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";

import { AppComponent } from "./app.component";
import { ZipcodeEntryComponent } from "./zipcode-entry/zipcode-entry.component";
import { LocationService } from "./location.service";
import { ForecastsListComponent } from "./forecasts-list/forecasts-list.component";
import { WeatherService } from "./weather.service";
import { CurrentConditionsComponent } from "./current-conditions/current-conditions.component";
import { MainPageComponent } from "./main-page/main-page.component";
import { RouterModule } from "@angular/router";
import { routing } from "./app.routing";
import { provideHttpClient, withInterceptors } from "@angular/common/http";
import { ServiceWorkerModule } from "@angular/service-worker";
import { environment } from "../environments/environment";
import { TabItemComponent } from "./tab/tab-item/tab-item.component";
import { TabComponent } from "./tab/tab.component";
import { cacheInterceptor } from "./cache.interceptor";
import { CacheService } from "./cache.service";
import { CacheEditorComponent } from "./cache-editor/cache-editor.component";

@NgModule({
  declarations: [
    AppComponent,
    ZipcodeEntryComponent,
    ForecastsListComponent,
    CurrentConditionsComponent,
    MainPageComponent,
    TabItemComponent,
    TabComponent,
    CacheEditorComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule,
    routing,
    ServiceWorkerModule.register("/ngsw-worker.js", {
      enabled: environment.production,
    }),
  ],
  providers: [
    LocationService,
    WeatherService,
    CacheService,
    provideHttpClient(withInterceptors([cacheInterceptor])),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
