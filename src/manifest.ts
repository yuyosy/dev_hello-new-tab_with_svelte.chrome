import type { ManifestV3Export } from '@crxjs/vite-plugin';


import pkgJson from '../package.json';

const manifest: ManifestV3Export = {
    manifest_version: 3,
    name: 'Hello-NewTab',
    version: pkgJson.version,
    description: '__MSG_app_description__',
    incognito: 'split',
    default_locale: 'en',
    icons: {
        '16': 'icons/icon-016.png',
        '48': 'icons/icon-016.png',
        '128': 'icons/icon-016.png'
    },
    permissions: [
        'bookmarks',
        'storage',
        'favicon'
    ],
    chrome_url_overrides: {
        newtab: 'src/newtab.html'
    },
    content_security_policy: {
        extension_pages: "script-src 'self'; object-src 'self'"
    },
    options_page: 'src/options.html',
	// background: {
	// 	service_worker: 'src/background.ts',
	// 	type : 'module'
	// }
}

export { manifest }