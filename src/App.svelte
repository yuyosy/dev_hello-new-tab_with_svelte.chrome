<script lang="ts">
    import { getBookmarkItems } from "./getBookmarks";

    const getbookmark = async ():Promise<Folder[]> => {
        let bookmarks: chrome.bookmarks.BookmarkTreeNode[] = await chrome.bookmarks.getTree();
        let results: Folder[] = getBookmarkItems(bookmarks);
        return results
    };
    let promise = getbookmark()
</script>

<main>HelloNewTab</main>

{#await promise}
    <p>...waiting</p>
{:then results}
    {#each results as folder}
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
                <span class="bookmark-count">19 bookmarks</span>
            </ul>
        </div>
    {/each}
{:catch error}
    <p style="color: red">{error.message}</p>
{/await}