<script lang="ts">
	import type { User } from '$lib/types/sb';

	export let user: User;
	export let size: 'small' | 'medium' | 'large' = 'medium';
</script>

{#if user.avatar_url}
	<img src={user.avatar_url} alt="avatar" class={size} />
{:else}
	<div class="profile-img">
		<span class="initial">{user.full_name ? user.full_name[0] : '?'}</span>
	</div>
{/if}

<style lang="scss">
	.profile-img {
		min-width: 24px;
		height: 24px;
		border-radius: 6px;
		background-color: #2f236717;
		display: flex;
		justify-content: center;
		align-items: center;
		.initial {
			font-size: 12px;
			font-weight: bold;
		}
	}

	.small {
		width: 24px;
		height: 24px;
		border-radius: 6px;
	}
	.medium {
		width: 32px;
		height: 32px;
		border-radius: 8px;
	}
	.large {
		width: 40px;
		height: 40px;
		border-radius: 10px;
	}
</style>
