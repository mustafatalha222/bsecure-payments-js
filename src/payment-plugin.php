<?php include 'wrapper/template.php' ?>

<?php startblock('styles') ?>
<style>
    #bSecurePaymentPluginContainer {
        position: relative;
        display: block;
        overflow: auto;
        max-width: 400px;
        min-height: 86vh;
        margin-bottom: 20px;
        background-color: #fff;
        -o-object-fit: scale-down;
        object-fit: scale-down;
        margin: 0 auto 20px auto;
    }

    #alertContainer {
        top: 0;
        margin-bottom: 5px;
        -o-object-fit: scale-down;
        object-fit: scale-down;
        height: 50px;
        border: 1px solid black;
        transition: visibility 0s linear 0.33s, opacity 0.33s linear;
    }

    #alertContainer.hide {
        position: relative;
        border: 1px solid transparent;
        border-radius: 3px;
        visibility: hidden;
        opacity: 0;
        transition: visibility 0s linear 0.33s, opacity 0.33s linear;
    }

    #alertContainer.show {
        visibility: visible;
        opacity: 1;
        transition: visibility 5s linear 0.33s, opacity 0.33s linear;
    }

    .alert {
        position: relative;
        border: 1px solid transparent;
        border-radius: 3px;
    }

    .alert>.alert-heading {
        color: inherit;
    }

    .alert>.alert-primary {
        color: #24426c;
        background-color: #dae5f5;
        border-color: #cbdbf2;
    }

    .alert>.alert-primary hr {
        border-top-color: #b7cded;
    }


    .alert>.alert-secondary {
        padding: 0.75rem 1.25rem;
        color: #464a4e;
        background-color: #e7e8ea;
        border-color: #dddfe2;
    }

    .alert>.alert-secondary hr {
        border-top-color: #cfd2d6;
    }

    .alert>.alert-success {
        padding: 0.75rem 1.25rem;
        color: #316100;
        background-color: #dff1cc;
        border-color: #d2ecb8;
    }

    .alert>.alert-success hr {
        border-top-color: #c5e7a4;
    }


    .alert>.alert-info {
        padding: 0.75rem 1.25rem;
        color: #24587e;
        background-color: #daeefc;
        border-color: #cbe7fb;
    }

    .alert>.alert-info hr {
        border-top-color: #b3dcf9;
    }

    .alert>.alert-warning {
        padding: 0.75rem 1.25rem;
        color: #7d6608;
        background-color: #fcf3cf;
        border-color: #fbeebc;
    }

    .alert>.alert-warning hr {
        border-top-color: #fae8a4;
    }

    .alert>.alert-danger {
        padding: 0.75rem 1.25rem;
        color: #6b1110;
        background-color: #f5d2d2;
        border-color: #f1c1c0;
    }

    .alert>.alert-danger hr {
        border-top-color: #ecacab;
    }
</style>
<?php endblock() ?>

<?php startblock('headerScripts') ?>
<!-- <script src="../paymentPlugin.js"></script> -->
<script src="https://bsecure-dev.s3-eu-west-1.amazonaws.com/stage/bApps/payment-plugin/bsecure-PaymentPlugin.js"></script> 
<?php endblock() ?>



<?php startblock('body') ?>
<div id="alertContainer">
    <div class="alert">

    </div>
</div>
<div id="bSecurePaymentPluginContainer"></div>
<?php endblock() ?>

<?php startblock('scripts') ?>

<script>
    let customerName, 
        customerCountryCode,
        customerPhoneNumber,
        redirect_url,
        customerEmail,
        customerCountry,
        customerState,
        customerCity,
        customerArea,
        customerFormattedAddress,
        orderId,
        currency,
        subTotalAmount,
        discountAmount,
        totolAmount,
        merchantId,
        storeSlug = "";


    function fetchTransactionDetails() {
        orderId = prompt("Please enter order id", "xtend-001");
        currency = prompt("Please enter currency", "PKR");
        redirect_url = prompt("Please enter redirect url", window.location);
        subTotalAmount = prompt("Please enter subtotal amount", "500");
        discountAmount = prompt("Please enter discount amount", "50");
        totolAmount = prompt("Please enter total amount", "450");
        customerName = prompt("Please enter your customer's name", "Default User");
        customerCountryCode = prompt("Please enter your customer's country code", "92");
        customerPhoneNumber = prompt("Please enter your customer's phone number", "3452099688");
        customerEmail = prompt("Please enter your customer's email", "test1@nextgeni.net");
        customerCountry = prompt("Please enter your customer's country name", "Pakistan");
        customerState = prompt("Please enter your customer's province name", "Sindh");
        customerCity = prompt("Please enter your customer's city name", "Karachi");
        customerArea = prompt("Please enter your customer's area name", "Karachi Township");
        customerFormattedAddress = prompt("Please enter your customer's formatted address", "Plot B 450, Sector 11-A Sector 11 A North Karachi Twp, Karachi, Karachi City, Sindh, Pakistan");
        merchantId = prompt("Please enter your merchant id", "1421");
        storeSlug = prompt("Please enter your store slug", "ST-005722384");


        try {
            responseListener();
            setTransactionParameters();
        } catch (error) {
            console.log("error found in setTransactionParameters", error);
        }
    }

    function clearAlerts(elem) {
        if (elem) {
            elem.innerHTML = "";
        }
        const parentContainer = document.getElementById("alertContainer");
        if (parentContainer.classList.contains("show")) {
            parentContainer.classList.remove("show");
        }
    }

    function alertHandler(message, type) {
        if (checkEmptyHtml(".alert", true)) {
            const elem = document.querySelector(`.alert`);
            clearAlerts(elem);
        };

        const parentContainer = document.getElementById("alertContainer");

        const childContainer = document.createElement("div");
        childContainer.className = "alert";

        const alertContainer = '<div class="alert-' + type + '">' +
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

    const setTransactionParameters = () => {
        bSecurePaymentTransactionParameters.__00trid__ = orderId;
        bSecurePaymentTransactionParameters.__01curr__ = currency;
        bSecurePaymentTransactionParameters.__02trdt__ = "6062262";
        bSecurePaymentTransactionParameters.__03stamt__ = subTotalAmount;
        bSecurePaymentTransactionParameters.__04damt__ = discountAmount;
        bSecurePaymentTransactionParameters.__05tamt__ = totolAmount;
        bSecurePaymentTransactionParameters.__06cname__ = customerName;
        bSecurePaymentTransactionParameters.__07ccc__ = customerCountryCode;
        bSecurePaymentTransactionParameters.__08cphn__ = customerPhoneNumber;
        bSecurePaymentTransactionParameters.__09cemail__ = customerEmail;
        bSecurePaymentTransactionParameters.__10ccc__ = customerCountry;
        bSecurePaymentTransactionParameters.__11cstate__ = customerState;
        bSecurePaymentTransactionParameters.__12ccity__ = customerCity;
        bSecurePaymentTransactionParameters.__13carea__ = customerArea;
        bSecurePaymentTransactionParameters.__14cfadd__ = customerFormattedAddress;
        bSecurePaymentTransactionParameters.__15mid__ = merchantId;
        bSecurePaymentTransactionParameters.__16stid__ = storeSlug;
        bSecurePaymentTransactionParameters.__17seh__ = "sfasfafasfasf";
        bSecurePaymentTransactionParameters.__18ver__ = "0.0";
        bSecurePaymentTransactionParameters.__20red__ = redirect_url;
        try {
            initializeEventListener();
        } catch (error) {
            console.log("error found in initializeEventListener", error);
        }
    };

    const initializeEventListener = () => {
        try {
            document.head.insertAdjacentHTML("beforeend", `<style id="antiClickjack" type="text/css"></style>`);
            bSecureApp.initialize("bSecurePaymentPluginContainer");
        } catch (error) {
            console.log("error found in initialize", error);
        }
    };


    const responseListener = () => {
        bSecurePaymentPluginResponseHandler.onErrorAlert = function(data) {
            console.log("responseListener : onErrorAlert: ", data)
            const responseMsg = data.message;
            const responseType = data.type;
            alertHandler(responseMsg, "error")
        };
        bSecurePaymentPluginResponseHandler.onSuccessAlert = function(data) {
            console.log("responseListener : onSuccessAlert: ", data)
            const responseMsg = data.message;
            const responseType = data.type;
            alertHandler(responseMsg, "success")
        };
        bSecurePaymentPluginResponseHandler.onValidationErrorAlert = function(data) {
            console.log("responseListener : onValidationErrorAlert: ", data)
            const responseMsg = data.message;
            const responseType = data.type;
            alertHandler(responseMsg, "warning")
        };
        bSecurePaymentPluginResponseHandler.onProcessPaymentFailure = function(data) {
            alert('Payment Processed Failure')
            localStorage.setItem("payment_response", JSON.stringify(data));
            console.log(data);
            document.location.href='/'
        };
        bSecurePaymentPluginResponseHandler.onProcessPaymentSuccess = function(data) {
            alert('Payment Process Success')
            localStorage.setItem("payment_response", JSON.stringify(data));
            console.log(data);
            document.location.href='/'
        };
    };
    
    fetchTransactionDetails();
</script>
<?php endblock() ?>