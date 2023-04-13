import "./style/AddForm.css";
import axios from 'axios';
import React, { useState } from 'react';

import { useNavigate } from "react-router";



// eslint-disable-next-line no-lone-blocks
function changer(){
  var e = document.getElementById("productType");
  var text = e.options[e.selectedIndex].text;

if(text==="DVD"){
  document.getElementById("removepart2").style.display= "block";
  document.getElementById("removepart3").style.display= "none";
  document.getElementById("removepart4").style.display= "none";
  document.getElementById("removepart").style.display= "block";
  document.getElementById("size").style.display= "block";
  document.getElementById("height").style.display= "none";
  document.getElementById("width").style.display= "none";
  document.getElementById("length").style.display= "none";
  document.getElementById("weight").style.display = "none";
}
else if(text==="Furniture"){
  document.getElementById("removepart2").style.display= "none";
  document.getElementById("removepart3").style.display= "block";
  document.getElementById("removepart4").style.display= "none";
  document.getElementById("removepart").style.display= "block";
  document.getElementById("size").style.display= "none";
  document.getElementById("height").style.display= "block";
  document.getElementById("width").style.display= "block";
  document.getElementById("length").style.display= "block";
  document.getElementById("weight").style.display = "none";
}
else if(text==="Book"){
  document.getElementById("removepart2").style.display= "none";
  document.getElementById("removepart3").style.display= "none";
  document.getElementById("removepart4").style.display= "block";
  document.getElementById("removepart").style.display= "block";
  document.getElementById("size").style.display= "none";
  document.getElementById("height").style.display= "none";
  document.getElementById("width").style.display= "none";
  document.getElementById("length").style.display= "none";
  document.getElementById("weight").style.display = "block";

}
}



function AddForm () {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    sku: '',
    name: '',
    price: '',
    type: 'DVD',
    size: '',
    height: '',
    width: '',
    length: '',
    weight: ''
  });
  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    });
    const { name, value } = event.target;
    if (['height', 'weight', 'size', 'length', 'width'].includes(name)) {
      setFormData(prevFormData => ({
        ...prevFormData,
        [name]: parseFloat(value) || ''
      }));
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const validationErrors = validate(formData);
    if (Object.keys(validationErrors).length === 0) {
      axios.get('http://levanbokhuascandiweb.epizy.com/api/')
        .then(response => {
          const products = response.data;
          const skuExists = products.some(product => product.sku === formData.sku);
          if (skuExists) {
            setErrors({ sku: 'SKU already exists. Please choose a different one.' });
          } else {
            axios.post('http://levanbokhuascandiweb.epizy.com/api/', formData)
              .then(response => {
                // handle success
                console.log(response);
                navigate('/');
              })
              .catch(error => {
                // handle error
                console.log(error);
              });
          }
        })
        .catch(error => {
          // handle error
          console.log(error);
        });
    } else {
      setErrors(validationErrors);
    }
  };

  const handleTypeChange = (event) => {
    const type = event.target.value;
    setFormData({
      ...formData,
      type,
      size: '',
      height: '',
      width: '',
      length: '',
      weight: ''
    });
  };

  const validate = (data) => {
    const errors = {};
    if (data.sku.length > 20) {
      errors.sku = 'SKU should not exceed 20 characters';
    }
    if (data.name.length > 20) {
      errors.name = 'Name should not exceed 20 characters';
    }
    if (isNaN(data.price)) {
      errors.price = 'Price should be a number';
    }
    if (data.type === 'DVD' && isNaN(data.size)) {
      errors.size = 'Size should be a number';
    }
    if (data.type === 'DVD' && data.size.length === 0) {
      errors.sizee = 'This is required field';
    }
    if (data.type === 'Furniture' && data.height.length === 0) {
      errors.heightt = 'This is required field';
    }
    if (data.type === 'Furniture' && data.width.length === 0) {
      errors.widthh = 'This is required field';
    }
    if (data.type === 'Furniture' && data.length.length === 0) {
      errors.lengthh = 'This is required field';
    }
    if (data.type === 'Book' && data.weight.length === 0) {
      errors.weightt = 'This is required field';
    }
    if (data.type === 'Furniture' && (isNaN(data.height) || isNaN(data.width) || isNaN(data.length))) {
      errors.dimensions = 'Height, Width, and Length should be numbers';
    }
    if (data.type === 'Book' && isNaN(data.weight)) {
      errors.weight = 'Weight should be a number';
    }
    return errors;
  }

    return (
      <div className="AddForm">
        <div className="AddFormWidth">
          <form id="product_form" method="POST"  onSubmit={handleSubmit}>
            <h4>SKU </h4><input className="form-control" type="text"  id="sku" name="sku" value={formData.sku} onChange={handleChange} required>
            </input>{errors.sku && <p className="error">{errors.sku}</p>}  <br/>
            <h4>Name </h4>
          <input
            className="form-control"
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            maxLength="20"
            required
          />
          {errors.name && <p className="error">{errors.name}</p>}<br />
            <h4>Price </h4><input className="form-control" type="text"  id="price" name="price" value={formData.price} onChange={handleChange} required></input>
            {errors.price && <p className="error">{errors.price}</p>}<br/>
        
            <div className="form-group">
             <h4>Type Switcher </h4>
                <select className="form-control" id="productType" onChange={e => {changer(); handleTypeChange(e)}} value={formData.type} >
                  <option id="DVD" value="DVD"  name="DVD">DVD</option>
                  <option id="Furniture" value="Furniture" name="Furniture" >Furniture</option>
                  <option id="Book" value="Book" name="Book">Book</option>
                
                </select> <br/>
                  <div id="removepart" style={{display:'block'}}>
                  <div id="removepart2" style={{display:'block'}}>
                    <h6>Please, provide size </h6>
                    <input className="form-control"type="number" onChange={handleChange} placeholder='Size' id="size" style={{display:'block'}} name="size" ></input><br/>
                    {errors.sizee && <p className="error">{errors.sizee}</p>}{errors.size && <p className="error">{errors.size}</p>}
                  </div>
                  <div id="removepart3" style={{display:'none'}}>
                    <h6>Please, provide dimensions </h6>
                    <input className="form-control" type="number" onChange={handleChange} placeholder='Height' id="height" style={{display:'none'}} name="height" ></input>
                    {errors.heightt && <p className="error">{errors.heightt}</p>}<br/>
       
                    <input className="form-control" type="number" onChange={handleChange} placeholder='Width' id="width" style={{display:'none'}} name="width" ></input>
                    {errors.widthh && <p className="error">{errors.widthh}</p>}<br/>
       
                    <input className="form-control" type="number" onChange={handleChange} placeholder='Length' id="length" style={{display:'none'}} name="length" ></input>
                    {errors.lengthh && <p className="error">{errors.lengthh}</p>}{errors.dimensions && <p className="error">{errors.dimensions}</p>}<br/>
                  </div>
                  <div id="removepart4" style={{display:'none'}}>
                    <h6>Please, provide weight </h6>
                    <input className="form-control" type="number" onChange={handleChange} placeholder='Weight' id="weight" style={{display:'none'}} name="weight" ></input>
                    {errors.weightt && <p className="error">{errors.weightt}</p>}{errors.weight && <p className="error">{errors.weight}</p>}<br/>
                  </div>
                    </div>
 
       
                 
                   
                  </div>
          </form>
        
                  </div>
      </div>
       
       
    
    
  
  
    );
  }

  export default AddForm;