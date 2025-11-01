import { DOCUMENT } from '@angular/common';
import { inject, Injectable } from '@angular/core';
import { MatDrawer, MatDrawerToggleResult } from '@angular/material/sidenav';

@Injectable({
  providedIn: 'root',
})
export class SidenavDrawerService {
  private readonly _document = inject(DOCUMENT);

  private _startSidenavDrawer!: MatDrawer;

  private _endSidenavDrawer!: MatDrawer;

  set startSidenavDrawer(drawer: MatDrawer) {
    this._startSidenavDrawer = drawer;
  }

  set endSidenavDrawer(drawer: MatDrawer) {
    this._endSidenavDrawer = drawer;
  }

  open(position: 'start' | 'end'): Promise<MatDrawerToggleResult> {
    switch (position) {
      case 'start':
        return this._startSidenavDrawer.open();
      default:
        return this._endSidenavDrawer.open();
    }
  }

  close(position: 'start' | 'end'): Promise<MatDrawerToggleResult> {
    switch (position) {
      case 'start':
        return this._startSidenavDrawer.close();
      default:
        return this._endSidenavDrawer.close();
    }
  }

  toggle(position: 'start' | 'end'): Promise<MatDrawerToggleResult> {
    switch (position) {
      case 'start':
        return this._startSidenavDrawer.toggle();
      default:
        return this._endSidenavDrawer.toggle();
    }
  }

  startSidenavDrawerIsOpened(): boolean {
    return this._startSidenavDrawer.opened;
  }

  endSidenavDrawerIsOpened(): boolean {
    return this._endSidenavDrawer.opened;
  }

  onEscape(): void {
    const openOverlays = this._document.querySelectorAll('.cdk-overlay-pane');
    const openOverlaysExist = openOverlays.length > 0;

    if (!openOverlaysExist) {
      if (this._startSidenavDrawer.opened) {
        this._startSidenavDrawer.close();
      }

      if (this._endSidenavDrawer.opened) {
        this._endSidenavDrawer.close();
      }

      return;
    }

    const openedOverlay = openOverlays[0];
    const openedOverlayIsTooltip =
      openedOverlay.className.indexOf('mat-mdc-tooltip-panel') > -1;
    if (openedOverlayIsTooltip) {
      if (this._startSidenavDrawer.opened) {
        this._startSidenavDrawer.close();
      }

      if (this._endSidenavDrawer.opened) {
        this._endSidenavDrawer.close();
      }

      return;
    }
  }
}
