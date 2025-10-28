import { Component, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { RouterLink } from "@angular/router";

interface Tab {
  label: string;
  path: string;

}

@Component({
  selector: 'app-tab-nav-bar',
  imports: [MatTabsModule, MatButtonModule, RouterLink],
  templateUrl: './tab-nav-bar.html',
  styleUrl: './tab-nav-bar.scss',
})
export class TabNavBar {

  readonly tabs = signal<Tab[]>([
    {label: 'Login', path: '/login'},
    {label: 'Register', path: '/register'},
    {label: 'Tab 3', path: '/tab3'},
  ])

  readonly activeTab = signal<Tab>(this.tabs()[0]);
}
