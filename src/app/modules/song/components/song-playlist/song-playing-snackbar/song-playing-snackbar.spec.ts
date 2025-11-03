import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SongPlayingSnackbar } from './song-playing-snackbar';

describe('SongPlayingSnackbar', () => {
  let component: SongPlayingSnackbar;
  let fixture: ComponentFixture<SongPlayingSnackbar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SongPlayingSnackbar]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SongPlayingSnackbar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
