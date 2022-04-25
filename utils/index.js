

'use strict';

function isEmpty(x) {
    return (
        typeof x === 'undefined' ||
        x === null ||
        x === 'null' ||
        x === 'undefined' ||
        x === false ||
        x.length === 0 ||
        x === ''
    );
}

function isJson(str) {
    try {
      str=JSON.parse(str);
    } catch (e) {
        return str;
    }
}

function checkEmptyHtml(id, checkChildNode = false) {
    const elem = document.querySelector(`${id}`);
    if (elem === null || elem === undefined) {
        return true;
    } else if (elem && elem.childNodes.length > 0 && checkChildNode) {
        return true;
    }
    return false;
}

function prepareFrame(id = "bSecurePaymentPluginContainer", checkout_url) {
    const ifrm = document.createElement("iframe");
    let url = new URL(checkout_url);

    ifrm.setAttribute("src", url.href);
    ifrm.setAttribute("id", 'bSecurePaymentPluginEmbeddedIframe');
    ifrm.setAttribute("name", 'bSecurePaymentPluginEmbeddedIframe');
    ifrm.style.position = "absolute";
    ifrm.style.border = "none";
    ifrm.style.top = "0";
    ifrm.style.left = "0";
    ifrm.style.width = "100%";
    ifrm.style.height = "100%";
    document.getElementById(id).appendChild(ifrm);
}


function resetFrame(id = "bSecurePaymentPluginContainer") {
    document.getElementById(id).remove();
}

module.exports = {
    isEmpty: isEmpty,
    isJson: isJson,
    checkEmptyHtml: checkEmptyHtml,
    prepareFrame: prepareFrame,
    resetFrame: resetFrame,
};