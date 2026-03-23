import { ComponentType } from '@angular/cdk/overlay';
import { inject, Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class MyDialog {
	private readonly _dialog = inject(MatDialog);

	openDialog<MyComponentType, MyConfigType>(
		component: ComponentType<MyComponentType>,
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		config?: MatDialogConfig<MyConfigType>
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
	): Observable<any> {
		const _config = {
			height: '70%',
			width: '50%',
			...(config ?? {}),
		};
		const dialogRef = this._dialog.open(component, _config);
		const response$ = dialogRef.afterClosed();

		return response$;
	}
}
