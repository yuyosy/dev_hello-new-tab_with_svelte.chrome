<script lang="ts">
    import { onMount } from 'svelte';
    import {getBookmarkItems} from './getBookmarks'

    onMount(async () => {
        let bookmarks = await chrome.bookmarks.getTree();
        const results = getBookmarkItems(bookmarks)
        console.log(results)
    });
</script>

<main>HelloNewTab</main>
