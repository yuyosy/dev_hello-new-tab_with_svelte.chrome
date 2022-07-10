
const getBookmarkItems = (treeNodes: chrome.bookmarks.BookmarkTreeNode[]): Folder[] => {
    const flattenNodes: { [name: string]: Folder } = {}
    const walk = (nodes: chrome.bookmarks.BookmarkTreeNode[], paths: string[]) => {
        nodes.forEach((node) => {
            if (node.children && node.children.length === 0) {
                return;
            }
            if (node.children && node.children.length > 0) {
                const folderName = node.parentId === '0' ? '' : node.title;
                const curentPaths = [...paths, folderName]
                flattenNodes[node.id] = {
                    id: node.id,
                    title: node.title,
                    path: curentPaths.join('/'),
                    visible: true,
                    children: []
                }
                walk(node.children, curentPaths);
            } else {
                flattenNodes[node.parentId].children.push(
                    {
                        id: node.id,
                        title: node.title,
                        url: node.url,
                        faviconUrl: node.url,
                        parent: node.parentId
                    }
                )
            }
        });
    }
    treeNodes.forEach((topLevelGroup) => {
        walk(topLevelGroup.children, []);
    })
    return Object.values(flattenNodes);
}

const getBookmarkSearchItems = (treeNodes: chrome.bookmarks.BookmarkTreeNode[]): BookmarkSearchResult[] => {
    const results: BookmarkSearchResult[] = []

    const walk = (nodes: chrome.bookmarks.BookmarkTreeNode[], paths: string[]) => {
        nodes.forEach((node) => {
            if (node.children) {
                const _folderName = node.parentId === '0' ? '' : node.title;
                walk(node.children, [...paths, _folderName]);
                return;
            }

            if (!node.url) return;

            const folderName = node.parentId === '1' ? '' : paths.filter((name) => name).join('/');
            results.push({
                id: node.id,
                title: node.title || node.url,
                parent: node.parentId,
                url: node.url,
                path: folderName,
                faviconUrl: node.url
            });
        });
    };

    walk(treeNodes, []);
    return results;
}

export { getBookmarkItems, getBookmarkSearchItems }