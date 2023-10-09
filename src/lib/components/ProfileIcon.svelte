<script lang="ts">
	import type { User } from '$lib/types/sb';

	export let user: User;
	export let size: 'small' | 'medium' | 'large' = 'medium';
</script>

{#if user.avatar_url}
	<img src={user.avatar_url} alt="avatar" class={size} />
{:else}
	<div class="profile-img {size}">
		<span class="initial">{user.full_name ? user.full_name[0] : '?'}</span>
	</div>
{/if}

<style lang="scss">
	.profile-img {
		background-color: #2f236717;
		display: flex;
		justify-content: center;
		align-items: center;
		.initial {
			font-weight: bold;
			opacity: 0.75;
		}
	}

	.small {
		width: 24px;
		min-width: 24px;
		height: 24px;
		border-radius: 5px;
		.initial {
			font-size: 12px;
		}
	}
	.medium {
		width: 40px;
		height: 40px;
		border-radius: 7px;
		.initial {
			font-size: 16px;
		}
	}
	.large {
		width: 80px;
		height: 80px;
		border-radius: 10px;
		.initial {
			font-size: 30px;
		}
	}
</style>
