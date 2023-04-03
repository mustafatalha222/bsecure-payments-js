

'use strict';

let { errorHandlers } = require("../utils/listeners");

const bSecurePaymentTransactionURL = "https://api-dev.bsecure.app/v1/payment-plugin/create-order";

var _require = require("./"),
    isEmpty = _require.isEmpty,
    prepareFrame = _require.prepareFrame;
    

function generateOrder(TransactionParameters) {
    const xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            var _data = this;
            if (this.readyState == 4) {
                var _responseObj = JSON.parse(_data.response);
                if (!isEmpty(_responseObj.body) && this.status == 200) {
                    if (!isEmpty(_responseObj.body.checkout_url)) {
                        prepareFrame(_responseObj.body.checkout_url);
                    } else {
                        errorHandlers.handleErrors(_responseObj);
                    }
                } else {
                    errorHandlers.handleErrors(_responseObj);
                }
            }
        };

        xhttp.open("POST", bSecurePaymentTransactionURL, true);
        xhttp.setRequestHeader("Content-Type", "application/json");
        xhttp.send(JSON.stringify({
            "redirect_url": TransactionParameters.__20red__,
            "plugin_version": TransactionParameters.__18ver__,
            "hash": TransactionParameters.__17seh__,
            "merchant_id": TransactionParameters.__15mid__,
            "store_id": TransactionParameters.__16stid__,
            "txn_reference": TransactionParameters.__02trdt__,
            "env_id": parseInt(TransactionParameters.__21cenv__),
            "customer": {
                "name": TransactionParameters.__06cname__,
                "email": TransactionParameters.__09cemail__,
                "country_code": TransactionParameters.__07ccc__,
                "phone_number": TransactionParameters.__08cphn__
            },
            "customer_address": {
                "country": TransactionParameters.__10ccc__,
                "province": TransactionParameters.__11cstate__,
                "city": TransactionParameters.__12ccity__,
                "area": TransactionParameters.__13carea__,
                "address": TransactionParameters.__14cfadd__
            },
            "order": {
                "order_id": TransactionParameters.__00trid__,
                "currency": TransactionParameters.__01curr__,
                "sub_total_amount": TransactionParameters.__03stamt__,
                "discount_amount": TransactionParameters.__04damt__,
                "total_amount": TransactionParameters.__05tamt__
            }
        }));
}

export = {
    generateOrder: generateOrder,
};