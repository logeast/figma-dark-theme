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
        document.querySelector('body').dataset.themeMode = result.themeMode;
    });
});

/**
 * listen to the checkbox change and set theme
 */
chrome.runtime.onMessage.addListener((response) => {
    document.querySelector('body').dataset.themeMode = response.themeMode;
});
