const defaultSites = [
    "youtube.com",
    "facebook.com",
    "instagram.com",
    "reddit.com",
    "x.com",
    "tiktok.com",
    "pinterest.com",
    "twitch.tv"
];

async function shouldGrayscale(url) {
    try {
        const hostname = new URL(url).hostname;
        const result = await new Promise(resolve => {
            chrome.storage.local.get("grayscaleSites", resolve);
        })
        const siteList = result.grayscaleSites || [];
        
        const match = siteList.some(site => {
            const isMatch = hostname === site || hostname.endsWith('.' + site);
            return isMatch;
        });

        return match;
    } catch (e) {
        return false;
    }
}

chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
    const shouldInject = await shouldGrayscale(tab.url);
    if (changeInfo.status === 'complete' && tab.url && shouldInject) {
        console.log("Flagged site detected. Engaging script for:", tab.url);
        console.log("Tab ID:", tabId);
        
        chrome.scripting.executeScript({
            target: { tabId: tabId },
            files: ['scripts/content.js']
        }).catch(err => {
            console.log("Something went wrong." + err);
        });
    }
});

chrome.runtime.onInstalled.addListener((details) => {
    if (details.reason === 'install') {
        chrome.storage.local.set({ grayscaleSites: defaultSites }, () => {
            console.log("Grayscale sites saved on first install");
        });
    }
    chrome.storage.local.set({ countdownSetting: 0 }, () => {});
})