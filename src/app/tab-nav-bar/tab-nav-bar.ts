import { Component, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { RouterLink } from "@angular/router";

interface Tab {
  label: string;
  path: string;
  disabled?: boolean;

}

@Component({
  selector: 'app-tab-nav-bar',
  imports: [MatTabsModule, MatButtonModule, RouterLink],
  templateUrl: './tab-nav-bar.html',
  styleUrl: './tab-nav-bar.scss',
})
export class TabNavBar {

  readonly tabs = signal<Tab[]>([
    {label: 'Search', path: '/client-search'},
    {label: 'General', path: '/client-general'},
    {label: 'Admin', path: '/admin'}
  ])

  readonly activeTab = signal<Tab>(this.tabs()[0]);
}
