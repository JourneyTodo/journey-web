<script lang="ts">
	import SideNav from '$lib/components/side-nav/SideNav.svelte';

	export let data;

	let { user, goals } = data;
	$: ({ user, goals } = data);
</script>

<div class="container">
	<SideNav {user} {goals} />
	<main>
		<slot />
	</main>
</div>

<style lang="scss">
	.container {
		display: flex;
		main {
			flex: 1;
			margin: 2.5rem;
		}
	}
</style>
