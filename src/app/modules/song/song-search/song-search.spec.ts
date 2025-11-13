import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SongSearch } from './song-search';

describe('SongSearch', () => {
	let component: SongSearch;
	let fixture: ComponentFixture<SongSearch>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [SongSearch],
		}).compileComponents();

		fixture = TestBed.createComponent(SongSearch);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
