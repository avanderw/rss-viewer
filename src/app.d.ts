// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface Platform {}
	}
	interface RssFeed {
		title: string;
		link: string;
		description: string;
	}
	interface RssItem {
		author: string;
		title: string;
		link: string;
		pubDate: string;
		description: string;
		categories: string[];
	}
}

export { };
