import {
  AfterContentInit,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  inject,
  QueryList,
} from "@angular/core";
import { TabItemComponent } from "./tab-item/tab-item.component";

@Component({
  selector: "app-tab",
  templateUrl: "./tab.component.html",
  styleUrl: "./tab.component.css",
})
export class TabComponent implements AfterContentInit {
  @ContentChildren(TabItemComponent)
  protected tabItems!: QueryList<TabItemComponent>;

  public ngAfterContentInit(): void {
    setTimeout(() => this.selectTabItem(0));
    this.tabItems.changes.subscribe((tabItems: QueryList<TabItemComponent>) => {
      if (tabItems.length === 0) return;
      if (!tabItems.some((tab: TabItemComponent) => tab.isActive)) {
        setTimeout(() => this.selectTabItem(0));
      }
    });
  }

  protected selectTabItem(index: number): void {
    this.tabItems.forEach((tab, i) => (tab.isActive = i === index));
  }
}
