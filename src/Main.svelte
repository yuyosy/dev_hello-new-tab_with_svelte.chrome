<script lang="ts">
    import { getBookmarkItems } from "./getBookmarks";
    import { Macy } from "svelte-macy";

    const getbookmark = async ():Promise<Folder[]> => {
        let bookmarks: chrome.bookmarks.BookmarkTreeNode[] = await chrome.bookmarks.getTree();
        let results: Folder[] = getBookmarkItems(bookmarks);
        return results
    };
    let promise = getbookmark()

    let macy;
	let options = {
		trueOrder: false,
		mobileFirst: false,
        columns: 8,
        margin: { x: 30, y: 15 },
        breakAt: { 1400: 6, 1200: 5, 990: 4, 780: 3, 620: 2, 430: 1 }
	};
</script>
{#await promise then results}
    <Macy bind:macy={macy} options={options}>
        {#each results as folder}
            {#if folder.children.length > 0}
                <div class="content">
                    <div class="content-header">{folder.title}</div>
                    <ul>
                        {#each folder.children as bookmark} 
                        <li>
                            <a title={bookmark.title} href={bookmark.url} >
                                <!-- <img class="favicon" src={bookmark.faviconUrl} alt={bookmark.title} style="border-radius: 50%;"/> -->
                                {bookmark.title}
                            </a>
                        </li>
                        {/each}
                        <span class="bookmark-count">{folder.children.length} bookmark{folder.children.length === 1 ? '' : 's'}</span>
                    </ul>
                </div>
            {/if}
        {/each}
    </Macy>
{:catch error}
<p style="color: red">{error.message}</p>
{/await}

<style>
    .content {
        margin: 1.5rem 1.04rem;
        padding: 0;
        float: left;
        overflow: hidden;
        white-space: nowrap;
        border-radius: 0.65rem;
        transition: .48s cubic-bezier(.58, .11, .2, 1.00) all;
        background-color: #fff;
        border: 1px solid #ccc;
    }
</style>