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
    

    /* new css */
    * {
	margin: 0;
	padding: 0;
	box-sizing: border-box;
   }
   
   body {
	   font-family: 'Raleway', sans-serif;
   }
   
   .container {
	width: 100%;
	margin-top: 30px;
   }
   
   .form {
	position: relative;
	top: 0;
	right: 0;
	width: 100%;
	height: auto;
	background: #fff;
   }
   
   .form-section {
	width: 80%;
	max-width: 700px;
	margin: auto;
   }
   
   .group {
	margin-bottom: 10px;
	flex: 1 0 40%;
   }

   .control {
	width: 100%;
	padding: 5px;
	border-top: 0;
	border-left: 0;
	border-right: 0;
	border-bottom: 1px solid silver;
	border-radius: 0;
	transition: all 2s;
   }
   
   .control:focus {
	outline: none;
	border-bottom-color: blue;
   }
   
   .btn {
	display: block;
	width: 100%;
	padding: 13px;
	border-radius: 30px;
	background-image: linear-gradient(to right, #08CCFD, #0379FD);
	color: #fff;
	border:0;
	font-size: 18px;
	font-weight: 200;
   }
   
   .m20 {
	margin-top: 20px;
   }
   
   .link {
	text-decoration: none;
	color: silver;
	font-weight: 300;
   }
   
   .heading {
	font-size: 25px;
	letter-spacing: 2px;
	font-weight: 200;
   
   }
   
.d-flex{
	display: flex;
	gap:10px;
	flex-wrap: wrap;
  }

  label{
    font-size: small;
  }
  .heading2{
    font-size: 17px;
    letter-spacing: 1px;

    }

  @media only screen and (max-width: 600px){
    .d-flex{
      display: block;
    }
    .group{
      width: 100%;
    }
  }
</style>
<?php endblock() ?>

<?php startblock('body') ?>
<form action="payment-plugin" method="get">
<div class="form-section">
    <div class="group">
        <h3 class="heading">bSecure Payment Plugin</h3>
       </div>
       <form id="form" method="GET" action="extend.html">
        <p class="heading2">Customer Detail :</p>
        <br />
        <div class="d-flex">
            <div class="group">
                <label>Name</label>
                <input required="true" value="Default User" name="name" class="control" placeholder="Please enter name">
            </div>
            <div class="group">
                <label>Country Code</label>
                <input required="true" value="92" name="country_code" class="control" placeholder="Please enter country code">
            </div>
            <div class="group">
                <label>Phone</label>
                <input required="true" value="3452099688" name="phone" class="control" placeholder="Please enter phone">
            </div>
            <div class="group">
                <label>Email</label>
                <input required="true" value="test1@nextgeni.net" name="email" class="control" placeholder="Please enter email">
            </div>
            <div class="group">
                <label>Country</label>
                <input required="true" value="Pakistan" name="country" class="control" placeholder="Please enter country">
            </div>
            <div class="group">
                <label>Province</label>
                <input required="true" value="Sindth" name="province" class="control" placeholder="Please enter province">
            </div>
            <div class="group">
                <label>City</label>
                <input required="true" value="Sindth" name="city" class="control" placeholder="Please enter city">
            </div>
            <div class="group">
                <label>Area</label>
                <input required="true" value="Karachi Township" name="area" class="control" placeholder="Please enter area">
            </div>
            <div class="group">
                <label>Address</label>
                <input required="true" value="    Plot B 450, Sector 11-A Sector 11 A North Karachi Twp, Karachi, Karachi City, Sindh, Pakistan" name="address" class="control" placeholder="Please enter address">
            </div>
        </div>

        <br />
        <p class="heading2">Order Detail :</p>
        <br />
        <div class="d-flex">
            <div class="group">
                <label>Order id</label>
                <input required="true" value="xtend-123" name="order_id" class="control" placeholder="Please enter order id">
            </div>
            <div class="group">
                <label>Currency</label>
                <input required="true" value="PKR" name="currency" class="control" placeholder="Please enter currency">
            </div>
            <div class="group">
                <label>Subtotal</label>
                <input required="true" value="500" name="sub_total" class="control" placeholder="Please enter subtotal amount">
            </div>
            <div class="group">
                <label>Discount</label>
                <input required="true" value="50" name="discount" class="control" placeholder="Please enter discount">
            </div>
            <div class="group">
                <label>Total amount</label>
                <input required="true" value="450" name="total" class="control" placeholder="Please enter total amount">
            </div>
        </div>

        <br />
        <p class="heading2">Merchant Detail :</p>
        <br />
        <div class="d-flex">
            <div class="group">
                <label>Merchant ID</label>
                <input required="true" value="" name="merchant_id" class="control" placeholder="Please enter merchant id">
            </div>
            <div class="group">
                <label>Store ID</label>
                <input required="true" value="" name="store_id" class="control" placeholder="Please enter store id">
            </div>
            <div class="group">
                <label>Client ID</label>
                <input required="true" value="" name="client_id" class="control" placeholder="Please enter client id">
            </div>
           
        </div>
     <div class="group m20">
      <input type="submit" class="btn" value="Pay via bSecure &rarr;">
     </div>
    </form>
<?php endblock() ?>