chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
        id: "email2menow",
        title: "Email2MeNow",
        contexts: ["selection"]
    });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === "email2menow") {
        const selectionText = info.selectionText;
        sendEmail(selectionText);
    }
});

function sendEmail(body) {
    const mailtoUrl = `mailto:?body=${encodeURIComponent(body)}`;
    chrome.tabs.create({ url: mailtoUrl }, (tab) => {
        setTimeout(() => chrome.tabs.remove(tab.id), 100);
    });
}
