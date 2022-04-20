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
    div.elem-group {
        margin-top: 10px;
        display: flex;
    }

    label {
    display: block;
    font-family: 'Aleo';
    padding-bottom: 4px;
    font-size: 1.25em;
    margin-right: 20px;
    }

    input, select, textarea {
    border-radius: 2px;
    border: 1px solid #ccc;
    box-sizing: border-box;
    font-size: 1.25em;
    font-family: 'Aleo';
    width: 500px;
    }

    textarea {
    height: 250px;
    }

    button {
    height: 50px;
    background: green;
    color: white;
    border: 2px solid darkgreen;
    font-size: 1.25em;
    font-family: 'Aleo';
    border-radius: 4px;
    cursor: pointer;
    }

    button:hover {
    border: 2px solid black;
    }
</style>
<?php endblock() ?>

<?php startblock('body') ?>
<form action="payment-plugin" method="get">
  <div class="elem-group">
    <label for="name">Customer Name</label>
    <input type="text" id="name" name="customer_name" value="Default User" placeholder="Please enter your customer's name" required>
  </div>
  <div class="elem-group">
    <label for="name">Customer country code</label>
    <input type="number" id="country_code" name="customer_country_code" value="92" placeholder="Please enter your customer's country code" required>
  </div>
  <div class="elem-group">
    <label for="name">Customer phone number</label>
    <input type="text" id="phone_number" name="customer_phone_number" value="3452099688" placeholder="Please enter your customer's phone number" required>
  </div>
  <div class="elem-group">
    <label for="name">Customer email</label>
    <input type="email" id="email" name="customer_email" value="test1@nextgeni.net" placeholder="Please enter your customer's email" required>
  </div>
  <div class="elem-group">
    <label for="name">Customer country name</label>
    <input type="text" id="country" name="country_name" value="Pakistan" placeholder="Please enter your customer's country name" required>
  </div>
  <div class="elem-group">
    <label for="name">Customer province name</label>
    <input type="text" id="province" name="province_name" value="Sindh" placeholder="Please enter your customer's province name" required>
  </div>
  <div class="elem-group">
    <label for="name">Customer city name</label>
    <input type="text" id="city" name="city_name" value="Karachi" placeholder="Please enter your customer's city name" required>
  </div>
  <div class="elem-group">
    <label for="name">Customer area name</label>
    <input type="text" id="area" name="area_name" value="Karachi Township" placeholder="Please enter your customer's area name" required>
  </div>
  <div class="elem-group">
    <label for="name">Customer formatted address</label>
    <textarea id="formatted_address" name="formatted_address" rows="2" cols="2">
    Plot B 450, Sector 11-A Sector 11 A North Karachi Twp, Karachi, Karachi City, Sindh, Pakistan
    </textarea>
  </div>
  <hr/>
  <div class="elem-group">
    <label for="name">Order Id</label>
    <input type="text" id="orderId" name="order_id" value="xtend-001" placeholder="Please enter order id" required>
  </div>
  <div class="elem-group">
    <label for="name">Currency</label>
    <input type="text" id="currency" name="currency" value="Pakistan" placeholder="Please enter currency" required>
  </div>
  <div class="elem-group">
    <label for="name">Subtotal amount</label>
    <input type="number" id="subtotal_amount" name="subtotal_amount" value="500" placeholder="Please enter subtotal amount" required>
  </div>
  <div class="elem-group">
    <label for="name">Discount amount</label>
    <input type="number" id="discount_amount" name="discount_amount" value="50" placeholder="Please enter discount amount" required>
  </div>
  <div class="elem-group">
    <label for="name">Total amount</label>
    <input type="number" id="total_amount" name="total_amount" value="450" placeholder="Please enter total amount" required>
  </div>
<button type="submit" class="btn-primary">Pay via bSecure</button>
</form>
<div id="paymentResult"></div>
<?php endblock() ?>


<?php startblock('scripts') ?>
<script>
    if(sessionStorage.getItem("payment_response")){
        document.getElementById('payment_response').innerHTML = sessionStorage.getItem("payment_response");
    }
</script>
<?php endblock() ?>