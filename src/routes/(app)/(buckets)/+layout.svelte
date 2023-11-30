<script lang="ts">
	import { currentDate } from '$lib/stores/modals.store.js';
	currentDate.set(null);
</script>

<slot />
