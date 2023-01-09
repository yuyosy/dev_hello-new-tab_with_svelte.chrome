
// https://github.com/GoogleChrome/chrome-extensions-samples/blob/main/api/favicon/content.js
const getFaviconUrl = (u: string, size:number=16) =>  {
    const faviconUrl = new URL(chrome.runtime.getURL('/_favicon/'));
    faviconUrl.searchParams.set('pageUrl', u); // this encodes the URL as well
    faviconUrl.searchParams.set('size', String(size));
    return faviconUrl.toString();
  }

const getBookmarkItems = (treeNodes: chrome.bookmarks.BookmarkTreeNode[]): Folder[] => {
    const flattenNodes: Folder[] = []
    const walk = (nodes: chrome.bookmarks.BookmarkTreeNode[], paths: string[]):void => {
        nodes.forEach((node: chrome.bookmarks.BookmarkTreeNode) => {
            if (node.children && node.children.length === 0) {
                return;
            }
            if (node.children && node.children.length > 0) {
                const folderName:string = node.parentId === '0' ? '' : node.title;
                const curentPaths:string[] = [...paths, folderName]
                flattenNodes.push({
                    id: node.id,
                    title: node.title,
                    path: curentPaths.join('/'),
                    visible: true,
                    children: []
                })
                walk(node.children, curentPaths);
            } else {
                const parentNode = flattenNodes.find(obj => obj.id === node.parentId);
                parentNode.children.push(
                    {
                        id: node.id,
                        title: node.title,
                        url: node.url,
                        // faviconUrl: 'chrome://favicon/'+node.url,
                        faviconUrl: getFaviconUrl(node.url),
                        parent: node.parentId
                    }
                )
            }
        });
    }
    treeNodes.forEach((topLevelGroup) => {
        walk(topLevelGroup.children, []);
    })
    return flattenNodes;
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