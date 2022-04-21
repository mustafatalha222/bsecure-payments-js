<?php require_once 'temp.php' ?>
<html>

<head>
    <title>Page Title</title>
    <?php startblock('headerScripts') ?>
    <?php endblock() ?>

    <?php startblock('styles') ?>
    <?php endblock() ?>
</head>

<body>
    
    <div id="alertContainer">
        <div class="alert">
            <div id="payment_response" class="alert-danger"></div>
        </div>
    </div>
    <?php startblock('body') ?>
    <?php endblock() ?>
</body>
<?php include('footer.php'); ?>
<?php startblock('scripts') ?>
<?php endblock() ?>

</html>