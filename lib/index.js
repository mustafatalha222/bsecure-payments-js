let { errorHandlers, bSecurePaymentsHandler, bSecurePaymentsEventHandler } = require("../utils/listeners");

Object.defineProperty(exports, "__esModule", {
    value: true,
});

const _api = require("../utils/api"),
    generateOrder = _api.generateOrder;
const _require = require("../utils"),
    checkEmptyHtml = _require.checkEmptyHtml,
    isEmpty = _require.isEmpty;

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
    } else if (isEmpty(TransactionParameters.__20red__)) {
        return {
            status: false,
            exception: errorHandlers.formatValidationError("pp_RedirectURL is required."),
        };
    } else if (isEmpty(TransactionParameters.__21cenv__)) {
        return {
            status: false,
            exception: errorHandlers.formatValidationError("pp_ClientEnviromentId is required."),
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
        if (e.data.source === "embeddableShakehand") {
            errorHandlers.handleErrors(e.data.data)
        }
        if (e.data.source === "embeddableShakehandSuccess") {
            errorHandlers.handlePayments(e.data.data)
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
    // __17seh__: "",
    __18ver__: "", // 				pp_Version
    __19lan__: "EN", //             pp_Language
    __20red__: "", //               pp_RedirectURL
    __21cenv__: ""//                pp_Environment
}

const bSecurePayments = {
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
}


module.exports = {
    bSecurePayments,
    TransactionParameters,
    bSecurePaymentsHandler: bSecurePaymentsHandler,
    bSecurePaymentsEventHandler: bSecurePaymentsEventHandler
};
