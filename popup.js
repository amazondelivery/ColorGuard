let isSettingsVisible = false;
const settingsButton = document.getElementById("settings");
const settingsPage = document.getElementById("settingsPage");
const siteList = document.getElementById("siteList");

chrome.storage.local.get("grayscaleSites", (result) => {
    const sites = result.grayscaleSites;
    
    if (sites && Array.isArray(sites)) {
        sites.forEach((site) => {

        });
    } else {
        
    }
});

settingsButton.addEventListener('click', () => {
    isSettingsVisible = !isSettingsVisible;
    settingsPage.style.display = isSettingsVisible ? "block" : "none";
});

document.getElementById("feedback").addEventListener("click", () => {
  window.location.href = "mailto:warmer_scree.06@icloud.com?subject=Feedback"
});

