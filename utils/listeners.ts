var _require = require("./"),
    isEmpty = _require.isEmpty,
    isJson = _require.isJson;
const EventEmitter = require('events');
// Initializing event emitter instances 
const bSecurePaymentsEventHandler = new EventEmitter();


const bSecurePaymentsSubscribeEventHandler = {
    onErrorAlert() {
        bSecurePaymentsEventHandler.on('errorAlert', (data) => {
            return data;
        });
    },
    onSuccessAlert() {
        bSecurePaymentsEventHandler.on('successAlert', (data) => {
            return data;
        });
    },
    onValidationErrorAlert() {
        bSecurePaymentsEventHandler.on('validationAlert', (data) => {
            return data;
        });
    },
    onProcessPaymentSuccess() {
        bSecurePaymentsEventHandler.on('onProcessPaymentSuccess', (data) => {
            return data;
        });
    },
    onProcessPaymentFailure() {
        bSecurePaymentsEventHandler.on('onProcessPaymentFailure', (data) => {
            return data;
        });
    },
}

const bSecurePaymentsHandler = {
    initialize: function () {
        bSecurePaymentsSubscribeEventHandler.onErrorAlert();
        bSecurePaymentsSubscribeEventHandler.onSuccessAlert();
        bSecurePaymentsSubscribeEventHandler.onValidationErrorAlert();
        bSecurePaymentsSubscribeEventHandler.onValidationErrorAlert();
        bSecurePaymentsSubscribeEventHandler.onProcessPaymentSuccess();
        bSecurePaymentsSubscribeEventHandler.onProcessPaymentFailure();
    },
    onErrorAlert: function (data) {
        bSecurePaymentsEventHandler.emit('errorAlert', data)
        return data;
    },
    onSuccessAlert: function (data) {
        bSecurePaymentsEventHandler.emit('successAlert', data)
        return data;
    },
    onValidationErrorAlert: function (data) {
        bSecurePaymentsEventHandler.emit('validationAlert', data)
        return data;
    },
    onProcessPaymentSuccess: function (data) {
        bSecurePaymentsEventHandler.emit('onProcessPaymentSuccess', data)
        return data;
    },
    onProcessPaymentFailure: function (data) {
        bSecurePaymentsEventHandler.emit('onProcessPaymentFailure', data)
        return data;
    },
}

const errorHandlers = {
    formatValidationError: function (data) {
        let _data = { status: 422, message: data, body: {}, exception: {} };
        return bSecurePaymentsHandler.onValidationErrorAlert(isJson(_data));
    },
    onException: function (msg) {
        throw new Error(msg)
        let _data = { status: 419, message: msg, body: {}, exception: {} };
        return bSecurePaymentsHandler.onErrorAlert(isJson(_data));
    },
    handleErrors: function (data) {
        const responseCode = (data.status).toString();
        const responseException = data.exception;
        if (!isEmpty(responseException)) {
            throw new Error(responseException)
        }

        if (responseCode.startsWith(2)) {
            bSecurePaymentsHandler.onSuccessAlert(data);
        } else if (responseCode === "422") {
            bSecurePaymentsHandler.onValidationErrorAlert(data);
        } else if (!isEmpty(responseCode)) {
            const _dataBody = data.body;
            if (!isEmpty(_dataBody) && _dataBody.hasOwnProperty(_dataBody.result) && !isEmpty(_dataBody.result.original)) {
                bSecurePaymentsHandler.onProcessPaymentFailure(data.body.result.original);
            } else {
                bSecurePaymentsHandler.onErrorAlert(data);
            }
        }
    },
    handlePayments: function (data) {
        const responseCode = (data.status).toString();
        if (responseCode.startsWith(2)) {
            bSecurePaymentsHandler.onProcessPaymentSuccess(data);
        } else {
            bSecurePaymentsHandler.onProcessPaymentFailure(data);
        }
    }
}

export = {
    errorHandlers: errorHandlers,
    bSecurePaymentsHandler: bSecurePaymentsHandler,
    bSecurePaymentsEventHandler: bSecurePaymentsEventHandler
};