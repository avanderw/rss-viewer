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
		window.scrollTo(0, 0);
	}
</script>

{#if json}
	<div class="header">
		<h1>{json.feed.title}</h1>
		<h2>{json.feed.description}</h2>
	</div>
	{#if item}
		<Item {item} on:deselect={() => (item = undefined)} />
	{:else}
		<List items={json.items} on:select={select} />
	{/if}
{:else}
	<h1>No RSS feed configured</h1>
	<h2>
		Below are some examples:
		<table>
			<tr>
				<td>reddit (front page)</td>
				<td
					><a href="?rss=https://www.reddit.com/.rss" target="_self"
						>?rss=https://www.reddit.com/.rss</a
					></td
				>
			</tr>
			<tr>
				<td>reddit (subreddit)</td>
				<td
					><a href="?rss=https://www.reddit.com/r/news/.rss" target="_self"
						>?rss=https://www.reddit.com/r/news/.rss</a
					></td
				>
			</tr>
			<tr>
				<td>reddit (user)</td><td
					><a href="?rss=https://www.reddit.com/user/alienth/.rss" target="_self"
						>?rss=https://www.reddit.com/user/alienth/.rss</a
					></td
				>
			</tr>
			<tr>
				<td>reddit (multi-reddit)</td><td
					><a href="?rss=https%3A%2F%2Fwww.reddit.com%2Fr%2Fnews%2Bwtf.rss" target="_self"
						>?rss=https://www.reddit.com/r/news+wtf.rss</a
					></td
				>
			</tr>
		</table>
	</h2>
{/if}

<style>
	:global(body) {
		overflow-x: hidden;
	}
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
	table {
		margin: 10px auto;
	}
	td {
		text-align: left;
	}
	.header {
		position: sticky;
		top: 0;
		z-index: 999;
		background-color: var(--primary-color-dark);
		padding: 1em;
	}
</style>
