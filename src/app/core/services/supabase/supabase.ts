import { Injectable } from '@angular/core';
import {
	AuthChangeEvent,
	AuthSession,
	createClient,
	PostgrestSingleResponse,
	Session,
} from '@supabase/supabase-js';
import { from, map, Observable } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { User } from '@supabase/supabase-js';

import { ENVIRONMENT } from '../../../../environments/environment';
import { User as Profile } from './user.interface';

const { url, key } = ENVIRONMENT.supabase;

@Injectable({
	providedIn: 'root',
})
export class Supabase {
	readonly supabase = createClient(url, key);

	readonly session$ = from(this.supabase.auth.getSession()).pipe(
		map(response => response.data.session)
	);

	session = toSignal(this.session$, {
		initialValue: null as AuthSession | null,
	});

	profile(user: User): Observable<PostgrestSingleResponse<unknown>> {
		return from(
			this.supabase
				.from('users')
				.select('user_id, username, email, phone, avatar_url')
				.eq('user_id', user.id)
				.single()
		);
	}

	authChanges(
		callback: (event: AuthChangeEvent, session: Session | null) => void
	) {
		return this.supabase.auth.onAuthStateChange(callback);
	}

	login(email: string) {
		return from(this.supabase.auth.signInWithOtp({ email }));
	}

	logout() {
		return from(this.supabase.auth.signOut());
	}

	updateProfile(profile: Profile) {
		// const update = {
		//   ...profile,
		//   updated_time
		// }
		// return from(this.supabase.auth.updateUser(user));
	}
}
