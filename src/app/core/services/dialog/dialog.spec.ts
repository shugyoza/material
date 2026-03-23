import { TestBed } from '@angular/core/testing';

import { MyDialog } from './dialog';

describe('MyDialog', () => {
	let service: MyDialog;

	beforeEach(() => {
		TestBed.configureTestingModule({});
		service = TestBed.inject(MyDialog);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});
});
