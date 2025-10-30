import { DOCUMENT } from '@angular/common';
import { inject, Injectable } from '@angular/core';
import { MatDrawer, MatDrawerToggleResult } from '@angular/material/sidenav';

@Injectable({
  providedIn: 'root',
})
export class SidenavDrawerService {
  private readonly _document = inject(DOCUMENT);

  private _drawer!: MatDrawer;

  set drawer(drawer: MatDrawer) {
    this._drawer = drawer;
  }

  open(): Promise<MatDrawerToggleResult> {
    return this._drawer.open();
  }

  close(): Promise<MatDrawerToggleResult> {
    return this._drawer.close();
  }

  toggle(): Promise<MatDrawerToggleResult> {
    return this._drawer.toggle();
  }

  drawerIsOpened(): boolean {
    return this._drawer.opened;
  }

  onEscape(): void {
    const openOverlays = this._document.querySelectorAll('.cdk-overlay-pane');
    const openOverlaysExist = openOverlays.length > 0;

    if (!openOverlaysExist) {
      this._drawer.close();

      return;
    }

    const openedOverlay = openOverlays[0];
    const openedOverlayIsTooltip =
      openedOverlay.className.indexOf('mat-mdc-tooltip-panel') > -1;
    if (openedOverlayIsTooltip) {
      this._drawer.close();

      return;
    }
  }
}
