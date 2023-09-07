<script lang="ts">
    import { base } from '$app/paths';
	import { browser } from '$app/environment';
	import { ExternalLinkIcon } from 'svelte-feather-icons';

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

	let selected: { title: string } | undefined;
	function select(item: { title: string }) {
		if (selected && selected.title == item.title) {
			selected = undefined;
			return;
		}
		selected = item;
	}

	/** Convert pubDate to English meaningful date */
	function pubDateToFriendly(date: string) {
		let d = new Date(date);
		let now = new Date();
		let diff = now.getTime() - d.getTime();
		let days = Math.floor(diff / (1000 * 60 * 60 * 24));
		if (days == 0) {
			return 'Today';
		}
		if (days == 1) {
			return 'Yesterday';
		}
		if (days < 7) {
			return days + ' days ago';
		}
		return d.toLocaleDateString();
	}
</script>

{#if json}
	<h1>{json.feed.title}</h1>
	<ul>
		{#each json.items as item}
			<li>
				<div>
					<i>{pubDateToFriendly(item.pubDate)}</i>
					<button on:click={() => select(item)}>{item.title}</button>
					<a href={item.link} target="_blank"><ExternalLinkIcon size="18" /></a>
					{#each item.categories as category}
						<span>{category}</span>
					{/each}
				</div>
				{#if selected && selected.title == item.title}
					<div>
						{@html item.description}
					</div>
				{/if}
			</li>
		{/each}
	</ul>
{:else if rss}
	<p>Loading...</p>
{:else}
	<p>
		Enter a RSS feed URL as a query parameter, e.g. <a href="{base}/?rss=https://www.reddit.com/.rss"
			>{base}/?rss=https://www.reddit.com/.rss</a
		>
	</p>
{/if}

<style>
	button {
		/** Styled to look like a heading */
		background-color: transparent;
		border: none;
		font-size: 1.2em;
		font-weight: bold;
		cursor: pointer;
	}
	li {
		/** Styled to look like a link */
		list-style-type: none;
		margin: 10px 0;
		padding: 10px;
		border: 1px solid #eee;
		border-radius: 5px;
	}
	span {
		/** Styled to look like a tag */
		background-color: #eee;
		border-radius: 5px;
		padding: 2px 5px;
		margin: 0 5px;
		float: right;
	}
</style>
