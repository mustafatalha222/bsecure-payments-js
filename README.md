
# bSecure Payment Plugin

[![npm version](https://badge.fury.io/js/bsecure.svg)](https://badge.fury.io/js/bsecure)
[![Build Status](https://scrutinizer-ci.com/g/bSecureCheckout/bsecure-payments-js/badges/build.png?b=master)](https://scrutinizer-ci.com/g/bSecureCheckout/bsecure-payments-js/build-status/master)
[![Code Coverage](https://scrutinizer-ci.com/g/bSecureCheckout/bsecure-payments-js/badges/coverage.png?b=master)](https://scrutinizer-ci.com/g/bSecureCheckout/bsecure-payments-js/?branch=master)
[![Scrutinizer Code Quality](https://scrutinizer-ci.com/g/bSecureCheckout/bsecure-payments-js/badges/quality-score.png?b=master)](https://scrutinizer-ci.com/g/bSecureCheckout/bsecure-payments-js/?branch=master)


bSecure Payment Plugin is a JavaScript library that allows you to securely process your payments. This plugin instantly creates a form that adheres to PCI, HIPAA, GDPR, or CCPA security requirements.\
It is built for _desktop_, _tablet_, and _mobile devices_ and is continuously tested and updated to offer a frictionless payment experience for your e-commerce store.

### About bSecure Payment Plugin

This Payment Gateway Integration Guide  is a technical integration document for merchants to integrate with bSecure Payment Plugin allowing their customers to perform e-commerce transactions over the internet.\
It guides merchants on how to use various functionality of the bSecure. The Merchant can enable credit card payments over their e-commerce website with this integration:

### Who Should Read This Guide

The document is intended for application developers and business analysts of merchants to allow them to integrate effectively with the bSecure Payment Plugin.

### Merchant Setup Process

In order to process online payments using the bSecure Payment Plugin, the merchant needs to be registered on bSecure [Builder Portal](https://builder.bsecure.pk/).  \
The below process assumes that the merchant has been registered and all the parameters related to the merchant have been configured.\
Once merchant has signed up for bSecure Builder Portal and get its payment gateway configured, the merchant will be in a
position to perform test transaction using the sample code provided. Once the sample transaction has been successfully processed it
indicates that all the required systems have been configured correctly and the merchant is ready to go.

#### Getting Your Credentials

1. Go to [Builder Portal](https://builder.bsecure.pk/)
2. [App Integration](https://builder.bsecure.pk/integration-sandbox) >> Sandbox / Live
3. Copy **Client Id** from App Integration tab and save it in a secure file.

### Installation

You can install the package via **npm**

`npm install bsecure-payment-plugin --save`

### Configuration

#### **a) Setting up a transaction:**

The bSecure Payment Plugin will receive an HTTP POST request from the merchant website which will contain the merchant authentication
details along with the transaction details. The Payment Plugin will inquire the required details from the customer and process transaction:

```JavaScript
bSecurePaymentTransactionParameters.__00trid__ = '';
bSecurePaymentTransactionParameters.__01curr__ = '';
bSecurePaymentTransactionParameters.__02trdt__ = '';
bSecurePaymentTransactionParameters.__03stamt__ = '';
bSecurePaymentTransactionParameters.__04damt__ = '';
bSecurePaymentTransactionParameters.__05tamt__ = '';
bSecurePaymentTransactionParameters.__06cname__ = '';
bSecurePaymentTransactionParameters.__07ccc__ = '';
bSecurePaymentTransactionParameters.__08cphn__ = '';
bSecurePaymentTransactionParameters.__09cemail__ = '';
bSecurePaymentTransactionParameters.__10ccc__ = '';
bSecurePaymentTransactionParameters.__11cstate__ = '';
bSecurePaymentTransactionParameters.__12ccity__ = '';
bSecurePaymentTransactionParameters.__13carea__ = '';
bSecurePaymentTransactionParameters.__14cfadd__ = '';
bSecurePaymentTransactionParameters.__15mid__ = '';
bSecurePaymentTransactionParameters.__16stid__ = '';
bSecurePaymentTransactionParameters.__17seh__ = '';
bSecurePaymentTransactionParameters.__18ver__ = '';
bSecurePaymentTransactionParameters.__19lan__ = '';
bSecurePaymentTransactionParameters.__20red__ = '';
bSecurePaymentTransactionParameters.__21cenv__ = '';
```

#### Glossary

| Key             | Property                    | Type         | Default            | Description        |
| :---------:     | :--------                   | :----------- | :--------          | :----------------  |
|  `__00trid__`   | Order id                    | string       | required           | A unique value created by the merchant to identify the transaction.  |
|  `__01curr__`   | currency                    | string       | 'PKR'              | Currency of Transaction amount. It has a fixed value of **_PKR_**      |   
|  `__02trdt__`   | Transaction date time       | string       | required           |  Merchant provided date and time of transaction. The format of date time should be _yyyyMMddHHmmss_. |
|  `__03stamt__`  | Subtotal amount             | string       | required           | The transaction subtotal amount amount.      |
|  `__04damt__`   | Discount amount             | string       | required           | The transaction discount amount.      |
|  `__05tamt__`   | Total amount                | string       | required           | The transaction total amount.      |
|  `__06cname__`  | Customer name               | optional       | required         | The name of transaction customer      |
|  `__07ccc__`    | Customer country code       | string       | required           | The country code of transaction customer      |
|  `__08cphn__`   | Customer phone number       | string       | required           | The phone number of transaction customer      |
|  `__09cemail__` | Customer email address      | string       | optional           | The email address of transaction customer      |
|  `__10ccc__`    | Customer country name       | string       | required           | The country name of transaction customer. It has a fixed value of **_PK_**      |
|  `__11cstate__` | Customer state name         | string       | required           | The state name of transaction customer      |
|  `__12ccity__`  | Customer city name          | string       | required           | The city name of transaction customer      |
|  `__13carea__`  | Customer area name          | string       | required           | The area name of transaction customer      |
|  `__14cfadd__`  | Customer formatted address  | string       | required           | The formatted address of transaction customer      |
|  `__15mid__`    | Merchant id                 | string       | required           | Unique Id assigned to merchant by **bSecure Builder Portal**.      |
|  `__16stid__`   | Store slug                  | string       | required           | Unique Slug assigned to each store by **bSecure Builder Portal**.      |
|  `__17seh__`    | Client id                   | string       | required           | Used to allow the plugin .|
|  `__19lan__`    | Order Lang                  | string       | EN                 | Language of Transaction. It has a fixed value of **EN**      |
|  `__20red__`    | Redirect url                | string       | required           | The URL where merchant wants the transaction results to be shown. Once the transaction has been processed, response details will be sent over to the merchant on this URL using an HTTP POST Request.   |
|  `__21cenv__`   | Integration type            | string       | required | The transaction integration type 1: Live 2: Sandbox


#### **b) Calculating Secure hash:**

Secure Hash is used to detect whether a transaction request and response has been tampered with. The **Client Id** generated for merchant at its [App Integration](https://builder.bsecure.pk/integration-sandbox) Tab is added to the transaction message and then an SHA256 algorithm is applied to generate a secure
hash. The secure hash is then sent to the receiving entity with the
transaction message. Because the receiving entity is the only other
entity apart from transaction initiator that knows the shared secret it
recreates the same secure hash and matches it with the one in the
request message. If the secure hash matches, the receiving entity
continues processing the transaction. If it doesn’t match, it assumes that
the transaction request has been tampered with and will stop processing
the transaction and send back an error message. This is a security feature
to secure the transaction and is recommended.\
The pp_SecureHash field is used for the SHA256 secure hash of initiator’s
shared secret and the transaction request. The secure hash value is the
Hex encoded SHA256 output of the transaction request or response
fields. The order that the fields are hashed in are:

1. The Shared Secret (shared between the PG and a merchant), the
system generated value, is always first.
2. Then all transaction request fields are concatenated to the Shared
Secret in alphabetical order of the field name. The sort should be in
ascending order of the ASCII value of each field string. If one string
is an exact substring of another, the smaller string should be before
the longer string. For example, Card should come before CardNum.
3. Fields must not have any spaces or separators between them and must not
include any null terminating characters.\
``
For example, if the Shared
Secret is 0F5DD14AE2E38C7EBD8814D29CF6F6F0, and the
transaction request includes the following fields:
``

     | Parameter                | Sample Values   |
     | :---------:              | :--------:      |
     |pp_MerchantID             | 1421            |
     | pp_OrderInfo             | A48cvE28        |   
     | pp_Amount                | 2995        |   

     In ascending alphabetical order the transaction request fields inputted
     to the SHA256 hash would be:
     ``0F5DD14AE2E38C7EBD8814D29CF6F6F02995MER123A48cvE28``\
     Example of a Secure Hash Calculation
     0F5DD14AE2E38C7EBD8814D29CF6F6F02995MER123A48cvE28
     Merchant should also ensure that:
     1. UTF-8 encoding should be used to convert the input from a printable
     string to a byte array. Note that 7-bit ASCII encoding is unchanged
     for UTF-8.
     2. The hash output must be hex-encoded.

``
Note: Inorder to calculate secure hash we are using libraries named [CryptoJS](https://www.npmjs.com/package/crypto-js)
``


#### **c) Listen events from Plugin:**

The bSecure Payment Plugin will return an HTTP POST request inside its listeners defined on the merchant website which will contain the error response incurred while processing transaction request. 


## How to use

Merchant has to add below mention **HTML** code on its website

```HTML
<div id="bSecurePaymentPluginContainer"></div>
```

#### **a) Setting up a transaction:**

```JavaScript
import {
    TransactionParameters,
} from "bsecure-payments-js"


TransactionParameters.__00trid__   = "<order-id>";
TransactionParameters.__01curr__   = "<currency>";
TransactionParameters.__02trdt__   = "<transaction-date-time>";
TransactionParameters.__03stamt__  = "<subtotal-amount>";
TransactionParameters.__04damt__   = "<discount-amount>";
TransactionParameters.__05tamt__   = "<total-amount>";
TransactionParameters.__06cname__  = "<customer-name>";
TransactionParameters.__07ccc__    = "<customer-country-cod>";
TransactionParameters.__08cphn__   = "<customer-phone-number>";
TransactionParameters.__09cemail__ = "<customer-email-address>";
TransactionParameters.__10ccc__    = "<customer-country-name>";
TransactionParameters.__11cstate__ = "<customer-state-name>";
TransactionParameters.__12ccity__  = "<customer-city-name>";
TransactionParameters.__13carea__  = "<customer-area-name>";
TransactionParameters.__14cfadd__  = "<customer-formatted-address>";
TransactionParameters.__15mid__    = "<merchant-id>";
TransactionParameters.__16stid__   = "<store-slug>";
TransactionParameters.__18ver__    = "<plugin-version>";
TransactionParameters.__20red__    ="<redirect-url>";
TransactionParameters.__21cenv__   = "<integration-type>";
```


#### **b) Calculating Secure hash:**

```JavaScript
const salt = "<CLIENT-ID>";
let _signature = salt + "&";
Object.keys(TransactionParameters)
    .sort()
    .forEach(function (v, idx, array) {
        let _val = TransactionParameters[v].toString().replace(/\s/g, '');
        _signature += _val.concat(idx === array.length - 1 ? "" : "&")
    });
let _hash = CryptoJS.HmacSHA256(_signature, salt).toString();
TransactionParameters.__17seh__ = _hash.toUpperCase();
```

#### **c) Listen events from Plugin:**

```JavaScript
import {
    bSecurePaymentsHandler,
} from "bsecure-payments-js"

bSecurePaymentsHandler.initialize();
bSecurePaymentsHandler.onErrorAlert = function (msg) {
    return msg;
}
bSecurePaymentsHandler.onSuccessAlert = function (msg) {
    return msg;
        }
bSecurePaymentsHandler.onValidationErrorAlert = function (msg) {
    return msg;
}
bSecurePaymentsHandler.onProcessPaymentSuccess = function (msg) {
    return msg;
}
bSecurePaymentsHandler.onProcessPaymentFailure = function (msg) {
    return msg;
}
```

#### **d) Initialize transaction:**


```JavaScript
import {
    bSecurePayments,
} from "bsecure-payments-js"

bSecurePayments.initialize("bSecurePaymentPluginContainer");
```


### Demo

click here to see the [**demo**](https://bsecure-stage-test-app.herokuapp.com/)

### Changelog

Please see [CHANGELOG](CHANGELOG.md) for more information what has changed recently.

## License

The MIT License (MIT). Please see [License File](LICENSE.md) for more information.

## Contributions

**"bSecure – Payment Plugin"** is open source software.
