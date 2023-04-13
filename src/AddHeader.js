import "./style/AddHeader.css";
import AddForm from './AddForm';


function AddHeader(){
  
  
    return (
      <div className = "AboveHeader">
      <div className="header">
          <div className="header__leftside">
              <h1 id="mainh1">Add Product</h1>
              </div>  
  
          <div className="header__right">
           
         
          <button type="submit"  form="product_form"  className="btnn dangerr"> Save</button>
          
          <a href="/" className="btnn dangerr" style={{padding:" 0px 11px"}}>Cancel</a>
              </div>  
              
      </div>
  
     <AddForm />

      </div>
      
    )
  }
  

  export default AddHeader;