const $popup = document.querySelector('#popup');
const $toggle = document.querySelector('#toggle');

/**
 * get data-theme-mode
 * @param {*} checked
 */
function getThemeMode(checked) {
    return checked ? 'dark' : 'light';
}

/**
 * send message to content script
 * @param {*} checked
 */
function changeThemeMode(checked) {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {
            themeMode: getThemeMode(checked),
        });
    });
}

/**
 * storage the theme mode status
 * @param {*} checked
 */
function storageThemeMode(checked) {
    chrome.storage.sync.set({ themeMode: getThemeMode(checked) }, function () {
        console.log({ themeMode: getThemeMode(checked) });
    });
}

/**
 * document load ready function
 * @param {} fn
 */
function ready(fn) {
    if (document.readyState != 'loading') {
        fn();
    } else if (document.addEventListener) {
        document.addEventListener('DOMContentLoaded', fn);
    } else {
        document.attachEvent('onreadystatechange', function () {
            if (document.readyState != 'loading') fn();
        });
    }
}

/**
 * set initial theme mode status
 */
ready(function () {
    chrome.storage.sync.get(['themeMode'], function (result) {
        $popup.dataset.themeMode = result.themeMode;
        $toggle.checked = result.themeMode === 'dark';
        $toggle.title = `${result.themeMode} mode`;
    });
});

/**
 * listen to the checkbox change
 */
$toggle.addEventListener('change', (event) => {
    let checked = event.target.checked;
    $popup.dataset.themeMode = getThemeMode(checked);
    changeThemeMode(checked);
    storageThemeMode(checked);
});
