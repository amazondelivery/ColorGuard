let isSettingsVisible = false;const settingsButton = document.getElementById("settings");
const settingsPage = document.getElementById("settingsPage");
const siteList = document.getElementById("siteList");
const saveButton = document.getElementById("saveSites");
const actualSettingsPage = document.getElementById("actualSettingsPage");
const settingsLockMessage = document.getElementById("settingsLock");
const lockSettingsPicker = document.getElementById("lockSettingsPicker");

let countdown = 0;

chrome.storage.local.set({ countdownSetting: 0 }, () => {});

chrome.storage.local.get("grayscaleSites", (result) => {
    const sites = result.grayscaleSites;

    if (sites && Array.isArray(sites)) {
        siteList.value = sites.join('\n');
    } else {
        console.log("uh oh");
    }
});

saveButton.addEventListener('click', () => {
    const updatedSiteList = siteList.value
        .split('\n')
        .map(line => line.trim())
        .filter(line => line !== '');
});

settingsButton.addEventListener('click', () => {
    isSettingsVisible = !isSettingsVisible;
    settingsPage.style.display = isSettingsVisible ? "block" : "none";
    countdownSetting = chrome.storage.local.get("countdownSetting", (result) => {
        if (countdownSetting != 0) {
            countdown = countdownSetting;
            const interval = setInterval(() => {
                if (countdown > 0) {
                    settingsLockMessage.textContent = `Settings is disabled for ${countdown} seconds`;
                    countdown--;
                } else {
                    clearInterval(interval);
                }
            }, 1000);
        }
    });
    actualSettingsPage.style.display = isSettingsVisible ? "block" : "none";
});

lockSettingsPicker.addEventListener('change', function() {
    chrome.storage.local.set({"countdownSetting":parseInt(this.value, 10)});
});

document.getElementById("feedback").addEventListener("click", () => {
  window.location.href = "mailto:warmer_scree.06@icloud.com?subject=Feedback"
});

