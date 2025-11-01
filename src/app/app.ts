import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatGridListModule } from '@angular/material/grid-list';

import { TabNavBar } from './tab-nav-bar/tab-nav-bar';
import { Toolbar } from './toolbar/toolbar';
import { SideMenu } from './side-menu/side-menu';
import { SidenavDrawerComponent } from './sidenav-drawer/sidenav-drawer.component';
import { StoreService } from './services/store.service/store.service';
import { Global } from './services/global/global';
import { AsyncPipe } from '@angular/common';

export interface Tile {
  color: string;
  text: string;
}

@Component({
  selector: 'app-root',
  imports: [
    MatGridListModule,
    AsyncPipe,
    RouterOutlet,
    TabNavBar,
    Toolbar,
    SideMenu,
    SidenavDrawerComponent,
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  readonly storeService = inject(StoreService);
  readonly global = inject(Global);
  readonly colsMap = new Map([
    ['XSmall', 1],
    ['Small', 1],
    ['Medium', 2],
    ['Large', 3],
    ['XLarge', 3],
  ]);

  protected title = 'material';

  tiles: Tile[] = [
    { text: 'One', color: 'lightblue' },
    { text: 'Two', color: 'lightgreen' },
    { text: 'Three', color: 'lightpink' },
    { text: 'Four', color: '#DDBDF1' },
  ];
}
