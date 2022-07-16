<script lang="ts">
    import { getBookmarkItems } from "./getBookmarks";
    import { Macy } from "svelte-macy";
    import FolderContent from "./BookmarkContent.svelte";

    const getbookmark = async (): Promise<Folder[]> => {
        let bookmarks: chrome.bookmarks.BookmarkTreeNode[] = await chrome.bookmarks.getTree();
        let results: Folder[] = getBookmarkItems(bookmarks);
        return results;
    };
    
    let promise = getbookmark();

    let macy;
    let macyOptions = {
        trueOrder: false,
        mobileFirst: false,
        columns: 8,
        margin: { x: 30, y: 15 },
        breakAt: { 1400: 6, 1200: 5, 990: 4, 780: 3, 620: 2, 430: 1 },
    };
</script>
{#await promise then results}
    <Macy bind:macy options={macyOptions}>
        {#each results as folder}
            {#if folder.children.length > 0}
                <FolderContent {folder} />
            {/if}
        {/each}
    </Macy>
{:catch error}
    <p style="color: red">{error.message}</p>
{/await}
