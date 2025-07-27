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

function shouldGrayscale(url) {
    try {
        const hostname = new URL(url).hostname;
        chrome.storage.local.get("grayscaleSites", (result) => {
            const siteList = result.grayscaleSites;
            return siteList.some(site => hostname === site || hostname.endsWith('.' + site));
        });
    } catch (e) {
        return false;
    }
}

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === 'complete' && tab.url && shouldGrayscale(tab.url)) {
        console.log("Flagged site detected. Engaging script for:", tab.url);
        console.log("Tab ID:", tabId);
        
        chrome.scripting.executeScript({
            target: { tabId: tabId },
            files: ['scripts/content.js']
        }).catch(err => {
            console.log("Something went wrong.");
        });
    }
});

chrome.runtime.onInstalled.addListener((details) => {
    if (details.reason === 'install') {
        chrome.storage.local.set({ grayscaleSites: defaultSites }, () => {
            console.log("Grayscale sites saved on first install");
        })
    }
})