import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
  selector: "app-tab-item",
  templateUrl: "./tab-item.component.html",
})
export class TabItemComponent {
  @Input() title: string;

  @Output()
  public closeTab = new EventEmitter();

  public isActive = false;
}
