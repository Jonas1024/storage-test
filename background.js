chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "pageClicked") {
        console.log("Page clicked! Opening new window...");

        // 创建一个新的浏览器窗口，加载插件的页面
        chrome.windows.create({
            url: chrome.runtime.getURL("popup.html"),  // 加载插件中的页面
            type: "popup",  // 设置窗口类型为弹出窗口
            width: 600,  // 设置窗口宽度
            height: 400  // 设置窗口高度
        }, (window) => {
            console.log("New window created with ID: ", window.id);
        });

        sendResponse({ status: "new window opened" });
    }
});