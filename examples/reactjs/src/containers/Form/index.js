import {
    AppBar,
    TextField,
    Button,
  } from "@mui/material";
  import React from "react";
  import './form.css'
  import { HISTORY } from '../../util'
  
  const initialFormData={
      name: "Default user",
      country_code: "92",
      phone: "3333333333",
      email: "test@test.com",
      country: "Pakistan",
      province: "Sindh",
      city: "Karachi",
      area: "Karachi Township",
      address: "Demo street, Sindh, Pakistan",
  
      order_id: "plugin-112",
      currency: "PKR",
      sub_total: "500",
      discount: "50",
      total: "450",

      store_id: "",
      client_id: "",
      merchant_id: "",
      client_env: 1,
  }
  
  export default function Form() {
  
      const [formData, updateFormData] = React.useState(initialFormData);
      const handleChange = (e) => {
          updateFormData({
            ...formData,
            [e.target.name]: e.target.value.trim()
          });
        };
  
      const handleSubmit = (e) => {
          e.preventDefault()
          console.log(formData);
          HISTORY.push("/extend", {formData})
      };
  
    return (
      <div className="Form">
        <AppBar>
            <h3>bSecure Payment Plugin</h3>
        </AppBar>
        <form onSubmit={handleSubmit}  style={{  marginTop: 80, marginBottom:20 }}>
          <div className="heading">Customer Detail</div>
         <div className="customer-info">
              <TextField onChange={handleChange} required defaultValue={formData?.name}  label="Name" name="name" variant="outlined"/>
              <TextField onChange={handleChange} required defaultValue={formData?.country_code}  label="Country Code" name="country_code"  variant="outlined"/>
              <TextField onChange={handleChange} required defaultValue={formData?.phone}  label="Phone" name="phone" variant="outlined"/>
              <TextField onChange={handleChange} required defaultValue={formData?.email}  label="Email" name="email" variant="outlined"/>
              <TextField onChange={handleChange} required defaultValue={formData?.country}  label="Country" name="country" variant="outlined"/>
              <TextField onChange={handleChange} required defaultValue={formData?.country}  label="Province" name="province" variant="outlined"/>
              <TextField onChange={handleChange} required defaultValue={formData?.city}  label="City" name="city" variant="outlined"/>
              <TextField onChange={handleChange} required defaultValue={formData?.area}  label="Area" name="area" variant="outlined"/>
              <TextField onChange={handleChange} required defaultValue={formData?.address}  label="Address" name="address" variant="outlined"/>
          </div>
         <br/>
         <div className="heading">Order Detail</div>
          <div className="order-info">
              <TextField onChange={handleChange} required defaultValue={formData?.order_id} label="Ordre id" name="order_id" variant="outlined"/>
              <TextField onChange={handleChange} required defaultValue={formData?.currency} label="Currency" name="currency"  variant="outlined"/>
              <TextField onChange={handleChange} required defaultValue={formData?.sub_total} label="Subtotal amount" name="sub_total" variant="outlined"/>
              <TextField onChange={handleChange} required defaultValue={formData?.discount} label="Discount" name="discount" variant="outlined"/>
              <TextField onChange={handleChange} required defaultValue={formData?.total} label="Total amount" name="total" variant="outlined"/>
          </div>
          <br />
          <div className="heading">Merchant Detail</div>
          <div className="order-info">
              <TextField onChange={handleChange} required defaultValue={formData?.merchant_id} label="Merchant ID" name="merchant_id" variant="outlined"/>
              <TextField onChange={handleChange} required defaultValue={formData?.store_id} label="Store ID" name="store_id"  variant="outlined"/>
              <TextField onChange={handleChange} required defaultValue={formData?.client_id} label="Client ID" name="client_id" variant="outlined"/>
              <TextField onChange={handleChange} required defaultValue={formData?.client_env} label="Client Environment" name="client_env" variant="outlined" tupe="number" />
          </div>
  
          <Button type="submit" variant="contained" color="primary">
            Pay via bsecure
          </Button>
        </form>
      </div>
    );
  }
  