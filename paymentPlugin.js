const bSecurePaymentTransactionURL = "https://api-dev.bsecure.app/v1/payment-plugin/create-order";

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
        (x // ðŸ‘ˆ null and undefined check
            && Object.keys(x).length === 0
            && Object.getPrototypeOf(x) === Object.prototype)
    );
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

function isJson(str) {
    try {
      str=JSON.parse(str);
    } catch (e) {
        return str;
    }
}

//Transaction Parameters
const bSecurePaymentTransactionParameters = {
    __00trid__: "", //              pp_OrderId
    __01curr__: "PKR", //			pp_TxnCurrency
    __02trdt__: "", //              pp_TxnDateTime
    __03stamt__: "", //             pp_TxnSubTotal
    __04damt__: "", //              pp_TxnDiscount
    __05tamt__: "", //             	pp_TxnTotal
    __06cname__: "", //             pp_CustomerName
    __07ccc__: "", //               pp_CustomerCountryCode
    __08cphn__: "", //              pp_CustomerPhoneNumber
    __09cemail__: "", //            pp_CustomerEmail
    __10ccc__: "", //               pp_CustomerCountry
    __11cstate__: "", //            pp_CustomerState
    __12ccity__: "", //            	pp_CustomerCity
    __13carea__: "", //     		pp_CustomerArea
    __14cfadd__: "", //   			pp_CustomerFormattedAddress
    __15mid__: "", //               pp_MerchantID
    __16stid__: "", //  			pp_StoreSlug
    __17seh__: "1.1", //
    __18ver__: "", // 				pp_Version
    __19lan__: "EN", //             pp_Language
    __20red__: "", //               pp_RedirectURL
    __21cenv__: ""//                pp_Environment
}


//Error Code Mappings
const bSecurePaymentPluginResponseHandler = {
    onErrorAlert: function (data) {
        return data;
    },
    onSuccessAlert: function (data) {
        return data;
    },
    onValidationErrorAlert: function (data) {
        return data;
    },
    onProcessPaymentSuccess: function (data) {
        return data;
    },
    onProcessPaymentFailure: function (data) {
        return data;
    },
    onHandleValidation: function (data) {
        return bSecurePaymentPluginResponseHandler.onValidationErrorAlert(isJson(data));
    },
    formatValidationError: function (data) {
        let format = { status: 422, message: data, body: {}, exception: {} };
        return bSecurePaymentPluginResponseHandler.onHandleValidation(format);
    },
    onException: function (msg) {
        throw new Error(msg)
    },
    handleErrors: function (data) {
        const responseCode = (data.status).toString();
        const responseException = data.exception;
        if (!isEmpty(responseException)) {
            bSecurePaymentPluginResponseHandler.onException(responseException);
        }

        if (responseCode.startsWith(2)) {
            bSecurePaymentPluginResponseHandler.onSuccessAlert(data);
        } else if (responseCode === "422") {
            bSecurePaymentPluginResponseHandler.onValidationErrorAlert(data);
        } else if (!isEmpty(responseCode)) {
            if (!isEmpty(data.body.result?.original)) {
                bSecurePaymentPluginResponseHandler.onProcessPaymentFailure(data.body.result?.original);
            } else {
                bSecurePaymentPluginResponseHandler.onErrorAlert(data);
            }
        }
    },
    handlePayments: function (data) {
        const responseCode = (data.status).toString();
        if (responseCode.startsWith(2)) {
            bSecurePaymentPluginResponseHandler.onProcessPaymentSuccess(data);
            bSecureApp.resetFrame();
        } else {
            bSecurePaymentPluginResponseHandler.onProcessPaymentFailure(data);
        }
    }
}



const bSecureApp = {
    initialize: function (objectId) {
        if (typeof objectId === 'string') {
            if (checkEmptyHtml("#bSecurePaymentPluginContainer")) {
                bSecurePaymentPluginResponseHandler.onException("bSecurePaymentPluginContainer is required.");
            } else if (checkEmptyHtml("#bSecurePaymentPluginContainer")) {
                bSecurePaymentPluginResponseHandler.onException("bSecurePaymentPluginContainer is required.");
            } else {
                const iframeListenerPrepared = bSecureApp.prepareFrameListener();
                if (iframeListenerPrepared) {
                    bSecureApp.generateOrder();
                }
            }
        }
    },
    generateOrder: function () {
        const xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            var _data = this;
            if (this.readyState == 4) {
                var _responseObj = isJson(_data.response);
                if (!isEmpty(_responseObj.body) && this.status == 200) {
                    if (!isEmpty(_responseObj.body.order_reference)) {
                        bSecureApp.prepareFrame(_responseObj.body);
                    } else {
                        bSecurePaymentPluginResponseHandler.handleErrors(_responseObj);
                    }
                } else {
                    bSecurePaymentPluginResponseHandler.handleErrors(_responseObj);
                }
            }
        };

        xhttp.open("POST", bSecurePaymentTransactionURL, true);
        xhttp.setRequestHeader("Content-Type", "application/json");
        xhttp.send(JSON.stringify({
            "redirect_url": bSecurePaymentTransactionParameters.__20red__,
            "plugin_version": bSecurePaymentTransactionParameters.__18ver__,
            "hash": bSecurePaymentTransactionParameters.__17seh__,
            "merchant_id": bSecurePaymentTransactionParameters.__15mid__,
            "store_id": bSecurePaymentTransactionParameters.__16stid__,
            "txn_reference": bSecurePaymentTransactionParameters.__02trdt__,
            "env_id": parseInt(bSecurePaymentTransactionParameters.__21cenv__),
            "customer": {
                "name": bSecurePaymentTransactionParameters.__06cname__,
                "email": bSecurePaymentTransactionParameters.__09cemail__,
                "country_code": bSecurePaymentTransactionParameters.__07ccc__,
                "phone_number": bSecurePaymentTransactionParameters.__08cphn__
            },
            "customer_address": {
                "country": bSecurePaymentTransactionParameters.__10ccc__,
                "province": bSecurePaymentTransactionParameters.__11cstate__,
                "city": bSecurePaymentTransactionParameters.__12ccity__,
                "area": bSecurePaymentTransactionParameters.__13carea__,
                "address": bSecurePaymentTransactionParameters.__14cfadd__
            },
            "order": {
                "order_id": bSecurePaymentTransactionParameters.__00trid__,
                "currency": bSecurePaymentTransactionParameters.__01curr__,
                "sub_total_amount": bSecurePaymentTransactionParameters.__03stamt__,
                "discount_amount": bSecurePaymentTransactionParameters.__04damt__,
                "total_amount": bSecurePaymentTransactionParameters.__05tamt__
            }
        }));
    },
    prepareFrame: function (body) {
        const { checkout_url } = body
        const ifrm = document.createElement("iframe");
        let url = new URL(checkout_url);
        // url.searchParams.append('order_ref', JSON.stringify(order_reference));

        ifrm.setAttribute("src", url.href);
        ifrm.setAttribute("id", 'bSecurePaymentPluginEmbeddedIframe');
        ifrm.setAttribute("name", 'bSecurePaymentPluginEmbeddedIframe');
        ifrm.style.position = "absolute";
        ifrm.style.border = "none";
        ifrm.style.top = "0";
        ifrm.style.left = "0";
        ifrm.style.width = "100%";
        ifrm.style.height = "100%";
        document.getElementById("bSecurePaymentPluginContainer").appendChild(ifrm);
    },
    resetFrame: function () {
        document.getElementById("bSecurePaymentPluginContainer").remove();
    },
    prepareFrameListener: function () {
        /*
        * CHECK TRANSACTION PARAMETERS
        */
        if (isEmpty(bSecurePaymentTransactionParameters.__00trid__)) {
            bSecurePaymentPluginResponseHandler.formatValidationError("pp_OrderId is required.");
            return false;
        } else if (isEmpty(bSecurePaymentTransactionParameters.__01curr__)) {
            bSecurePaymentPluginResponseHandler.formatValidationError("pp_TxnCurrency is required.");
            return false;
        } else if (isEmpty(bSecurePaymentTransactionParameters.__02trdt__)) {
            bSecurePaymentPluginResponseHandler.formatValidationError("pp_TxnDateTime is required.");
            return false;
        } else if (isEmpty(bSecurePaymentTransactionParameters.__03stamt__)) {
            bSecurePaymentPluginResponseHandler.formatValidationError("pp_TxnSubTotal is required.");
            return false;
        } else if (isEmpty(bSecurePaymentTransactionParameters.__04damt__)) {
            bSecurePaymentPluginResponseHandler.formatValidationError("pp_TxnDiscount is required.");
            return false;
        } else if (isEmpty(bSecurePaymentTransactionParameters.__05tamt__)) {
            bSecurePaymentPluginResponseHandler.formatValidationError("pp_TxnTotal is required.");
            return false;
        } else if (isEmpty(bSecurePaymentTransactionParameters.__06cname__)) {
            bSecurePaymentPluginResponseHandler.formatValidationError("pp_CustomerName is required.");
            return false;
        } else if (isEmpty(bSecurePaymentTransactionParameters.__07ccc__)) {
            bSecurePaymentPluginResponseHandler.formatValidationError("pp_CustomerCountryCode is required.");
            return false;
        } else if (isEmpty(bSecurePaymentTransactionParameters.__08cphn__)) {
            bSecurePaymentPluginResponseHandler.formatValidationError("pp_CustomerPhoneNumber is required.");
            return false;
        } else if (isEmpty(bSecurePaymentTransactionParameters.__10ccc__)) {
            bSecurePaymentPluginResponseHandler.formatValidationError("pp_CustomerCountry is required.");
            return false;
        } else if (isEmpty(bSecurePaymentTransactionParameters.__11cstate__)) {
            bSecurePaymentPluginResponseHandler.formatValidationError("pp_CustomerState is required.");
            return false;
        } else if (isEmpty(bSecurePaymentTransactionParameters.__12ccity__)) {
            bSecurePaymentPluginResponseHandler.formatValidationError("pp_CustomerCity is required.");
            return false;
        } else if (isEmpty(bSecurePaymentTransactionParameters.__13carea__)) {
            bSecurePaymentPluginResponseHandler.formatValidationError("pp_CustomerArea is required.");
            return false;
        } else if (isEmpty(bSecurePaymentTransactionParameters.__14cfadd__)) {
            bSecurePaymentPluginResponseHandler.formatValidationError("pp_CustomerFormattedAddress is required.");
            return false;
        } else if (isEmpty(bSecurePaymentTransactionParameters.__15mid__)) {
            bSecurePaymentPluginResponseHandler.formatValidationError("pp_MerchantID is required.");
            return false;
        } else if (isEmpty(bSecurePaymentTransactionParameters.__16stid__)) {
            bSecurePaymentPluginResponseHandler.formatValidationError("pp_StoreSlug is required.");
            return false;
        } else if (isEmpty(bSecurePaymentTransactionParameters.__17seh__)) {
            bSecurePaymentPluginResponseHandler.formatValidationError("pp_SecureId is required.");
            return false;
        } else if (isEmpty(bSecurePaymentTransactionParameters.__18ver__)) {
            bSecurePaymentPluginResponseHandler.formatValidationError("pp_Version is required.");
            return false;
        } else if (isEmpty(bSecurePaymentTransactionParameters.__20red__)) {
            bSecurePaymentPluginResponseHandler.formatValidationError("pp_RedirectURL is required.");
            return false;
        } else if (isEmpty(bSecurePaymentTransactionParameters.__21cenv__)) {
            bSecurePaymentPluginResponseHandler.formatValidationError("pp_RedirectURL is required.");
            return false;
        } else if (!navigator.cookieEnabled) {
            bSecurePaymentPluginResponseHandler.formatValidationError("Please Allow All Cookies from your browser settings.");
            return false;
        }
        /*
        * RECEIVE MESSAGE FROM CHILD
        */
        window.addEventListener("message", (e) => {
            const data = e.data;
            const source = data?.source;
            if (source === "embeddableShakehand") {
                bSecurePaymentPluginResponseHandler.handleErrors(data?.data)
            }
            if (source === "embeddableShakehandSuccess") {
                bSecurePaymentPluginResponseHandler.handlePayments(data?.data)
            }
        });
        return true
    }
}