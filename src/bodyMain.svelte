<script lang="ts">
    import { getBookmarkItems } from "./getBookmarks";

    const getbookmark = async ():Promise<Folder[]> => {
        let bookmarks: chrome.bookmarks.BookmarkTreeNode[] = await chrome.bookmarks.getTree();
        let results: Folder[] = getBookmarkItems(bookmarks);
        return results
    };
    let promise = getbookmark()
</script>


{#await promise}
    <p>...waiting</p>
{:then results}
    {#each results as folder}
        {#if folder.children.length > 0}
        <div>
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
{:catch error}
    <p style="color: red">{error.message}</p>
{/await}