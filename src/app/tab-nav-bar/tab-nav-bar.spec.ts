import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabNavBar } from './tab-nav-bar';

describe('TabNavBar', () => {
  let component: TabNavBar;
  let fixture: ComponentFixture<TabNavBar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TabNavBar]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TabNavBar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
