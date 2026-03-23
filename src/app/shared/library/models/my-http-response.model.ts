import { HttpStatusCode } from '@angular/common/http';

export interface MyHttpResponse<DATA> {
	status: {
		ok: boolean;
		code: HttpStatusCode;
		message: 'success' | 'error';
	};
	body: {
		count: number;
		data: DATA;
	};
}
