import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatSidenavModule } from '@angular/material/sidenav';
import { NgStyle } from '@angular/common';

import { SidenavDrawerComponent } from './sidenav-drawer.component';
import { SidenavDrawerService } from './sidenav-drawer.service';

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
          useValue: {},
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SidenavDrawerComponent);
    component = fixture.componentInstance;

    component.ngAfterViewInit();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
