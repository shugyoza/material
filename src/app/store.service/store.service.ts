import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  readonly sidenav = {
    opened: signal<boolean>(true),
  };
}
