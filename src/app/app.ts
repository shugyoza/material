import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { TabNavBar } from './tab-nav-bar/tab-nav-bar';
import { Toolbar } from './toolbar/toolbar';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, TabNavBar, Toolbar],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected title = 'material';
}
