import {
    AppBar,
    TextField,
    Stepper,
    StepLabel,
    Step,
    Box,
    Radio,
    FormControlLabel,
    RadioGroup,
    FormControl,
  } from "@mui/material";
  import React, { useState } from "react";
  import './form.css'
import Extend from "../Extend";
  
  const PRODUCTS = [
    {
      image: "https://via.placeholder.com/200x150",
      name: "PRODUCT 1",
      description: "Product SKU: 12345",
      price: 5,
      quantity: 2,
      discount: 0,
    },
    {
      image: "https://via.placeholder.com/200x150",
      name: "PRODUCT 2",
      description: "Product SKU: 23476",
      price: 9,
      quantity: 1,
      discount: 0,
    }
  ];
  const steps = [
    'Order Details',
    'Customer Details',
    'Summary',
  ];

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
  
      order_id: "plugin-",
      currency: "PKR",
      discount: "2",

      store_id: "",
      client_id: "",
      merchant_id: "",
      client_env: 1,

      show_alert: 1,
      theme: "inline"
  }
  
  export default function Form() {
    const CLONE_PRODUCTS = JSON.parse(JSON.stringify(PRODUCTS));
    const [products, setProducts] = React.useState(CLONE_PRODUCTS);
      const [formData, updateFormData] = React.useState(initialFormData);
      const [step, setstep] = useState(0)
      let summaryStep = step === 2

      const handleChange = (e) => {
          updateFormData({
            ...formData,
            [e.target.name]: e.target.value.trim()
          });
        };
  
      const handleSubmit = (e) => {
          e.preventDefault()
          setstep(2)
          // HISTORY.push("/extend", {formData})
      };
      

      function Summary(discount) {
        const total = subTotal - discount ;
        return (
          <>
          <div className="promotion">
              <label htmlFor="promo-code">Discount:</label>
              {/* <TextField onChange={handleChange} required defaultValue={formData?.discount} label="Discount" name="discount" variant="outlined"/> */}
              <input type="text" disabled={summaryStep} name="discount" required onChange={handleChange}  defaultValue={formData?.discount}/>
            </div>

            <div className="summary">
              <ul>
                <li>
                  Subtotal <span>{subTotal}</span>
                </li>
                {discount > 0 && (
                  <li>
                    Discount <span>{discount}</span>
                  </li>
                )}
                <li className="total">
                  Total <span>{total}</span>
                </li>
              </ul>
              {!summaryStep &&
                <div className="checkout">
                  <button type="submit">Next</button>
                </div>
              }
            </div>
          </>
        );
      }

      function ProductList(products) {
       
        return (
          <>
            <ul className="products">
              {products.map((product, index) => {
                return (
                  <li className="row" key={index}>
                    <div className="col left">
                      <div className="thumbnail">
                          <img src={product.image} alt={product.name} />
                      </div>
                      <div className="detail">
                        <div className="name">
                         {product.name}
                        </div>
                        <div className="price">PKR {product.price}</div>
                        <div className="description">{product.description}</div>
                      </div>
                    </div>
      
                    <div className="col right">
                      
                      <div className="quantity">
                        <input
                        disabled={summaryStep}
                        required
                          type="text"
                          className="quantity"
                          step="1"
                          value={product.quantity}
                          onChange={(event) => onChangeProductQuantity(index, event)}
                        />
                      </div>
                      {!summaryStep &&
                        <div className="remove">
                          <svg
                            onClick={() => onRemoveProduct(index)}
                            version="1.1"
                            className="close"
                            x="0px"
                            y="0px"
                            viewBox="0 0 60 60"
                            enableBackground="new 0 0 60 60"
                          >
                            <polygon points="38.936,23.561 36.814,21.439 30.562,27.691 24.311,21.439 22.189,23.561 28.441,29.812 22.189,36.064 24.311,38.186 30.562,31.934 36.814,38.186 38.936,36.064 32.684,29.812" />
                          </svg>
                        </div>
                      }
                    </div>
                  </li>
                );
              })}
            </ul>
          </>
        );
      }

      const onChangeProductQuantity = (index, event) => {
        const value = event.target.value;
        const valueInt = parseInt(value);
        const cloneProducts = [...products];
    
        // Minimum quantity is 1, maximum quantity is 100, can left blank to input easily
        if (value === "") {
          cloneProducts[index].quantity = value;
        } else if (valueInt > 0 && valueInt < 100) {
          cloneProducts[index].quantity = valueInt;
        }
        setProducts(cloneProducts);
      };
    
      const onRemoveProduct = (i) => {
        const filteredProduct = products.filter((product, index) => {
          return index != i;
        });
        setProducts(filteredProduct);
      };

      const subTotal = products.reduce((total, product) => {
        return total + product.price * +product.quantity;
      }, 0);

      const handleNext=(e)=>{
        e.preventDefault()
        setstep(1)
        updateFormData({
          ...formData,
          sub_total: subTotal,
         total: subTotal - formData.discount
        });
      }

    return (
      <div className="Form">
        <AppBar>
            <h3>bSecure Embedded Journey</h3>
        </AppBar>

        <Box sx={{ width: '100%', marginTop: 9 }}>
            <Stepper activeStep={step} alternativeLabel>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
        </Box>

        {summaryStep &&
          <>
              <Extend formData={formData}/>
          </>
        }
        
        {(step === 0 || summaryStep) &&
              <form onSubmit={handleNext}  style={{  marginTop: summaryStep ? 0 : 40, marginBottom:20 }}>
                <section className="container">
                  {step === 0 &&
                    <div className="order-info" style={{marginBottom:25}}>
                        <TextField onChange={handleChange} required defaultValue={formData?.order_id} label="Order id" name="order_id" variant="outlined"/>
                        <TextField onChange={handleChange} required defaultValue={formData?.currency} label="Currency" name="currency"  variant="outlined"/>
                    </div>
                  }

                {products.length > 0 ? (
                  <div>
                    {ProductList(products)}
          
                    {Summary(formData.discount)}
                  </div>
                ) : (
                  <div className="empty-product">
                    <h3>There are no products in your cart.</h3>
                  </div>
                )}
              </section>
            </form>
          }

        
          {step === 1 &&
          <form onSubmit={handleSubmit}  style={{  marginTop: 40, marginBottom:20 }}>
            <section className="container">
              <div className="heading">Personal Detail</div>
              <div className="customer-info">
                  <TextField onChange={handleChange} required defaultValue={formData?.name}  label="Name" name="name" variant="outlined"/>
                  <TextField onChange={handleChange} required defaultValue={formData?.email}  label="Email" name="email" variant="outlined"/>

                  <TextField onChange={handleChange} required defaultValue={formData?.country_code}  label="Country Code" name="country_code"  variant="outlined"/>
                  <TextField onChange={handleChange} required defaultValue={formData?.phone}  label="Phone" name="phone" variant="outlined"/>
                  
                  <TextField onChange={handleChange} required defaultValue={formData?.country}  label="Country" name="country" variant="outlined"/>
                  <TextField onChange={handleChange} required defaultValue={formData?.country}  label="Province" name="province" variant="outlined"/>
                  <TextField onChange={handleChange} required defaultValue={formData?.city}  label="City" name="city" variant="outlined"/>
                  <TextField onChange={handleChange} required defaultValue={formData?.area}  label="Area" name="area" variant="outlined"/>
                  <TextField onChange={handleChange} required defaultValue={formData?.address}  label="Address" name="address" variant="outlined"/>
              </div>
            
              <br />
              <div className="heading">Merchant Detail</div>
              <div className="order-info">
                  <TextField onChange={handleChange} required defaultValue={formData?.merchant_id} label="Merchant ID" name="merchant_id" variant="outlined"/>
                  <TextField onChange={handleChange} required defaultValue={formData?.store_id} label="Store ID" name="store_id"  variant="outlined"/>
                  <TextField onChange={handleChange} required defaultValue={formData?.client_id} label="Client ID" name="client_id" variant="outlined"/>
                  {/* <TextField onChange={handleChange} required defaultValue={formData?.client_env} label="Client Environment" name="client_env" variant="outlined" tupe="number" /> */}
              </div>

              <div className="radio-boxes">
                <FormControl>
                  <p className="text">Client Environment:</p>
                  <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="client_env"
                    value={formData?.client_env}
                    onChange={handleChange}
                  >
                    <FormControlLabel value={1} size="small" control={<Radio />} label="Live" />
                    <FormControlLabel value={2} size="small" control={<Radio />} label="Sandbox" />
                  </RadioGroup>
                </FormControl>
              </div>

              <div className="radio-boxes">
                <FormControl>
                  <p className="text">Enable Merchant Website Alert:</p>
                  <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="show_alert"
                    value={formData?.show_alert}
                    onChange={handleChange}
                  >
                    <FormControlLabel value={1} size="small" control={<Radio />} label="Enabled" />
                    <FormControlLabel value={2} size="small" control={<Radio />} label="Disabled" />
                  </RadioGroup>
                </FormControl>
              </div>

              <div className="radio-boxes">
                <FormControl>
                  <p className="text">Select Checkout Theme:</p>
                  <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="theme"
                    value={formData?.theme}
                    onChange={handleChange}
                  >
                    <FormControlLabel value={"inline"} size="small" control={<Radio />} label="Inline" />
                    <FormControlLabel value={"multiline"} size="small" control={<Radio />} label="Multiline" />
                  </RadioGroup>
                </FormControl>
              </div>

              <div className="multi-btn">
                <div className="checkout back">
                  <button className="backBtn" onClick={()=> setstep(0)}>Back</button>
                </div>

                <div className="checkout">
                  <button type="submit">Pay</button>
                </div>
              </div>
            </section>
            </form>
          }
      </div>
    );
  }
  