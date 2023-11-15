<script lang="ts">
	import ProfileIcon from '$lib/components/ProfileIcon.svelte';

	export let data;
	let { user } = data;
</script>

<h1>Profile</h1>

<h2>Photo</h2>

<ProfileIcon {user} size="large" />

<h2>Full name</h2>
<p>{user.full_name}</p>

<h2>Email</h2>
<p>{user.email}</p>
