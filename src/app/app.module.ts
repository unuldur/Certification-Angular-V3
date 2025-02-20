import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";

import { AppComponent } from "./app.component";
import { ZipcodeEntryComponent } from "./components/zipcode-entry/zipcode-entry.component";
import { ForecastsListComponent } from "./components/forecasts-list/forecasts-list.component";
import { CurrentConditionsComponent } from "./components/current-conditions/current-conditions.component";
import { MainPageComponent } from "./components/main-page/main-page.component";
import { RouterModule } from "@angular/router";
import { routing } from "./app.routing";
import { provideHttpClient, withInterceptors } from "@angular/common/http";
import { ServiceWorkerModule } from "@angular/service-worker";
import { environment } from "../environments/environment";
import { CacheEditorComponent } from "./components/cache-editor/cache-editor.component";
import { cacheInterceptor } from "./interceptors/cache.interceptor";
import { CacheService } from "./services/cache.service";
import { LocationService } from "./services/location.service";
import { WeatherService } from "./services/weather.service";
import { TabItemComponent } from "./components/tab/tab-item/tab-item.component";
import { TabComponent } from "./components/tab/tab.component";

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
