import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatGridListModule } from '@angular/material/grid-list';

import { Toolbar } from './core/components/toolbar/toolbar';
import { SideMenu } from './core/components/side-menu/side-menu';
import { SidenavDrawerComponent } from './core/components/sidenav-drawer/sidenav-drawer.component';
import { StoreService } from './core/services/store.service/store.service';
import { Global } from './core/services/global/global';
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
