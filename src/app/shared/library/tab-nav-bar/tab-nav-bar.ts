import { Component, input, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { RouterLink } from '@angular/router';

import { Tab } from './tab.interface';

@Component({
  selector: 'app-tab-nav-bar',
  imports: [MatTabsModule, MatButtonModule, RouterLink],
  templateUrl: './tab-nav-bar.html',
  styleUrl: './tab-nav-bar.scss',
})
export class TabNavBar {
  readonly tabs = input<Tab[]>([]);

  readonly activeTab = signal<Tab>(this.tabs()[0]);
}
