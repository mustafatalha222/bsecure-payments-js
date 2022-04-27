// @flow
import React, { useEffect } from "react";
import CryptoJS from 'crypto-js'
import {
    bSecurePayments,
    TransactionParameters,
    bSecurePaymentsHandler,
} from "bsecure-payments-js"
import {HISTORY} from '../../util'
import './payment.css'
import { useToasts } from 'react-toast-notifications'


function Payment(props) {
    const { addToast } = useToasts();
    const {name, country_code,phone, email, country, province, city, area, address,
            order_id, currency, sub_total, total, discount,
            client_id, merchant_id, store_id, client_env} = props.history.location.state?.formData || {}
    useEffect(() => {
        if(!props.history.location.state?.formData){
            HISTORY.replace("/")
        }

        responseListener();
        try {
            setTransactionParameters();
        } catch (error) {
            console.info("error found in setTransactionParameters", error);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const resetFrame = () => {
        document.getElementById("bSecurePaymentPluginContainer").remove();
        window.location.href= "http://" + window.location.host 
    }

    const responseListener = () => {
        bSecurePaymentsHandler.initialize();
        bSecurePaymentsHandler.onErrorAlert = function (msg) {
            addToast(msg?.message, { appearance: 'error' });
            return msg;
        }
        bSecurePaymentsHandler.onSuccessAlert = function (msg) {
            addToast(msg?.message, { appearance: 'success' });
            return msg;
        }
        bSecurePaymentsHandler.onValidationErrorAlert = function (msg) {
            addToast(msg?.message, { appearance: 'error' });
            HISTORY.replace("/")
            return msg;
        }
        bSecurePaymentsHandler.onProcessPaymentSuccess = function (msg) {
            setTimeout(() => {
                resetFrame()
            }, 6000);
           
            return msg;
        }
        bSecurePaymentsHandler.onProcessPaymentFailure = function (msg) {
            addToast(msg?.message, { appearance: 'error' });
            HISTORY.replace("/")
            return msg;
        }
    };

    const setTransactionParameters = () => {
        delete TransactionParameters.__17seh__ ;
        TransactionParameters.__00trid__ = order_id;
        TransactionParameters.__01curr__ = currency;
        TransactionParameters.__02trdt__ = Date.now().toString();
        TransactionParameters.__03stamt__ = sub_total;
        TransactionParameters.__04damt__ = discount;
        TransactionParameters.__05tamt__ = total;
        TransactionParameters.__06cname__ = name;
        TransactionParameters.__07ccc__ =  country_code;
        TransactionParameters.__08cphn__ = phone;
        TransactionParameters.__09cemail__ = email;
        TransactionParameters.__10ccc__ = country;
        TransactionParameters.__11cstate__ = province;
        TransactionParameters.__12ccity__ = city;
        TransactionParameters.__13carea__ = area;
        TransactionParameters.__14cfadd__ = address;
        TransactionParameters.__15mid__ = merchant_id ;
        TransactionParameters.__16stid__ = store_id;
        TransactionParameters.__18ver__ = "1.1";
        TransactionParameters.__20red__ = window.location.href;
        TransactionParameters.__21cenv__ = client_env;
        const salt = client_id
        let _signature = salt+"&";
        Object.keys(TransactionParameters)
        .sort()
        .forEach(function(v, idx, array) {
            let _val = TransactionParameters[v].toString().replace(/\s/g, '');
             _signature +=  _val.concat(idx === array.length - 1 ? "" : "&")
        });
        let _hash =  CryptoJS.HmacSHA256(_signature,salt).toString() ; 
       TransactionParameters.__17seh__ = _hash.toUpperCase();
        try {
          bSecurePayments.initialize("bSecurePaymentPluginContainer");
        } catch (error) {
            console.info("error found in setTransactionParameters error: ", error);
        }
    };

    return (
        <>
         <div id="bSecurePaymentPluginContainer"></div>
        </>
    );
}


export default Payment;
