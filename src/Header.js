import React from "react";
import "./style/Header.css";





function Header() {
  
  return (
    <div className="header">
        <div className="header__leftside">
            <h1 id="mainh1">Product List</h1>
            </div>  

        <div className="header__right">
        

        <a href="AddProduct" className="btnn dangerr"> ADD</a>
        
        <button type="submit" form="delete-form" className="btnn dangerr" id="delete-product-btn" style={{width:"140px"}}>MASS DELETE</button>
            </div>  
    </div>
  )
}

export default Header
