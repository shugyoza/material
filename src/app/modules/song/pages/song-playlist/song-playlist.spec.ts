import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';

import { SongPlaylist } from './song-playlist';

describe('SongPlaylist', () => {
  let component: SongPlaylist;
  let fixture: ComponentFixture<SongPlaylist>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SongPlaylist],
      providers: [provideHttpClient()],
    }).compileComponents();

    fixture = TestBed.createComponent(SongPlaylist);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
