<script lang="ts">
	export let item: RssItem;

	import { createEventDispatcher } from 'svelte';
	import { pubDateToFriendly } from '$lib/date-ops';

	const dispatch = createEventDispatcher();
</script>

<article>
	<a href={item.link} target="_blank" rel="noopener noreferrer" >
		<svg>
			<use href="/feather-sprite.svg#link" />
		</svg></a
	>
	<span style="font-weight: 500; margin-left: 0.5rem">{item.author}</span>
	<span style="color: var(--black-color-light)">• {pubDateToFriendly(item.pubDate)}</span>
	<button on:click={() => dispatch('deselect')}>
		<svg>
			<use href="/feather-sprite.svg#x-circle" />
		</svg>
	</button>
	<h2>{@html item.title}</h2>
	{#each item.categories as cat}
		<span class="category">{cat}</span>
	{/each}
	<div>{@html item.description}</div>
</article>

<style>
	article {
		margin: 0;
		padding: 1rem;
		border-top-left-radius: 1.5rem;
		border-top-right-radius: 1.5rem;
		background-color: var(--white-color);
		min-height: 100%;
		width: 100%;
	}
	button {
		margin: 0;
		padding: 0;
		float: right;
		border: none;
		background-color: transparent;
		color: var(--black-color-light);
		font-size: 1.5rem;
		cursor: pointer;
	}
	h2 {
		display: block;
		text-decoration: none;
		font-size: 1.1rem;
		font-weight: 500;
	}
	svg {
		width: 1.4rem;
		height: 1.4rem;
		stroke: var(--primary-color);
		stroke-width: 2;
		stroke-linecap: round;
		stroke-linejoin: round;
		fill: none;
	}
	a svg {
		stroke: var(--accent-color);
	}
	a:visited svg {
		stroke: var(--secondary-color);
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
