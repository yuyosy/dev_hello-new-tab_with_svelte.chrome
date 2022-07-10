interface Bookmark {
    id?: string;
    title: string;
    url: string;
    faviconUrl: string;
    parent?: string;
}

interface Folder {
    id: string;
    title: string;
    path: string;
    visible: boolean;
    children: Bookmark[];
}

interface BookmarkSearchResult {
    id?: string;
    title: string;
    url: string;
    faviconUrl: string;
    path: string;
    parent?: string;
}