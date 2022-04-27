const moveBack = () =>{
    window.location.href = window.location.origin + window.location.pathname.split("extend")[0]
}

function goBackPrompt(text) {
    if (confirm(text) == true) {
        document.getElementById("bSecurePaymentPluginContainer")?.remove();
        moveBack()
    }
}

function callForPlugin(){
    const urlSearchParams = new URLSearchParams(window.location.search);
    const params = Object.fromEntries(urlSearchParams.entries());

    if(Object.keys(params).length === 0){
        goBackPrompt("Please fill form details")
    }
    // console.log(params, "<--passed values")

    bSecurePaymentPluginResponseHandler.onErrorAlert = function(data) {
        new Notyf({ duration: 5000}).error(data.message[0]);
        console.log("onError: ", data)
   };
   bSecurePaymentPluginResponseHandler.onSuccessAlert = function(data) {
        new Notyf({ duration: 5000}).success(data.message[0]);
        console.log("onSuccess: ", data)
   };
   bSecurePaymentPluginResponseHandler.onValidationErrorAlert = function(data) {
        new Notyf({ duration: 5000}).error(data.message[0]);
        console.log("onValidationError: ", data)
   };
   bSecurePaymentPluginResponseHandler.onProcessPaymentSuccess = function(data) {
        console.log("onProcessPaymentSuccess: ", data)
        setTimeout(() => { goBackPrompt("Order completed move back to home page") }, 4000);
   };
   bSecurePaymentPluginResponseHandler.onProcessPaymentFailure = function(data) {
        new Notyf({ duration: 5000}).error(data.message[0]);
        setTimeout(() => { goBackPrompt("Payment failure move back to home page") }, 1000);
        console.log("onProcessPaymentFailure: ", data)
   };
   
   //Set params values in bSecurePaymentTransactionParameters
    delete bSecurePaymentTransactionParameters.__17seh__ ;
    delete bSecurePaymentTransactionParameters['__17seh__'];

    bSecurePaymentTransactionParameters.__00trid__ = params.order_id;
    bSecurePaymentTransactionParameters.__01curr__ = params.currency;
    bSecurePaymentTransactionParameters.__02trdt__ = Date.now().toString();
    bSecurePaymentTransactionParameters.__03stamt__ = params.sub_total;
    bSecurePaymentTransactionParameters.__04damt__ = params.discount;
    bSecurePaymentTransactionParameters.__05tamt__ = params.total;
    bSecurePaymentTransactionParameters.__06cname__ = params.name;
    bSecurePaymentTransactionParameters.__07ccc__ = params.country_code;
    bSecurePaymentTransactionParameters.__08cphn__ = params.phone;
    bSecurePaymentTransactionParameters.__09cemail__ = params.email;
    bSecurePaymentTransactionParameters.__10ccc__ = params.country;
    bSecurePaymentTransactionParameters.__11cstate__ = params.province;
    bSecurePaymentTransactionParameters.__12ccity__ = params.city;
    bSecurePaymentTransactionParameters.__13carea__ = params.area;
    bSecurePaymentTransactionParameters.__14cfadd__ = params.address;
    bSecurePaymentTransactionParameters.__15mid__ = params.merchant_id;
    bSecurePaymentTransactionParameters.__16stid__ = params.store_id;
    bSecurePaymentTransactionParameters.__18ver__ = "1.1";
    bSecurePaymentTransactionParameters.__20red__ = "http://host name";
    bSecurePaymentTransactionParameters.__21cenv__ = 2;
    
   
    const salt = params.client_id
    let _signature = salt+"&";
    Object.keys(bSecurePaymentTransactionParameters)
    .sort()
    .forEach(function(v, idx, array) {
        let _val = bSecurePaymentTransactionParameters[v].toString().replace(/\s/g, '');
         _signature +=  _val.concat(idx === array.length - 1 ? "" : "&")
    });
    let _hash =  CryptoJS.HmacSHA256(_signature,salt).toString() ; 
    bSecurePaymentTransactionParameters.__17seh__ = _hash.toUpperCase();
    try {
        bSecureApp.initialize("bSecurePaymentPluginContainer");
    } catch (error) {
        console.info("error found in setTransactionParameters error: ", error);
    }
}