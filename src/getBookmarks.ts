
const getBookmarkItems = (treeNodes: chrome.bookmarks.BookmarkTreeNode[]): Folder[] => {
    const flattenNodes: { [name: string]: Folder } = {}
    const walk = (nodes: chrome.bookmarks.BookmarkTreeNode[], paths: string[]):void => {
        nodes.forEach((node: chrome.bookmarks.BookmarkTreeNode) => {
            if (node.children && node.children.length === 0) {
                return;
            }
            if (node.children && node.children.length > 0) {
                const folderName:string = node.parentId === '0' ? '' : node.title;
                const curentPaths:string[] = [...paths, folderName]
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
                        faviconUrl: 'chrome://favicon/'+node.url,
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

    const walk = (nodes: chrome.bookmarks.BookmarkTreeNode[], paths: string[]):void => {
        nodes.forEach((node: chrome.bookmarks.BookmarkTreeNode) => {
            if (node.children) {
                const folderName:string = node.parentId === '0' ? '' : node.title;
                walk(node.children, [...paths, folderName]);
                return;
            }

            if (!node.url) return;

            const path:string = node.parentId === '1' ? '' : paths.filter((name) => name).join('/');
            results.push({
                id: node.id,
                title: node.title || node.url,
                parent: node.parentId,
                url: node.url,
                path: path,
                faviconUrl: 'chrome://favicon/'+node.url
            });
        });
    };

    walk(treeNodes, []);
    return results;
}

export { getBookmarkItems, getBookmarkSearchItems }