export interface SongPlayListRow {
  song_id: number;
  song_title: string;
  song_artist: string;
  duration: number;
  song_waveform?: unknown;
  song_album?: string;
  song_resource_url?: string;
  song_cover_art_url?: string;
}

