import { DOCUMENT } from '@angular/common';
import { inject, Injectable, signal } from '@angular/core';
import { MatDrawer, MatDrawerToggleResult } from '@angular/material/sidenav';

@Injectable({
  providedIn: 'root',
})
export class SidenavDrawerService {
  private readonly _document = inject(DOCUMENT);

  readonly sidenavDrawer = {
    start: signal<MatDrawer | null>(null),
    end: signal<MatDrawer | null>(null),
  };

  open(position: 'start' | 'end'): null | Promise<MatDrawerToggleResult> {
    const sidenavDrawer = {
      start: this.sidenavDrawer.start(),
      end: this.sidenavDrawer.end(),
    };

    if (position === 'start' && sidenavDrawer.start) {
      return sidenavDrawer.start.open();
    }

    if (position === 'end' && sidenavDrawer.end) {
      return sidenavDrawer.end.open();
    }

    return null;
  }

  close(position: 'start' | 'end'): null | Promise<MatDrawerToggleResult> {
    const sidenavDrawer = {
      start: this.sidenavDrawer.start(),
      end: this.sidenavDrawer.end(),
    };

    if (position === 'start' && sidenavDrawer.start) {
      return sidenavDrawer.start.close();
    }

    if (position === 'end' && sidenavDrawer.end) {
      return sidenavDrawer.end.close();
    }

    return null;
  }

  toggle(position: 'start' | 'end'): null | Promise<MatDrawerToggleResult> {
    const sidenavDrawer = {
      start: this.sidenavDrawer.start(),
      end: this.sidenavDrawer.end(),
    };

    if (position === 'start' && sidenavDrawer.start) {
      return sidenavDrawer.start.toggle();
    }

    if (position === 'end' && sidenavDrawer.end) {
      return sidenavDrawer.end.toggle();
    }

    return null;
  }

  sidenavDrawerIsOpened(position: 'start' | 'end'): boolean {
    const sidenavDrawer = {
      start: this.sidenavDrawer.start(),
      end: this.sidenavDrawer.end(),
    };

    return sidenavDrawer[position]?.opened ?? false;
  }

  onEscape(): void {
    const openOverlays = this._document.querySelectorAll('.cdk-overlay-pane');
    const openOverlaysExist = openOverlays.length > 0;
    const sidenavDrawer = {
      start: this.sidenavDrawer.start(),
      end: this.sidenavDrawer.end(),
    };

    if (!openOverlaysExist) {
      if (sidenavDrawer.start?.opened) {
        sidenavDrawer.start.close();
      }

      if (sidenavDrawer.end?.opened) {
        sidenavDrawer.end.close();
      }

      return;
    }

    const openedOverlay = openOverlays[0];
    const openedOverlayIsTooltip =
      openedOverlay.className.indexOf('mat-mdc-tooltip-panel') > -1;
    if (openedOverlayIsTooltip) {
      if (sidenavDrawer.start?.opened) {
        sidenavDrawer.start.close();
      }

      if (sidenavDrawer.end?.opened) {
        sidenavDrawer.end.close();
      }

      return;
    }
  }
}
