import {
  AfterViewInit,
  Component,
  inject,
  input,
  ViewChild,
} from '@angular/core';
import { NgStyle } from '@angular/common';
import {
  MatDrawer,
  MatDrawerMode,
  MatSidenavModule,
} from '@angular/material/sidenav';
import { AutoFocusTarget } from '@angular/material/dialog';

import { SidenavDrawerService } from './sidenav-drawer.service';

@Component({
  standalone: true,
  selector: 'app-sidenav-drawer',
  templateUrl: './sidenav-drawer.component.html',
  styleUrls: ['./sidenav-drawer.component.scss'],
  imports: [NgStyle, MatSidenavModule],
})
export class SidenavDrawerComponent implements AfterViewInit {
  @ViewChild('startDrawerRef') startMatDrawer!: MatDrawer;

  @ViewChild('endDrawerRef') endMatDrawer!: MatDrawer;

  private _sidenavDrawerService = inject(SidenavDrawerService);

  mode = input<MatDrawerMode>('side');

  position = input<'start' | 'end'>('end');

  /* accept any css size units as string, i.e: '888px', '8rem', '8em', '80%' */
  drawerWidth = input<string>('');

  drawerContainerHeight = input<string>('');

  cssStyles = input<{
    matDrawerContainer?: Record<string, string>;
    matDrawer?: Record<string, string>;
    matDrawerContent?: Record<string, string>;
  }>({});

  hasBackdrop = input<boolean>(false);

  opened = input<boolean>(false);

  autoFocus = input<AutoFocusTarget | boolean | string>(false);

  ngAfterViewInit(): void {
    this._sidenavDrawerService.startSidenavDrawer = this.startMatDrawer;
    this._sidenavDrawerService.endSidenavDrawer = this.endMatDrawer;
  }

  onEscape(): void {
    this._sidenavDrawerService.onEscape();
  }
}
