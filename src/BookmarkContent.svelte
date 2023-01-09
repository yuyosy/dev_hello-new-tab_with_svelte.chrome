<script lang="ts">
    export let folder: Folder;
</script>

<div class="content">
    <div class="content-header">{folder.title}</div>
    <ul>
        {#each folder.children as bookmark}
            <li>
                <a title={bookmark.title} href={bookmark.url}>
                    <img class="favicon" src={bookmark.faviconUrl} alt={bookmark.title}/>
                    {bookmark.title}
                </a>
            </li>
        {/each}
        <span class="bookmark-count">{folder.children.length} bookmark{folder.children.length === 1 ? "" : "s"}</span>
    </ul>
</div>

<style>
    .content {
        margin: 1.5rem 1.04rem;
        padding: 0;
        float: left;
        overflow: hidden;
        white-space: nowrap;
        border-radius: 0.65rem;
        transition: 0.48s cubic-bezier(0.58, 0.11, 0.2, 1) all;
        background-color: #fff;
        border: 1px solid #ccc;
    }
</style>
