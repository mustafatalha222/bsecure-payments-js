let { errorHandlers, bSecurePaymentsHandler, bSecurePaymentsEventHandler, bSecurePaymentsSubscribeEventHandler } = require("../utils/listeners");
const bSecurePaymentAppURL = "https://bsecure-payment-plugin.herokuapp.com/";

let bSecurePaymentsTestMode = 0;
let bSecurePaymentsManageAlertsOnParentWindow = 0;

Object.defineProperty(exports, "__esModule", {
    value: true,
});

const _api = require("../utils/api"),
    generateOrder = _api.generateOrder;
const _require = require("../utils"),
    checkEmptyHtml = _require.checkEmptyHtml,
    isEmpty = _require.isEmpty,
    isJson = _require.isJson;

function prepareFrameListener() {
    /*
    * CHECK TRANSACTION PARAMETERS
    */
    if (isEmpty(TransactionParameters.__00trid__)) {
        return {
            status: false,
            exception: errorHandlers.formatValidationError("pp_OrderId is required."),
        };
    } else if (isEmpty(TransactionParameters.__01curr__)) {
        return {
            status: false,
            exception: errorHandlers.formatValidationError("pp_TxnCurrency is required."),
        };
    } else if (isEmpty(TransactionParameters.__02trdt__)) {
        return {
            status: false,
            exception: errorHandlers.formatValidationError("pp_TxnDateTime is required."),
        };
    } else if (isEmpty(TransactionParameters.__03stamt__)) {
        return {
            status: false,
            exception: errorHandlers.formatValidationError("pp_TxnSubTotal is required."),
        };
    } else if (isEmpty(TransactionParameters.__04damt__)) {
        return {
            status: false,
            exception: errorHandlers.formatValidationError("pp_TxnDiscount is required."),
        };
    } else if (isEmpty(TransactionParameters.__05tamt__)) {
        return {
            status: false,
            exception: errorHandlers.formatValidationError("pp_TxnTotal is required."),
        };
    } else if (isEmpty(TransactionParameters.__06cname__)) {
        return {
            status: false,
            exception: errorHandlers.formatValidationError("pp_CustomerName is required."),
        };
    } else if (isEmpty(TransactionParameters.__07ccc__)) {
        return {
            status: false,
            exception: errorHandlers.formatValidationError("pp_CustomerCountryCode is required."),
        };
    } else if (isEmpty(TransactionParameters.__08cphn__)) {
        return {
            status: false,
            exception: errorHandlers.formatValidationError("pp_CustomerPhoneNumber is required."),
        };
    } else if (isEmpty(TransactionParameters.__10ccc__)) {
        return {
            status: false,
            exception: errorHandlers.formatValidationError("pp_CustomerCountry is required."),
        };
    } else if (isEmpty(TransactionParameters.__11cstate__)) {
        return {
            status: false,
            exception: errorHandlers.formatValidationError("pp_CustomerState is required."),
        };
    } else if (isEmpty(TransactionParameters.__12ccity__)) {
        return {
            status: false,
            exception: errorHandlers.formatValidationError("pp_CustomerCity is required."),
        };
    } else if (isEmpty(TransactionParameters.__13carea__)) {
        return {
            status: false,
            exception: errorHandlers.formatValidationError("pp_CustomerArea is required."),
        };
    } else if (isEmpty(TransactionParameters.__14cfadd__)) {
        return {
            status: false,
            exception: errorHandlers.formatValidationError("pp_CustomerFormattedAddress is required."),
        };
    } else if (isEmpty(TransactionParameters.__15mid__)) {
        return {
            status: false,
            exception: errorHandlers.formatValidationError("pp_MerchantID is required."),
        };
    } else if (isEmpty(TransactionParameters.__16stid__)) {
        return {
            status: false,
            exception: errorHandlers.formatValidationError("pp_StoreSlug is required."),
        };
    } else if (isEmpty(TransactionParameters.__17seh__)) {
        return {
            status: false,
            exception: errorHandlers.formatValidationError("pp_SecureId is required."),
        };
    } else if (isEmpty(TransactionParameters.__18ver__)) {
        return {
            status: false,
            exception: errorHandlers.formatValidationError("pp_Version is required."),
        };
    } else if (isEmpty(TransactionParameters.__20cenv__)) {
        return {
            status: false,
            exception: errorHandlers.formatValidationError("pp_clientIntegrationType is required."),
        };
    } else if (!navigator.cookieEnabled) {
        return {
            status: false,
            exception: errorHandlers.formatValidationError("Please Allow All Cookies from your browser settings."),
        };
    }
    /*
    * RECEIVE MESSAGE FROM CHILD
    */
    window.addEventListener("message", (e) => {
        const data = e.data;
        const source = data?.source;
        if (source === "trigger_bsecure_payment_errors") {
            errorHandlers.handleErrors(data?.data)
        }
        if (source === "trigger_bsecure_payment_update") {
            errorHandlers.handlePayments(data?.data)
        }
        if (source  === "enable_bsecure_checkout_btn") {
            bSecurePaymentsHandler.enablePaymentButton(data.enable)
        }
        if (source  === "trigger_bsecure_payment_processing") {
            bSecurePaymentsHandler.onPaymentProcessing(data.data)
        }
        if (source  === "process_bsecure_payments") {
            bSecurePaymentsHandler.onPaymentPaymentRedirection(data.data)
        }
    });
    return {
        status: true,
        exception: '',
    };
}

//Transaction Parameters
const TransactionParameters = {
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
    __17seh__: "",
    __18ver__: "", // 				pp_Version
    __19lan__: "EN", //             pp_Language
    __20cenv__: ""//                pp_Environment
}

export const bSecurePayments = {
    initialize: function (objectId) {
        if (typeof objectId === 'string') {
            if (checkEmptyHtml("#bSecurePaymentPluginContainer")) {
                errorHandlers.onException("bSecurePaymentPluginContainer is required.")
            } else if (checkEmptyHtml("#bSecurePaymentPluginContainer")) {
                errorHandlers.onException("bSecurePaymentPluginContainer is required.")
            } else {
                const iframeListenerPrepared = prepareFrameListener();
                if (iframeListenerPrepared.status) {
                    generateOrder(TransactionParameters);
                } else {
                    return iframeListenerPrepared.exception
                }
            }
        } else {
            errorHandlers.onException("bSecurePaymentPluginContainer is required");
        }
    },
    enableDebugMode: function () {
        bSecurePaymentsTestMode = 1;
    },
    manageAlertsByMerchant: function () {
        bSecurePaymentsManageAlertsOnParentWindow = 1;
        // bSecurePayments.handleAlertsSettings()
    },
    proceedWithCheckout: function () {
        var win = document.getElementById("bSecurePaymentPluginContainer")!.querySelector("iframe") as HTMLIFrameElement;
        win.contentWindow?.postMessage({
            type: "submit_bsecure_checkout",
        }, bSecurePaymentAppURL)
    },
    checkoutEnabled: function () {
        window.parent.postMessage({
            type: "bsecure_checkout_window_enabled",
        })
    },
    handleAlertsSettings: function () {
        const enableInlineAlerts = bSecurePaymentsManageAlertsOnParentWindow == 1 ? 0 : 1;

        var win = document.getElementById("bSecurePaymentPluginContainer")!.querySelector("iframe") as HTMLIFrameElement;
        win.contentWindow?.postMessage({
            type: "trigger_bsecure_payment_alerts",
            enableInlineAlerts
        }, '*')
    },
    onHandleValidation: function (data) {
        if (bSecurePaymentsManageAlertsOnParentWindow == 1 ) {
            return bSecurePaymentsSubscribeEventHandler.onValidationErrorAlert(isJson(data));
        }
    },
    checkForErrorSend: function (data) {
        if (bSecurePaymentsManageAlertsOnParentWindow == 1) {
            bSecurePaymentsHandler.onValidationErrorAlert(data);
        }
    }
}


module.exports = {
    bSecurePayments,
    TransactionParameters,
    bSecurePaymentsHandler: bSecurePaymentsHandler,
    bSecurePaymentsEventHandler: bSecurePaymentsEventHandler,
};
