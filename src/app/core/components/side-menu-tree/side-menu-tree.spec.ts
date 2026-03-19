import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SideMenuTree } from './side-menu-tree';

describe('SideMenuTree', () => {
	let component: SideMenuTree;
	let fixture: ComponentFixture<SideMenuTree>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [SideMenuTree],
		}).compileComponents();

		fixture = TestBed.createComponent(SideMenuTree);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
