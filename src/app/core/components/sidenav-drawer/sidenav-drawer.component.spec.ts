import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatDrawer, MatSidenavModule } from '@angular/material/sidenav';
import { NgStyle } from '@angular/common';

import { SidenavDrawerComponent } from './sidenav-drawer.component';
import { SidenavDrawerService } from './sidenav-drawer.service';
import { signal } from '@angular/core';

describe('HarmonySidenavDrawerComponent', () => {
  let component: SidenavDrawerComponent;
  let fixture: ComponentFixture<SidenavDrawerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        MatSidenavModule,
        NgStyle,
        SidenavDrawerComponent,
        NoopAnimationsModule,
      ],
      providers: [
        {
          provide: SidenavDrawerService,
          useValue: {
            sidenavDrawer: {
              start: signal<MatDrawer | null>(null),
              end: signal<MatDrawer | null>(null),
            },
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SidenavDrawerComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
