<script lang="ts">
	import { currentDate } from '$lib/stores/modals.store';
	currentDate.set(null);
</script>

<slot />
