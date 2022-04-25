
<?php
    $details = [
        //Because some payment gateways require amount to be multiplied by 100
        '__00trid__' => $_GET['order_id'],
        '__01curr__' => $_GET['currency'],
        '__02trdt__' => "6062262",
        '__03stamt__' => $_GET['subtotal_amount'],
        '__04damt__' => $_GET['discount_amount'],
        '__05tamt__' => $_GET['total_amount'],
        '__06cname__' => $_GET['customer_name'],
        '__07ccc__' => $_GET['customer_country_code'],
        '__08cphn__' => $_GET['customer_phone_number'],
        '__09cemail__' => $_GET['customer_email'],
        '__10ccc__' => $_GET['country_name'],
        '__11cstate__' => $_GET['province_name'],
        '__12ccity__' => $_GET['city_name'],
        '__13carea__' => $_GET['area_name'],
        '__14cfadd__' => $_GET['formatted_address'],
        '__15mid__' => $_ENV['MERCHANT_ID'],
        '__16stid__' => $_ENV['STORE_ID'],
        '__18ver__' => $_ENV['PLUGIN_VERSION'],
        '__19lan__' => "EN",
        '__20red__' => $_SERVER['SERVER_NAME'],
        '__21cenv__' => $_ENV['CLIENT_ENV'],
    ];
    $salt = $_ENV['CLIENT_ID'];
    ksort($details);
    $signature = $salt."&";
    foreach($details as $key => $value)
    {
        $signature .= preg_replace("/\s+/", "", $value);
        if(next($details)) {
            $signature .= "&";
        }
    }
    $setSignature = hash_hmac('sha256', $signature, $salt);
    $details['__17seh__'] = strtoupper($setSignature);
?>

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
        margin: 14px auto 20px auto;
    }

    #alertContainer {
        top: 0;
        margin-bottom: 5px;
        -o-object-fit: scale-down;
        object-fit: scale-down;
        height: 50px;
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
    .btn-primary {
        background-color: #1976d2 !important;
        border-color: #1976d2 !important;
        text-transform: none !important;
        background: #1976d2 !important;
        color: #ffffff !important;
        border: solid 1px #1976d2 !important;
        font-size: 0.9rem !important;
        font-family: "SF Pro Text";
        font-weight: normal !important;
        min-width: 7rem !important;
        height: 2.7rem !important;
    }
</style>
<?php endblock() ?>

<?php startblock('headerScripts') ?>
<script src="../paymentPlugin.js"></script>
<!-- <script src="<?php echo $_ENV['PLUGIN_SCRIPT'] ?>"></script>  -->
<?php endblock() ?>



<?php startblock('body') ?>
<button type="button" onClick="location.href='/'" class="btn-primary">back</button>
<div id="bSecurePaymentPluginContainer"></div>
<?php endblock() ?>

<?php startblock('scripts') ?>
<script>
            window.onbeforeunload = function(e) {
                return "Are you sure you want to leave?";
            };
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

    const initializeEventListener = () => {
        responseListener();

        const details = <?php echo  json_encode($details); ?>;

        bSecurePaymentTransactionParameters.__00trid__ = details.__00trid__;
        bSecurePaymentTransactionParameters.__01curr__ = details.__01curr__;
        bSecurePaymentTransactionParameters.__02trdt__ = details.__02trdt__;
        bSecurePaymentTransactionParameters.__03stamt__ = details.__03stamt__;
        bSecurePaymentTransactionParameters.__04damt__ = details.__04damt__;
        bSecurePaymentTransactionParameters.__05tamt__ = details.__05tamt__;
        bSecurePaymentTransactionParameters.__06cname__ = details.__06cname__;
        bSecurePaymentTransactionParameters.__07ccc__ = details.__07ccc__;
        bSecurePaymentTransactionParameters.__08cphn__ = details.__08cphn__;
        bSecurePaymentTransactionParameters.__09cemail__ = details.__09cemail__;
        bSecurePaymentTransactionParameters.__10ccc__ = details.__10ccc__;
        bSecurePaymentTransactionParameters.__11cstate__ = details.__11cstate__;
        bSecurePaymentTransactionParameters.__12ccity__ = details.__12ccity__;
        bSecurePaymentTransactionParameters.__13carea__ = details.__13carea__;
        bSecurePaymentTransactionParameters.__14cfadd__ = details.__14cfadd__;
        bSecurePaymentTransactionParameters.__15mid__ = details.__15mid__;
        bSecurePaymentTransactionParameters.__16stid__ = details.__16stid__;
        bSecurePaymentTransactionParameters.__17seh__ = details.__17seh__;
        bSecurePaymentTransactionParameters.__18ver__ = details.__18ver__;
        bSecurePaymentTransactionParameters.__19lan__ = "EN";
        bSecurePaymentTransactionParameters.__20red__ = details.__20red__;
        bSecurePaymentTransactionParameters.__21cenv__ = details.__21cenv__;
        
        try {
            document.head.insertAdjacentHTML("beforeend", `<style id="antiClickjack" type="text/css"></style>`);
            bSecureApp.initialize("bSecurePaymentPluginContainer");
        } catch (error) {
            console.log("error found in initializeEventListener", error);
        }
    };


    const responseListener = () => {
        bSecurePaymentPluginResponseHandler.onErrorAlert = function(data) {
            console.log("responseListener : onErrorAlert: ", data)
            const responseMsg = data.message;
            const responseType = data.type;
            alertHandler(responseMsg, "danger")
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
            window.location = "/"
            console.log("responseListener : onProcessPaymentFailure: ", data)
            alertHandler(JSON.stringify(data), "danger")
        };
        bSecurePaymentPluginResponseHandler.onProcessPaymentSuccess = function(data) {
            window.location = "/"
            console.log("responseListener : onProcessPaymentSuccess: ", data)
            alertHandler(JSON.stringify(data), "success")
        };
    };
    
    initializeEventListener();
</script>
<?php endblock() ?>