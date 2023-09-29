<script lang="ts">
	import { invalidate } from '$app/navigation';
	import { onMount } from 'svelte';

	/** In order to catch supabase events being triggered, we need to create
	 * an event listener in the root layout.
	 */

	export let data;

	let { supabase, session } = data;
	$: ({ supabase, session } = data); // Reactive declaration to detect changes in data

	onMount(() => {
		const {
			data: { subscription }
		} = supabase.auth.onAuthStateChange((event, _session) => {
			// If there's a change in the expiration time, invalidate the session
			if (_session?.expires_at !== session?.expires_at) {
				invalidate('supabase:auth');
			}
		});
		// Cleanup
		return () => subscription.unsubscribe();
	});
</script>

<main>
	<slot />
</main>
