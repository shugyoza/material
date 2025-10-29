import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { TabNavBar } from './tab-nav-bar/tab-nav-bar';
import { Toolbar } from './toolbar/toolbar';
import { SideMenu } from './side-menu/side-menu';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, TabNavBar, Toolbar, SideMenu],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected title = 'material';
}
