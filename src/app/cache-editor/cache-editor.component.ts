import { Component, inject } from "@angular/core";
import { CacheService } from "app/cache.service";

@Component({
  selector: "app-cache-editor",
  templateUrl: "./cache-editor.component.html",
  styleUrl: "./cache-editor.component.css",
})
export class CacheEditorComponent {
  protected readonly cacheService = inject(CacheService);
}
