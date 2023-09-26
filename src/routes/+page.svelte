<script lang="ts">
	import { browser } from '$app/environment';
	import Item from './Item.svelte';
	import List from './List.svelte';

	function getQueryParameter(variable: string) {
		if (!browser) {
			return;
		}
		let query = window.location.search.substring(1);
		let vars = query.split('&');
		for (const element of vars) {
			let pair = element.split('=');
			if (pair[0] == variable) {
				return pair[1];
			}
		}
		return undefined;
	}

	let rss: string | undefined = getQueryParameter('rss');
	let json: any;
	if (rss) {
		fetch('https://api.rss2json.com/v1/api.json?rss_url=' + rss)
			.then((response) => response.json())
			.then((data) => {
				json = data;
			});
	}

	let item: RssItem | undefined;
	function select(event: CustomEvent<RssItem>) {
		item = event.detail;
	}
</script>

{#if json}
	<h1>{json.feed.title}</h1>
	<h2>{json.feed.description}</h2>
	{#if item}
		<Item {item} on:deselect={() => (item = undefined)} />
	{:else}
		<List items={json.items} on:select={select} />
	{/if}
{/if}

<style>
	h1 {
		color: var(--primary-color-light);
		font-weight: 500;
		font-size: 1.2em;
		text-align: center;
	}
	h2 {
		color: var(--primary-color-light);
		font-weight: 400;
		font-size: 1em;
		text-align: center;
	}
</style>