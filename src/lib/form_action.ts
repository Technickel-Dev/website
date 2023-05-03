import { applyAction } from '$app/forms';
import { invalidateAll } from '$app/navigation';
import toast from 'svelte-french-toast';
import { loading } from '$state/loading';
import type { ActionResult } from '@sveltejs/kit';

type FormActionMessage = {
	message: string;
};

export const form_action = (
	{ message }: FormActionMessage,
	callback?: (data: any | unknown) => any
) => {
	return function form_enhance() {
		loading.setLoading(true);
		return async ({ result }: { result: ActionResult<any, any> }) => {
			if (message) {
				if (result.status === 200 || result.status === 301) {
					toast.success(message + ' success');
				} else {
					toast.error(message + ' failed');
				}
			}
			await invalidateAll();
			await applyAction(result);
			loading.setLoading(false);
			if (callback && 'data' in result && result?.data) callback(result.data);
		};
	};
};