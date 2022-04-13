const referrer = location.host;

function isEmpty(x) {
  return (
    typeof x === undefined ||
    typeof x === "undefined" ||
    x === null ||
    x === "null" ||
    x === "undefined" ||
    x === false ||
    x.length === 0 ||
    (x === "object" && Object.key(x).length === 0) ||
    x === "" ||
    (x // 👈 null and undefined check
      && Object.keys(x).length === 0
      && Object.getPrototypeOf(x) === Object.prototype)
  );
}


function checkEmptyHtml(id , checkChildNode = false) {
  const elem = document.querySelector(`${id}`);
  if (elem === null || elem === undefined) {
    return true;
  }else if (elem && elem.childNodes.length > 0 && checkChildNode) {
    return true;
  }
  return false;
}

function clearAlerts(elem) {
    if(elem){
      elem.innerHTML = "";
    }
    const parentContainer = document.getElementById("bAppAlertContainer");
    if(parentContainer.classList.contains("show")){
      parentContainer.classList.remove("show");
    }
}

function alertHandler(message, type) {
  if(checkEmptyHtml(".bAppAlert", true)){
    const elem = document.querySelector(`.bAppAlert`);
    clearAlerts(elem);
  };

  const parentContainer = document.getElementById("bAppAlertContainer");

  const childContainer = document.createElement("div");
  childContainer.className = "bAppAlert";

  const alertContainer ='<div class="alert-' + type + '">' +
    message +
    '</div>';
  childContainer.innerHTML = alertContainer;

  // append theKid to the end of theParent
  parentContainer.classList.add("show");
  setTimeout(function() {
    clearAlerts(parentContainer);
  }, 5000);
  // append theKid to the end of theParent
  parentContainer.appendChild(childContainer);

  // prepend theKid to the beginning of theParent
  parentContainer.insertBefore(childContainer, parentContainer.firstChild);
}




//Error Code Mappings
const bAppResponseHanlder = {
  onError: function (data) {
    const responseMsg = data.message;
    const responseType = data.type;
    alertHandler(responseMsg, responseType)
  },
  onSucces: function (data) {
    const responseMsg = data.message;
    const responseType = data.type;
    alertHandler(responseMsg, responseType)
  },
  onException: function (msg) {
    throw new Error(msg)
  },
  handleErrors: function (data) {
    const responseCode = (data.code).toString();
    const responseException = data.exception;
    const responseMsg = data.message;
    if (!isEmpty(responseException)) {
      bAppResponseHanlder.onException(responseException);
    }

    if (responseCode.startsWith(2)) {
      bAppResponseHanlder.onSucces(data);
    } else if (!isEmpty(responseMsg)) {
      bAppResponseHanlder.onError(data);
    }
  },
}

const bSecureApp = {
  initialize: function (initObj) {
    if (typeof initObj === 'object') {
      if (checkEmptyHtml("#bAppContainer")) {
        bAppResponseHanlder.onException("bAppContainer is missing.");
      } else {
        if (checkEmptyHtml("#bAppAlertContainer")) {
          bAppResponseHanlder.onException("bAppAlertContainer is missing.");
        } else {
          bSecureApp.prepareFrameListener();
          bSecureApp.prepareFrame(initObj);
        }
      }
    }
  },
  prepareFrame : function(initObj) {
    const ifrm = document.createElement("iframe");
    let url = new URL('https://bsecure-payment-plugin.herokuapp.com/');
    // url.searchParams.append('host', "localhost");
    // url.searchParams.append('storeSlug', initObj.storeSlug);
    // url.searchParams.append('appTheme', isEmpty(initObj.appTheme) ? "default" : initObj.appTheme);
    ifrm.setAttribute("src", url.href);
    ifrm.setAttribute("id", 'bAppEmbeddedIframe');
    ifrm.setAttribute("name", 'bAppEmbeddedIframe');
    ifrm.style.position = "absolute";
    ifrm.style.border = "none";
    ifrm.style.top = "0";
    ifrm.style.left = "0";
    ifrm.style.width = "100%";
    ifrm.style.height = "100%";
    document.getElementById("bAppContainer").appendChild(ifrm);
  },
  prepareFrameListener : function() {
    /*
    * RECEIVE MESSAGE FROM CHILD
    */
    window.addEventListener("message", (e) => {
      const data = e.data;
      const source = data?.source;
      if (source === "embeddableShakehand") {
        bAppResponseHanlder.handleErrors(data?.data)
        // frame.postMessage("HARE AND NOW THIS TEXT IS BEING SENT TO CHILD", "*");
      }
    });
  }
}
