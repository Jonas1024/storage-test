document.addEventListener("testEvent", () => {
    console.log("Page clicked!");
    chrome.runtime.sendMessage({ action: "pageClicked" });
});