document.addEventListener("DOMContentLoaded", function () {
    const saveLocalButton = document.getElementById("save-local");
    const loadLocalButton = document.getElementById("load-local");
  
    const saveIndexedDBButton = document.getElementById("save-indexeddb");
    const loadIndexedDBButton = document.getElementById("load-indexeddb");
  
    const saveChromeButton = document.getElementById("save-chrome");
    const loadChromeButton = document.getElementById("load-chrome");
  
    saveLocalButton.addEventListener("click", saveToLocalStorage);
    loadLocalButton.addEventListener("click", loadFromLocalStorage);
  
    saveIndexedDBButton.addEventListener("click", saveToIndexedDB);
    loadIndexedDBButton.addEventListener("click", loadFromIndexedDB);
  
    saveChromeButton.addEventListener("click", saveToChromeStorage);
    loadChromeButton.addEventListener("click", loadFromChromeStorage);
  });
  
  // 保存到 localStorage
  function saveToLocalStorage() {
    const key = document.getElementById("storage-key").value;
    const value = document.getElementById("storage-value").value;
    localStorage.setItem(key, value);
    alert("Data saved to localStorage!");
  }
  
  function loadFromLocalStorage() {
    const key = document.getElementById("storage-key").value;
    const value = localStorage.getItem(key);
    document.getElementById("output").textContent = value ? `localStorage: ${value}` : "No data found in localStorage";
  }
  
// 保存到 IndexedDB
function saveToIndexedDB() {
    const request = indexedDB.open("StorageTestDB", 1);
  
    request.onupgradeneeded = function (event) {
      const db = event.target.result;
      // 创建对象存储
      if (!db.objectStoreNames.contains("storage")) {
        db.createObjectStore("storage", { keyPath: "key" });
      }
    };
  
    request.onsuccess = function (event) {
      const db = event.target.result;
  
      // 确保对象存储存在
      if (db.objectStoreNames.contains("storage")) {
        const transaction = db.transaction("storage", "readwrite");
        const store = transaction.objectStore("storage");
  
        const key = document.getElementById("storage-key").value;
        const value = document.getElementById("storage-value").value;
        store.put({ key, value });
  
        alert("Data saved to IndexedDB!");
      } else {
        alert("Object store 'storage' not found. Please reload and try again.");
      }
    };
  
    request.onerror = function () {
      alert("Error saving to IndexedDB.");
    };
  }
  
  // 从 IndexedDB 加载数据
  function loadFromIndexedDB() {
    const request = indexedDB.open("StorageTestDB", 1);
  
    request.onupgradeneeded = function (event) {
      const db = event.target.result;
      // 创建对象存储
      if (!db.objectStoreNames.contains("storage")) {
        db.createObjectStore("storage", { keyPath: "key" });
      }
    };
  
    request.onsuccess = function (event) {
      const db = event.target.result;
  
      // 确保对象存储存在
      if (db.objectStoreNames.contains("storage")) {
        const transaction = db.transaction("storage", "readonly");
        const store = transaction.objectStore("storage");
  
        const key = document.getElementById("storage-key").value;
        const getRequest = store.get(key);
  
        getRequest.onsuccess = function () {
          const result = getRequest.result;
          document.getElementById("output").textContent = result
            ? `IndexedDB: ${result.value}`
            : "No data found in IndexedDB";
        };
  
        getRequest.onerror = function () {
          alert("Error loading data from IndexedDB.");
        };
      } else {
        alert("Object store 'storage' not found. Please save data first.");
      }
    };
  
    request.onerror = function () {
      alert("Error opening IndexedDB.");
    };
  }

  // 保存到 chrome.storage
  function saveToChromeStorage() {
    const key = document.getElementById("storage-key").value;
    const value = document.getElementById("storage-value").value;
    const data = {};
    data[key] = value;
  
    chrome.storage.local.set(data, function () {
      alert("Data saved to chrome.storage!");
    });
  }
  
  function loadFromChromeStorage() {
    const key = document.getElementById("storage-key").value;
    chrome.storage.local.get(key, function (result) {
      const value = result[key];
      document.getElementById("output").textContent = value ? `chrome.storage: ${value}` : "No data found in chrome.storage";
    });
  }