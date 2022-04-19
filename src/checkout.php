<?php include 'wrapper/template.php' ?>

<?php startblock('styles') ?>
<style>
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

<?php startblock('body') ?>
<button type="button" onClick="document.location.href='payment-plugin'" class="btn-primary">Pay via bSecure</button>
<div id="paymentResult"></div>
<?php endblock() ?>


<?php startblock('scripts') ?>
<script>
    if(sessionStorage.getItem("payment_response")){
        document.getElementById('payment_response').innerHTML = sessionStorage.getItem("payment_response");
    }
</script>
<?php endblock() ?>