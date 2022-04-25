import { useEffect } from 'react'
import {
    bSecurePayments,
    TransactionParameters,
    bSecurePaymentsHandler,
} from "bsecure-payments-js"

function App() {
  useEffect(() => {
    LOCAL_STORAGE_SERVICE._clearLocalStorage();
    responseListener();
    try {
      setTransactionParameters();
    } catch (error) {
      console.info("error found in setTransactionParameters", error);
    }
  }, []);

  const responseListener = () => {
    bSecurePaymentsHandler.initialize();
    bSecurePaymentsHandler.onErrorAlert = function (msg) {
      alert("onErrorAlert")
      console.log("onErrorAlert: ", msg) 
      return msg;
    }
    bSecurePaymentsHandler.onSuccessAlert = function (msg) {
      alert("onSuccessAlert")
      console.log("onSuccessAlert: ", msg)
      return msg;
    }
    bSecurePaymentsHandler.onValidationErrorAlert = function (msg) {
      alert("onValidationErrorAlert")
      console.log("onValidationErrorAlert: ", msg)
      return msg;
    }
    bSecurePaymentsHandler.onProcessPaymentSuccess = function (msg) {
      alert("onProcessPaymentSuccess")
      console.log("onProcessPaymentSuccess: ", msg)
      return msg;
    }
    bSecurePaymentsHandler.onProcessPaymentFailure = function (msg) {
      alert("onProcessPaymentFailure")
      console.log("onProcessPaymentFailure: ", msg)
      return msg;
    }
  };



  const setTransactionParameters = () => {
    delete TransactionParameters.__17seh__;

    TransactionParameters.__00trid__ = "xtend-001";
    TransactionParameters.__01curr__ = "PKR";
    TransactionParameters.__02trdt__ = "6062262";
    TransactionParameters.__03stamt__ = 500;
    TransactionParameters.__04damt__ = 50;
    TransactionParameters.__05tamt__ = 1000;
    TransactionParameters.__06cname__ = "Default User";
    TransactionParameters.__07ccc__ = "92";
    TransactionParameters.__08cphn__ = "3482127668";
    TransactionParameters.__09cemail__ = "test1@nextgeni.net";
    TransactionParameters.__10ccc__ = "Pakistan";
    TransactionParameters.__11cstate__ = "Sindh";
    TransactionParameters.__12ccity__ = "Karachi";
    TransactionParameters.__13carea__ = "Karachi Township";
    TransactionParameters.__14cfadd__ = "Plot B 450, Sector 11-A Sector 11 A North Karachi Twp, Karachi, Karachi City, Sindh, Pakistan";
    TransactionParameters.__15mid__ = "1421";
    TransactionParameters.__16stid__ = "ST-005722384";
    TransactionParameters.__18ver__ = "1.1";
    TransactionParameters.__20red__ = window.location.href;
    TransactionParameters.__21cenv__ = 2;
    const salt = process.env.REACT_APP_CLIENT_ID;
    let _signature = salt + "&";
    Object.keys(TransactionParameters)
      .sort()
      .forEach(function (v, idx, array) {
        let _val = TransactionParameters[v].toString().replace(/\s/g, '');
        _signature += _val.concat(idx === array.length - 1 ? "" : "&")
      });
    let _hash = CryptoJS.HmacSHA256(_signature, salt).toString();
    TransactionParameters.__17seh__ = _hash.toUpperCase();

    try {
      bSecurePayments.initialize("bSecurePaymentPluginContainer");
    } catch (error) {


      return (
        <></>
      )
    }
  }
}
export default App
