import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

@Component({
  selector: 'app-song-playing-snackbar',
  imports: [MatIconModule, MatListModule, MatButtonModule],
  templateUrl: './song-playing-snackbar.html',
  styleUrl: './song-playing-snackbar.scss',
})
export class SongPlayingSnackbar {
  readonly snackBarData = inject(MAT_SNACK_BAR_DATA);
}
