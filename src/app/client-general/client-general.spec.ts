import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientGeneral } from './client-general';

describe('ClientGeneral', () => {
  let component: ClientGeneral;
  let fixture: ComponentFixture<ClientGeneral>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientGeneral]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientGeneral);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
