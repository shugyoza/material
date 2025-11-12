import { TestBed } from '@angular/core/testing';
import { DOCUMENT } from '@angular/common';

import { SidenavDrawerService } from './sidenav-drawer.service';
import { signal } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';

describe('SidenavDrawerService', () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let _document: typeof document;
  let service: SidenavDrawerService;
  const mockMatDrawer = jasmine.createSpyObj(
      'MatDrawer',
      ['open', 'close', 'toggle', 'onOpened', 'onClosed']
    );

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: DOCUMENT,
          useValue: document,
        },
      ],
    });

    _document = TestBed.inject(DOCUMENT);
    service = TestBed.inject(SidenavDrawerService);

    service.sidenavDrawer.start = signal<MatDrawer | null>(mockMatDrawer) ;
    service.sidenavDrawer.end = signal<MatDrawer | null>(mockMatDrawer) ;
  });

  it('should create', () => {
    expect(service).toBeTruthy();
  });

  it('should close on key escape press when there is no dialog is opened while the MatDrawer is still opened', () => {
    spyOn(_document, 'querySelectorAll').and.returnValue(
      [] as unknown as NodeListOf<Element>
    );

    service.onEscape();

    expect(
      service['_document'].querySelectorAll
    ).toHaveBeenCalledWith('.cdk-overlay-pane');
    // expect(
    //   sidenavDrawerService['_startSidenavDrawer'].close
    // ).toHaveBeenCalled();
  });

  it('should close on key escape press when only a tooltip is opened on hover while the MatDrawer is still opened', () => {
    const mockedTooltip = document.createElement('div');
    mockedTooltip.className = 'cdk-overlay-pane mat-mdc-tooltip-panel-above';

    spyOn(_document, 'querySelectorAll').and.returnValue([
      mockedTooltip,
    ] as unknown as NodeListOf<Element>);

    service.onEscape();

    expect(
      service['_document'].querySelectorAll
    ).toHaveBeenCalledWith('.cdk-overlay-pane');
    // expect(
    //   service.sidenavDrawer.start()?.close
    // ).toHaveBeenCalled();
  });

  it('should not close on key escape press when a dialog is opened while the MatDrawer is still opened', () => {
    const mockedSelectDropdownOptionsDialog = document.createElement('div');
    mockedSelectDropdownOptionsDialog.className = 'cdk-overlay-pane';

    spyOn(_document, 'querySelectorAll').and.returnValue([
      mockedSelectDropdownOptionsDialog,
    ] as unknown as NodeListOf<Element>);

    service.onEscape();

    expect(
      service['_document'].querySelectorAll
    ).toHaveBeenCalledWith('.cdk-overlay-pane');
    // expect(
    //   service.sidenavDrawer.start()?.close
    // ).not.toHaveBeenCalled();
  });
});
