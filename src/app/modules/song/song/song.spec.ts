import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Song } from './song';
import { ActivatedRoute } from '@angular/router';

describe('Song', () => {
	let component: Song;
	let fixture: ComponentFixture<Song>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [Song],
			providers: [
				{
					provide: ActivatedRoute,
					useValue: {},
				},
			],
		}).compileComponents();

		fixture = TestBed.createComponent(Song);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
