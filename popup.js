// Load instance variables of the page
let isSettingsVisible = false;
const siteListView = document.getElementById("siteList");
const lockSettingsPicker = document.getElementById("lockSettingsPicker");

// sets picker to have selected the stored setting
chrome.storage.local.get("countdownSetting", (result) => {
    lockSettingsPicker.value = result.countdownSetting;
});

// sets site list view to include sites that the user has stored
chrome.storage.local.get("grayscaleSites", (result) => {
    const sites = result.grayscaleSites;

    if (sites && Array.isArray(sites)) {
        siteListView.value = sites.join('\n');
    } else {
        console.log("Sites either doesn't exist or sites is not an array");
    }
});

// Settings: 
const settingsButton = document.getElementById("settings");
const settingsPage = document.getElementById("settingsPage");
const actualSettingsPage = document.getElementById("actualSettingsPage");
const settingsLockMessage = document.getElementById("settingsLock");
settingsLockMessage.style.display = "none";

// Settings button click
settingsButton.addEventListener('click', () => {

    // Opens settings container
    isSettingsVisible = !isSettingsVisible;
    settingsPage.style.display = isSettingsVisible ? "block" : "none";

    // Gets countdownSetting and starts timer if its not 0
    chrome.storage.local.get("countdownSetting", (result) => {
        if (result.countdownSetting !== "0") {
            settingsLockMessage.style.display = "block";
            let countdown = parseInt(result.countdownSetting);
            const countdownTimer = setInterval(() => {
                if (countdown > 0) {
                    settingsLockMessage.textContent = `Settings is disabled for ${countdown} seconds`;
                    countdown--;
                } else {
                    settingsLockMessage.style.display = "none";
                }
            }, 1000);
        }
    });

    // displays settings
    actualSettingsPage.style.display = isSettingsVisible ? "block" : "none";
});

// Save button for site list
const saveButton = document.getElementById("saveSites");
saveButton.addEventListener('click', () => {
    const updatedSiteList = siteListView.value
        .split('\n')
        .map(line => line.trim())
        .filter(line => line !== '');
});


// Lock Settings Picker
lockSettingsPicker.addEventListener('change', function() {
    chrome.storage.local.set({"countdownSetting": this.value});
}); 


// Feedback
document.getElementById("feedback").addEventListener("click", () => {
  window.location.href = "mailto:warmer_scree.06@icloud.com?subject=Feedback"
});

