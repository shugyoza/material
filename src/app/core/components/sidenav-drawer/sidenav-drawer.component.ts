import {
  AfterViewInit,
  Component,
  effect,
  ElementRef,
  inject,
  input,
  viewChild,
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
export class SidenavDrawerComponent {
  readonly startMatDrawer = viewChild<MatDrawer>('startDrawerRef');

  readonly endMatDrawer = viewChild<MatDrawer>('endDrawerRef');

  private _service = inject(SidenavDrawerService);

  mode = input<MatDrawerMode>('side');

  /* accept any css size units as string, i.e: '888px', '8rem', '8em', '80%' */
  drawerWidth = input<string>('');

  drawerContainerHeight = input<string>('');

  cssStyles = input<{
    matDrawerContainer?: Record<string, string>;
    matDrawer?: Record<string, string>;
    matDrawerContent?: Record<string, string>;
  }>({});

  hasBackdrop = input<boolean>(false);

  opened = input<{ start: boolean; end: boolean }>({
    start: false,
    end: false,
  });

  autoFocus = input<AutoFocusTarget | boolean | string>(false);

  constructor() {
    effect(() => {
      const sidenavDrawer = {
        start: this.startMatDrawer(),
        end: this.endMatDrawer(),
      };

      if (sidenavDrawer.start) {
        this._service.sidenavDrawer.start.set(sidenavDrawer.start);
      }

      if (sidenavDrawer.end) {
        this._service.sidenavDrawer.end.set(sidenavDrawer.end);
      }
    });
  }

  onEscape(): void {
    this._service.onEscape();
  }
}
