import ApplicationsOptions from "./applicationOptions";

const appOptions = new ApplicationsOptions({
    name: 'test',
    defaults: {
        aaa: 10
    },
    storageType: 'local'
});

const storageCache = {};
// Asynchronously retrieve data from storage.sync, then cache it.
const initStorageCache = getAllStorageSyncData().then(items => {
    // Copy the data retrieved from storage into storageCache.
    Object.assign(storageCache, items);
});

chrome.bookmarks.onChanged.addListener(async () => {
    try {
        await initStorageCache;
    } catch (e) {
    }
})

function getAllStorageSyncData() {
    return new Promise((resolve, reject) => {
        chrome.storage.sync.get(null, (items) => {
            if (chrome.runtime.lastError) {
                return reject(chrome.runtime.lastError);
            }
            resolve(items);
        });
    });
}