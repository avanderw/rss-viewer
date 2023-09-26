<script lang="ts">
	export let items: RssItem[];

	import { base } from '$app/paths';
	import { createEventDispatcher } from 'svelte';
	import { pubDateToFriendly } from '$lib/date-ops';

	const dispatch = createEventDispatcher();
</script>

{#each items as item}
	<button on:click={() => dispatch('select', item)}>
		<a href={item.link} target="_blank" rel="noopener noreferrer" on:click={(e)=>{e.stopPropagation()}}>
			<svg>
				<use href="{base}/feather-sprite.svg#link" />
			</svg></a
		>
		<span style="font-weight: 500; margin-left: 0.5rem">{item.author}</span>
		<span style="color: var(--black-color-light)">• {pubDateToFriendly(item.pubDate)}</span>
		<span class="title">{@html item.title}</span>
		{#each item.categories as cat}
			<span class="category">{cat}</span>
		{/each}
		</button>
{/each}

<style>
	svg {
		width: 1.4rem;
		height: 1.4rem;
		stroke: var(--accent-color);
		stroke-width: 2;
		stroke-linecap: round;
		stroke-linejoin: round;
		fill: none;
	}
	a:visited svg {
		stroke: var(--secondary-color);
	}
	button {
		display: block;
		width: 100%;
		text-align: left;
		padding: 0.5rem;
		border: none;
		background-color: var(--white-color);
		border-bottom: 2px dotted var(--primary-color);
		font-weight: 500;
	}
	.title {
		display: block;
		width: 100%;
		text-align: left;
		padding: 0.5rem;
		border: none;
		background-color: var(--white-color);
		font-size: 1rem;
		font-weight: 500;
	}
	.category {
		display: inline-block;
		background-color: var(--primary-color);
		color: var(--white-color);
		padding: 0.2rem 0.4rem;
		border-radius: 0.25rem;
		margin-right: 0.25rem;
		margin-bottom: 0.5rem;
		font-size: 0.75rem;
		font-weight: 300;
	}
</style>
