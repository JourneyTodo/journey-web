<script lang="ts">
	import { enhance } from '$app/forms';
	import Button from '$lib/components/Button.svelte';
	import Dropdown from '$lib/components/Dropdown.svelte';
	import Header from '$lib/components/Header.svelte';
	import ProfileIcon from '$lib/components/ProfileIcon.svelte';
	import { daysOfWeek } from '$lib/constants/DaysOfWeek.enum.js';

	export let data;
	let { user, settings } = data;
	let selectedDayOfWeek = daysOfWeek[settings.week_start ?? 0];
	$: ({ settings } = data);
</script>

<Header title="Profile" />

<div class="container">
	<div class="wrapper">
		<h2 class="header-sm">Photo</h2>
		<ProfileIcon {user} size="large" />
	</div>

	<div class="wrapper">
		<h2 class="header-sm">Full name</h2>
		<p>{user.full_name}</p>
	</div>

	<div class="wrapper">
		<h2 class="header-sm">Email</h2>
		<p>{user.email}</p>
	</div>

	<div class="wrapper">
		<h2 class="header-sm">Week start</h2>
		<Dropdown items={daysOfWeek} bind:selected={selectedDayOfWeek} label="start of the week" />
	</div>

	<form id="user-settings" action="/?/settings" method="POST" use:enhance>
		<input type="hidden" name="id" value={user.id} />
		<input type="hidden" name="week_start" bind:value={selectedDayOfWeek} />
		<Button type="submit" size="small" variant="secondary">Save changes</Button>
	</form>
</div>

<style lang="scss">
	.container {
		display: flex;
		flex-direction: column;
		gap: var(--spacing-lg);
	}
</style>
