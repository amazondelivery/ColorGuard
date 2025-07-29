let isSettingsVisible = false;const settingsButton = document.getElementById("settings");
const settingsPage = document.getElementById("settingsPage");
const siteList = document.getElementById("siteList");
const saveButton = document.getElementById("saveSites");

chrome.storage.local.get("grayscaleSites", (result) => {
    const sites = result.grayscaleSites;

    if (sites && Array.isArray(sites)) {
        siteList.value = sites.join('\n');
    } else {
        
    }
});

saveButton.addEventListener('click', () => {
    const updatedSiteList = siteList.value
        .split('\n')
        .map(line => line.trim())
        .filter(line => line !== '');
    chrome.storage.local.set({ grayscaleSites: updatedSiteList }, () => {
        console.log("Grayscale sites saved on update");
    });
});

settingsButton.addEventListener('click', () => {
    isSettingsVisible = !isSettingsVisible;
    settingsPage.style.display = isSettingsVisible ? "block" : "none";
});

document.getElementById("feedback").addEventListener("click", () => {
  window.location.href = "mailto:warmer_scree.06@icloud.com?subject=Feedback"
});

